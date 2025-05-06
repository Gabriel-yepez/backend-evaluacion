const { Objetivo } = require('../db/sequelize');

class ObjetivoServices {

    async createObjetivo(objetivo) {
        const newObjetivo = await Objetivo.create(objetivo);
        return newObjetivo;
    }

    async getAllObjetivos() {
        const objetivos = await Objetivo.findAll();
        return objetivos;
    }

    async getObjetivoById(id) {
        const objetivo = await Objetivo.findByPk(id);
        return objetivo;
    }

    async updateObjetivoEstado(id, estado) {
        const objetivo = await Objetivo.findByPk(id);

        if (objetivo) {
            const updatedObjetivo = await objetivo.update({ estado });
            return updatedObjetivo;
        }

        return objetivo;
    }

    async deleteObjetivo(id) {
        const objetivo = await Objetivo.findByPk(id);

        if (objetivo) {
            const borrar = await objetivo.destroy();
            return borrar !== null;
        }

        return objetivo;
    }
}

module.exports = ObjetivoServices;