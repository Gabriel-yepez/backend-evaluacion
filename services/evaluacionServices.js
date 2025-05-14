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
}

module.exports = EvaluacionServices