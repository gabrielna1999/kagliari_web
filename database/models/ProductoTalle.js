module.exports= (sequelize, dataTypes) => {
    const alias = "ProductosTalles";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        producto_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        },
        talle_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        }
    };

    const config= {
        tableName: "producto_talle",
        timestamps: false,
    };
    
    const ProductosTalles = sequelize.define(alias, cols, config);

    ProductosTalles.associate = function(models){
        ProductosTalles.belongsTo(models.Productos, {
            as: 'producto',
            foreignKey: 'producto_id'
        });

        ProductosTalles.belongsTo(models.Talles, {
            as: 'talle',
            foreignKey: 'talle_id'
        })

    };
    

    return ProductosTalles;
       
    }