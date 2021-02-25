const { validationResult } = require('express-validator');
const db = require('../database/models')

const cartController = { 
    
    vistaCarrito: function(req, res,next){
        // Busco si el usuario logueado tiene una compra iniciada
        db.Compras.findOne({ include: ['comprasProductos'], where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0}})
        .then(function(compraEncontrada){
            // Si no la tiene, devuelvo el carrito vacio
            if(compraEncontrada == undefined){
                res.render("carrito", {carrito: undefined, usuarioLogueado: req.session.usuarioLogueado, compra: compraEncontrada, cantidadDeItems: req.session.cantidadDeItems});
            }
            // Si la tiene, devuelvo el carrito con todos los productos que contiene:
            else{      
                // Creo un array 'carrito' que va a contener todos los productos          
                var carrito = []
                // Traigo todos los productos asociados a esta compra a traves de la tabla intermedia 'compras_productos'
                db.ComprasProductos.findAll({ 
                    include: {association: 'producto'},
                    where: { compra_id: compraEncontrada.id }
                })
                // Por cada 'compra_producto' encontrado, busco la informacion del producto que corresponde y lo agrego al carrito
                .then(compraProductosEncontrados => {
                    compraProductosEncontrados.forEach(compraProducto => {
                        compraProducto.producto.talle = compraProducto.talle_id;
                        compraProducto.producto.cantidad = compraProducto.cantidad;
                        compraProducto.producto.compraProductoId = compraProducto.id;
                        carrito.push(compraProducto.producto)
                    });

                    // Renderizo el carrito pasandole el array de productos asociados a la compra
                    res.render("carrito", {carrito, usuarioLogueado: req.session.usuarioLogueado, compra: compraEncontrada, cantidadDeItems: req.session.cantidadDeItems});
                })
                .catch(function(error){
                    console.log(error);
                })
                
            }
        })
        .catch(function(error){
            console.log(error);
        })
    },

    agregarProducto: function(req, res, next){
        var errors = validationResult(req);
        if(errors.isEmpty()){
            db.Compras.findOne({
                where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0 },
                include: {association: 'productos'}
    
            })
            .then(function(compraEncontrada){          
                if(compraEncontrada != undefined){           
                    db.ComprasProductos.create({
                        producto_id: req.params.id,
                        compra_id: compraEncontrada.id,
                        cantidad: req.body.cantidad,
                        talle_id: req.body.talle
                    })  
                    
                    .then(function(compraProductoCreado){
                        db.Productos.findOne({ where: {id: compraProductoCreado.producto_id}})
                        .then(producto => {
                            db.Compras.update({
                                precio_total: compraEncontrada.precio_total + (producto.precio*req.body.cantidad)
                            },{
                                where: { id: compraEncontrada.id } 
                            })                            
                            res.redirect('/product/vistaProductos') 
                        })
                        .catch( e => { console.log(e) } )
                        
                        
                    })
                    .catch( e => { console.log(e) } )
                    
                    
                }
                else{
                    db.Productos.findByPk(req.params.id)
                    .then(function(producto){
                        db.Compras.create({ 
                        usuario_id: req.session.usuarioLogueado.id,
                        finalizada: 0,
                        precio_total: producto.precio*req.body.cantidad
                        })
                        .then(function(compraCreada){
                            db.ComprasProductos.create({
                            producto_id: req.params.id,
                            compra_id: compraCreada.id,
                            cantidad: req.body.cantidad,
                            talle_id: req.body.talle
                            })    
                                           
                            res.redirect('/product/vistaProductos') 
                        })               
                        
                        .catch( e => { console.log(e) } )
                    }) 
                    .catch( e => { console.log(e) } )                        
                
                }
            })    
            .catch( e => { console.log(e) } )    

        }
        else{
            db.Productos.findByPk(req.params.id, {
                include: { all: true }
    
            })        
            .then(function(producto){          
                res.render("detalleProducto", {errors: errors.errors, producto, usuarioLogueado: req.session.usuarioLogueado, admin: req.admin, cantidadDeItems: req.session.cantidadDeItems});                
            })
            .catch(function(error){
                console.log(error);
            })
    
        }
      
        
        
    },

    eliminarProducto: function(req, res, next){
        db.Compras.findOne( {
            where: { usuario_id: req.session.usuarioLogueado.id, finalizada: 0 },
            include: { association: 'comprasProductos' }
        })
        .then(compraActual => {
            db.ComprasProductos.findOne( {
                where: { id: req.params.id },
                include: { association: 'producto'}
            })
            .then(function(compraProducto){   
                db.Compras.update({
                    precio_total: compraActual.precio_total - (compraProducto.producto.precio*compraProducto.cantidad)
                },{
                    where: { id: compraActual.id } 
                })
                db.ComprasProductos.destroy({
                    where: { id: compraProducto.id }
                })
                
                .catch( e => { console.log(e) } )
                
                
            })
            .catch( e => { console.log(e) } )
            res.redirect('/product/carrito')
        })
        .catch( e => { console.log(e) } )
    },

    finalizarCompra: function(req, res, next){
        db.Compras.findOne({
            include: {association: 'productos', association: 'comprasProductos'},
            where: {usuario_id: req.session.usuarioLogueado.id, finalizada: 0},
        })
        .then((compra)=>{
            compra.update({
                finalizada: 1,
                fecha_finalizacion: new Date()
            })
            res.render('compraFinalizada', {usuarioLogueado: req.session.usuarioLogueado, compra, cantidadDeItems: req.session.cantidadDeItems})
        })
        .catch( e => { console.log(e) } )

    },

    // Sumar 1 a la cantidad de un producto en el carrito 
    sumar: function(req, res, next){ 
            // Guardo en una variable la cantidad del producto modificada (+1)             
            var cantidadUpdate = Number(req.params.cantidad) + 1; 
            // Busco el CompraProducto que coincida con el id que recibo por url
            db.ComprasProductos.findOne({
                where: { id: req.params.id },
                include: {association: 'compra', association: 'producto'}, 
            }) 
            .then(compraProducto => {
                // Guardo en una variable el valor que tengo que sumarle al precio total de la compra
                let valorASumar = compraProducto.producto.precio
                // Actualizo la cantidad del CompraProducto en la base de datos
                db.ComprasProductos.update({ 
                    cantidad: cantidadUpdate
                    },{
                    where: { id: req.params.id }                          
    
                })                 
                .then(()=>{
                    // Busco la compra en la que estoy trabajando
                    db.Compras.findOne({ 
                        where: { id: compraProducto.compra_id }
                    })
                    // Actualizo el precio total de la compra en la base de datos, usando la variable de valorASumar que cree antes.
                    .then(compra => {
                        db.Compras.update({
                            precio_total: compra.precio_total + valorASumar
                        },{
                            where: { id: compra.id }
                        })
                        .then(()=>{
                            // Redirecciono al carrito actualizado
                            res.redirect('/product/carrito')                        
                        })
                        .catch( e => { console.log(e) } )
                    }) 
                    .catch( e => { console.log(e) } )   
                })                                            
                .catch( e => { console.log(e) } )
            })      
            .catch( e => { console.log(e) } )
        
        
    },

    restar: function(req, res, next){
        // Guardo en una variable la cantidad del producto modificada (-1)             
        var cantidadUpdate = Number(req.params.cantidad) - 1; 
        // Busco el CompraProducto que coincida con el id que recibo por url
        db.ComprasProductos.findOne({
            where: { id: req.params.id },
            include: {association: 'compra', association: 'producto'}, 
        }) 
        .then(compraProducto => {
            // Guardo en una variable el valor que tengo que restarle al precio total de la compra
            let valorARestar = compraProducto.producto.precio
            // Actualizo la cantidad del CompraProducto en la base de datos
            db.ComprasProductos.update({ 
                cantidad: cantidadUpdate
                },{
                where: { id: req.params.id }                          

            })                 
            .then(()=>{
                // Busco la compra en la que estoy trabajando
                db.Compras.findOne({ 
                    where: { id: compraProducto.compra_id }
                })
                // Actualizo el precio total de la compra en la base de datos, usando la variable de valorARestar que cree antes.
                .then(compra => {
                    db.Compras.update({
                        precio_total: compra.precio_total - valorARestar
                    },{
                        where: { id: compra.id }
                    })
                    .then(()=>{
                        // Redirecciono al carrito actualizado
                        res.redirect('/product/carrito')                        
                    })
                    .catch( e => { console.log(e) } )
                }) 
                .catch( e => { console.log(e) } )   
            })                                            
            .catch( e => { console.log(e) } )
        })      
        .catch( e => { console.log(e) } )
    },


       
}

module.exports = cartController;