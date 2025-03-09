const {DataTypes}=require('sequelize')

module.exports = (sequelize)=>{

    return sequelize.define('usuario', 
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre_usuario:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            nombre:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellido:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            ci:{
                type: DataTypes.INTEGER,
                allowNull: false,
            }, 
        },{
            freezeTableName: true,
            timestamps: false,
        }
    )
}