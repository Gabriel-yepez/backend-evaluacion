const userServices = require("../services/userServices")
const services = new userServices()

const style ={
    h1:{
        fontSize: 20,
        bold: true,
        margin: [0, 5]
    }
}

const buscarUsuario = async (id_usuario) => {

    const user = await services.getByid(id_usuario)
    if (!user) return null;

    const { ci, nombre, apellido, email } = user;
    return {
        ci,
        nombre,
        apellido,
    }
}

const maquetareport = async (data) => {
    const { fecha , id_usuario } = data;
    const user = await buscarUsuario(parseInt(id_usuario, 10));
    const {nombre, apellido, ci} = user;

    return{
        header:{
                text: `Fecha de Evaluacion: ${fecha}`,
                alignment: 'right',
                margin: [15,15]
            },
            content: [
                `comentario para ${nombre} y ${apellido} con ci v-${ci}`,
                'reporte 1 hecho perra',
            ]
    }
}

module.exports = maquetareport;