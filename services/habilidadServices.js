const { resultado_habilidad } = require ('../db/sequelize')

class habilidadServices{
 
    async createHabilidad(habilidad){
        const newhabilidad = await resultado_habilidad.create(habilidad)
        return newhabilidad
    }
}

module.exports = habilidadServices