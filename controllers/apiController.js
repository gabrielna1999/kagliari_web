const db = require('../database/models');
const productController = require('./productController');


const apiController = {
    // devuelve cantidad de usuarios registrados y los muestra.
    cantidadUsuarios: function(req, res, next){
        db.Usuarios.findAll()
        .then(function(usuarios){
            let respuesta = {
                meta:{
                    status: 200,
                    total: usuarios.length
                },
                data: usuarios
            }
            res.json(respuesta);
        })
        
    },
    // devuelve cantidad de productos y los muestra.
    cantidadProductos: function(req, res, next){
        db.Productos.findAll()
        .then(function(productos){
            let respuesta = {
                meta:{
                    status: 200,
                    total: productos.length
                },
                data: productos
            }
            res.json(respuesta);
        })
    },
    // devuelve cantidad talles y los muestra.
    cantidadTalles: function(req, res , next){
        db.Talles.findAll()
        .then(function(talles){
            let respuesta = {
                meta:{
                    status: 200,
                    total: talles.length
                },
                data: talles
            }
            res.json(respuesta);
        })
    },
    // devuelve cantidad de carritos cerrados (finalizado = 1).
    cantidadCarritos: function(req, res, next){
        db.Compras.findAll()
        .then(function(compras){
            let cantidadComprasFin = 0;
            compras.forEach(compra => {
                if(compra.finalizada == 1){
                    cantidadComprasFin += 1
                }
                
            });
            let respuesta = {
                meta:{
                    status: 200,
                    total: cantidadComprasFin
                },
                data: compras
            }
            res.json(respuesta);
        })
    },


}

module.exports = apiController;