const {Evaluacion}= require('../db/sequelize')

class EvaluacionServices{

    async getEvaluacionCount(){
        const count= await Evaluacion.count()
        return count
    }
}

module.exports = EvaluacionServices