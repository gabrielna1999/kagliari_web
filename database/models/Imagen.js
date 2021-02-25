module.exports= (sequelize,dataTypes) => {
    const alias = "Imagenes";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        ruta: dataTypes.STRING, 
        producto_id: {
            type: dataTypes.INTEGER, 
            foreignKey: true
        },
    };

    const config= {
        tableName: "imagenes",
        timestamps: false,
    };
    
    const Imagen = sequelize.define(alias, cols, config)

    Imagen.associate = function(models){
        Imagen.belongsTo(models.Productos, {
            foreignKey: 'producto_id',
            as: 'producto'
        })
    }
    
    return Imagen;

       
}
