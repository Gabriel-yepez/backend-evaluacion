const {Evaluacion}= require('../db/sequelize')

class EvaluacionServices{

    async getEvaluacionCount(){
        const count= await Evaluacion.count()
        return count
    }
    
    async getEvaluacionCountByUser(userId){
        const count = await Evaluacion.count({
            where: { id_usuario: userId }
        })
        return count
    }

    async getAllEvaluacion(){
        const evaluacion= await Evaluacion.findAll()
        return evaluacion
    }
    
    async createEvaluacion (evaluacionData){
        const evaluacion = await Evaluacion.create(evaluacionData);
        return evaluacion;
    }
}

module.exports = EvaluacionServices