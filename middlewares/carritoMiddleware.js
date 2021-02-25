var db = require('../database/models')

const carritoMiddleware = {
    carritoHeader: function(req, res, next){
        if(req.session.usuarioLogueado != undefined){
            db.Compras.findOne({
                include: {association: 'productos', association: 'comprasProductos'},
                where: {usuario_id: req.session.usuarioLogueado.id, finalizada: 0},
            })
            .then(compraActiva=>{
                if(compraActiva){
                    var cantidadDeItems = 0
                    compraActiva.comprasProductos.forEach(compraProducto =>{
                        cantidadDeItems += compraProducto.cantidad;
                    })
                    req.session.cantidadDeItems = cantidadDeItems;
                    next();
                }
                else{
                    req.session.cantidadDeItems = 0;
                    next();
                }
            })
            .catch(e=>{console.log(e)})
        }
        else{
            req.session.cantidadDeItems = 0;
            next();
        }
    }   

}

module.exports = carritoMiddleware;