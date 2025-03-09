const {Usuario}= require('../db/sequelize')

class UserServices{

    async createUser(user){
        const newUser = await Usuario.create(user)
        return newUser        
    }

    async getAllUsers(){
        const users =await Usuario.findAll()
        return users
    }

    async getByid(id){
        const user = await Usuario.findByPk(id)
        return user
    }

    async getUserByfield(field){
        const user = await Usuario.findOne({where:field})
        return user
    }

    async updateUser(id, data){
        const user = await Usuario.findByPk(id)
        
        if(user){

            const updatedUser = await user.update(data)
            return updatedUser
        }
        else{

            throw new Error("usuaro no encontrado")
        }
    }

    async deleteUser(id){
        const user = await Usuario.findByPk(id)
        if(user){
            const borrar = await user.destroy()
            return borrar !== null
        }
        else{
            throw new Error("usuario no encontrado")
        }
    }

}

module.exports = UserServices