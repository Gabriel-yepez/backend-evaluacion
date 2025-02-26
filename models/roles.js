const {DataTypes}=require('sequelize')

module.exports=(sequelize)=>{

    return sequelize.define('roles',
        {
            id:{
                type:DataTypes.INTEGER,
                autoIncement:true,
                primaryKey: true,        
            },
            nombre:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    )
}