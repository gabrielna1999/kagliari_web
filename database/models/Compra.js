module.exports= (sequelize,dataTypes) => {
    const alias = "Compras";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        fecha_inicio: dataTypes.DATE,
        precio_total: dataTypes.INTEGER,
        usuario_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        },
        finalizada: dataTypes.BOOLEAN,
        fecha_finalizacion: dataTypes.DATE,
    };

    const config= {
        tableName: "compras",
        timestamps: false,
    };
    
    const Compra = sequelize.define(alias, cols, config); 

    Compra.associate = function(models){
        Compra.belongsTo(models.Usuarios, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        })

        Compra.hasMany(models.ComprasProductos, {
            foreignKey: 'compra_id',
            as: 'comprasProductos'
        })

        Compra.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'compras_productos',
            foreignKey: 'compra_id',
            otherKey: 'producto_id',
            timestamps: false
        })
    }
    
    return Compra;
       
}