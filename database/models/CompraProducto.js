module.exports= (sequelize, dataTypes) => {
    const alias = "ComprasProductos";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        cantidad: dataTypes.INTEGER,
        compra_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
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
        tableName: "compras_productos",
        timestamps: false,
    };
    
    const CompraProducto = sequelize.define(alias, cols, config);

    CompraProducto.associate = function(models){
        CompraProducto.belongsTo(models.Productos, {
            as: 'producto',
            foreignKey: 'producto_id'
        });

        CompraProducto.belongsTo(models.Compras, {
            as: 'compra',
            foreignKey: 'compra_id'
        });

        CompraProducto.belongsTo(models.Talles, {
            as: 'talle',
            foreignKey: 'talle_id'
        })
        
        
        CompraProducto.hasMany(models.Imagenes, {
            as: 'imagen',
            foreignKey: 'producto_id'
        }) 
    };
    

    return CompraProducto;
       
    }