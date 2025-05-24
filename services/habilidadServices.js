const { ResultadoHabilidad } = require('../db/sequelize')

class habilidadServices{
 
    async createHabilidad(habilidad){
        const newhabilidad = await ResultadoHabilidad.create(habilidad)
        return newhabilidad
    }
}

module.exports = habilidadServices