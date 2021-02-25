var { check, validationResult, body} = require('express-validator');
const { nextTick } = require('process');
var db = require('../database/models');

const detalleMiddleware = {
    SelecTalle: function(req, res, next){
        console.log(req.body.talle + " TALLE")
        if(req.body.talle == undefined){
            db.Productos.findByPk(req.params.id, {
                include: { all: true }
    
            })        
            .then(function(producto){          
                res.render("detalleProducto", {errors: 'Elegi un talle', producto, usuarioLogueado: req.session.usuarioLogueado, admin: req.admin, cantidadDeItems: req.session.cantidadDeItems});                
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else{
            next();
        }
    }
    
    /*[
        body('talle').custom(value => {
            console.log("VALOR: " + value)                
            if(value == 0){
                
                throw new Error('elejir talle');
                res.redirect('/product/vistaproductos')
            } 
            else{
                return true;
            }
        })
    ] */
                    
}        
    

module.exports = detalleMiddleware;