const {Retroalimentacion} = require('../db/sequelize')

class RetroalimentacionServices {

    async createRetroalimentacion(retroalimentacion) {
        const newRetroalimentacion = await Retroalimentacion.create(retroalimentacion)
        return newRetroalimentacion
    }

    async getAllRetroalimentaciones(filter = null) {
        if(filter) {
            const retroalimentaciones = await Retroalimentacion.findAll({where: filter})
            return retroalimentaciones
        } else {
            const retroalimentaciones = await Retroalimentacion.findAll()
            return retroalimentaciones
        }
    }

    async getById(id) {
        const retroalimentacion = await Retroalimentacion.findByPk(id)
        return retroalimentacion
    }

    async getRetroalimentacionByField(field) {
        const retroalimentacion = await Retroalimentacion.findOne({where: field})
        return retroalimentacion
    }

    async updateRetroalimentacion(id, data) {
        const retroalimentacion = await Retroalimentacion.findByPk(id)
        
        if(retroalimentacion) {
            const updatedRetroalimentacion = await retroalimentacion.update(data)
            return updatedRetroalimentacion
        }
        return retroalimentacion
    }

    async deleteRetroalimentacion(id) {
        const retroalimentacion = await Retroalimentacion.findByPk(id)
        if(retroalimentacion) {
            const borrar = await retroalimentacion.destroy()
            return borrar !== null
        }
        return retroalimentacion
    }

    // Additional useful methods specific to retroalimentaciones
    async getRetroalimentacionesByUsuario(idUsuario) {
        const retroalimentaciones = await Retroalimentacion.findAll({
            where: { id_usuario: idUsuario }
        })
        return retroalimentaciones
    }

    async getRetroalimentacionesByEvaluacion(idEvaluacion) {
        const retroalimentaciones = await Retroalimentacion.findAll({
            where: { id_evaluacion: idEvaluacion }
        })
        return retroalimentaciones
    }
}

module.exports = RetroalimentacionServices