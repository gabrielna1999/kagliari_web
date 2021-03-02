module.exports= (sequelize,dataTypes) => {
    const alias = "Usuarios";

    const cols = { 
        id: {
            type: dataTypes.SMALLINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        password: dataTypes.STRING,
        fecha_nacimiento: dataTypes.DATE,
        fecha_creacion: dataTypes.DATE,
        telefono: dataTypes.INTEGER,
        admin: dataTypes.BOOLEAN
    };

    const config= {
        tableName: "usuarios",
        timestamps: false,
    };
    
    const Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function(models){
        Usuario.hasMany(models.Compras, {
            foreignKey: 'usuario_id',
            as: 'compras'
        })
    };
 
    return Usuario;
       
}