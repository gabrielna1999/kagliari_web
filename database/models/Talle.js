module.exports= (sequelize,dataTypes) => {
    const alias = "Talles";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING
    };

    const config= {
        tableName: "talles",
        timestamps: false,
    };
    
    const Talle = sequelize.define(alias, cols, config)

    Talle.associate = function(models){
        Talle.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'producto_talle',
            foreignKey: 'talle_id',
            otherKey: 'producto_id',
            timestamps: false
        });

        Talle.hasMany(models.ComprasProductos, {
            foreignKey: 'talle_id',
            as: 'compras'
        })

        Talle.hasMany(models.ProductosTalles, {
            foreignKey: 'talle_id',
            as: 'productoTalle'
        })

        
    }
    
    return Talle;
       
}