const {DataTypes}=require('sequelize')

module.exports = (sequelize)=>{

    return sequelize.define('objetivo',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            descripcion:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_inicio:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            fecha_fin:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            estado_actual:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            estado_deseado:{
                type: DataTypes.STRING,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    )
}