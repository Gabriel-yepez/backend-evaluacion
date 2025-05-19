const {Evaluacion}= require('../db/sequelize')

class EvaluacionServices{

    async getEvaluacionCount(){
        const count= await Evaluacion.count()
        return count
    }

    async geAllEvaluacion(){
        const evaluacion= await Evaluacion.findAll()
        return evaluacion
    }

    async createEvaluacion (evaluacionData){
        const evaluacion = await Evaluacion.create(evaluacionData);
        return evaluacion;
    }
}

module.exports = EvaluacionServices