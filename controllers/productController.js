const db = require('../database/models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const productController = {
    vistaDetalleProducto: function(req, res, next) {      
        db.Productos.findByPk(req.params.id, {
            include: { all: true }

        })        
        .then(function(producto){          
            res.render("detalleProducto", {producto, usuarioLogueado: req.session.usuarioLogueado, admin: req.admin, cantidadDeItems: req.session.cantidadDeItems});                
        })
        .catch(function(error){
            console.log(error);
        })
       
    },      
    
    cargarProducto: function(req, res , next){
        if(req.admin == true){
            db.Categorias.findAll()
            .then(function(categorias){
                res.render('cargarProducto', {categorias:categorias, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems});
            })
        }
        else{
            res.redirect('/')
        }
    },

    guardarProducto: function(req, res, next) {
        db.Productos.create({
            nombre: req.body.producto,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            categoria_id: req.body.categoria,
            imagen_ruta: req.files[0].filename
        })
        .then(function(producto){
            res.redirect('/product/vistaProductos')
            let promesa1 = db.ProductosTalles.create({
                producto_id: producto.id,
                talle_id: 1
            })
            let promesa2 = db.ProductosTalles.create({
                producto_id: producto.id,
                talle_id: 2
            })
            let promesa3 = db.ProductosTalles.create({
                producto_id: producto.id,
                talle_id: 3
            })
            Promise.all([promesa1,promesa2,promesa3])
            .then(valores=>{                
                res.redirect('/product/vistaProductos')
            }) 
            .catch(e=>{console.log(e)}) 
        })
        .catch(function(error){
            console.log(error)
        });
          
    },

    vistaProductos: function(req, res, next){
        db.Productos.findAll({
            include: [{association: 'imagen', association: 'categoria'}],
            raw: true,
            nest: true
        })        
        .then(function(productos){                    
            res.render("vistaProductos", {productos, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems, admin: req.admin});                
        })
        .catch(function(error){
            console.log(error);
        })
    },

    editarProductos: function(req, res, next){
       if(req.admin == true){
            let pedidoProductos = db.Productos.findByPk(req.params.id);
            let pedidoCategorias = db.Categorias.findAll();

            Promise.all([pedidoProductos, pedidoCategorias])
            .then(function([productos, categorias]){
                res.render("edicionProductos", {productos:productos, categorias:categorias, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems});
            })
        }
        else{
            res.redirect('/')
        }
    },

    actualizar: function(req, res, next){
        if(req.files[0]){
            db.Productos.update({
                nombre: req.body.producto,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                categoria_id: req.body.categoria,
                imagen_ruta: req.files[0].filename,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect("/product/detalleProducto/" + req.params.id)
            })
            .catch(e => {console.log(e)})
        }
        else{
            db.Productos.update({
                nombre: req.body.producto,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                categoria_id: req.body.categoria,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect("/product/detalleProducto/" + req.params.id)
            })
            .catch(e => {console.log(e)})
        }
        
        
       
        



    },

    borrar: function(req, res, next){
        db.Productos.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(()=>{
            db.ProductosTalles.destroy({
                where: { producto_id: req.params.id }
            })
        })
        res.redirect('/product/vistaproductos');
        
    },

    // Buscador

    search: function(req, res, next){
        var search = req.query.search
        db.Productos.findAll({
            where: { nombre: {[op.like]: '%'+ search +'%'} }
        })
        .then(productos=>{
            res.render("vistaProductos", {search, productos, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems, admin: req.admin});                
        })
        .catch(e => {console.log(e)})
    }

       
}

module.exports = productController;