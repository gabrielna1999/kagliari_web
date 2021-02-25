const db = require('../database/models');

const mainController = {
  index: function(req, res, next) {
    db.Productos.findAll({
      include: [{association: 'imagen'}],
      raw: true,
      nest: true
    })        
    .then(function(productos){                   
        res.render("index", {productos, usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems});                
    })
    .catch(function(error){
        console.log(error);
    })
  },
  
  quienesSomos: (req,res,next)=>{
    res.render('quienesSomos', {usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems} )
  },

  comoComprar: (req,res,next)=>{
    res.render('comoComprar', {usuarioLogueado: req.session.usuarioLogueado, cantidadDeItems: req.session.cantidadDeItems} )
  },
}

module.exports = mainController;