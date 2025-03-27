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

module.exports = {
  getEvaluacionCount
}