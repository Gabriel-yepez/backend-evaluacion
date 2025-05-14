const EvaluacionServices = require('../services/evaluacionServices')
const services = new EvaluacionServices()

const getEvaluacionCount = async (req, res)=>{

    try {
        const count = await services.getEvaluacionCount()
        if (!count) return res.status(404).json({ message: "no evaluaciones Found.",count });
        res.status(200).json(count)
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
}

const getAllEvaluacion = async (req, res)=>{

    try {
        const evaluacion = await services.getEvaluacion()

        if(evaluacion.length === 0) return res.status(404).json({ message: "no evaluaciones Found."});
        res.status(200).json(evaluacion)
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
}

module.exports = {
  getEvaluacionCount,
  getAllEvaluacion
}