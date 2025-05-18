const userServices = require("../services/userServices")
const services = new userServices()

const style ={
    h1:{
        fontSize: 20,
        bold: true,
        margin: [0, 5]
    },
    h2:{
        fontSize: 14,
        bold: true,
        margin: [0, 5]
    },
    span:{
        fontSize: 12,
        light: true,
        margin: [0, 2]
    },
}

const extraerObjetivos = (objetivos) => {

    if (!Array.isArray(objetivos)) return [];

    return objetivos.map(obj => {
        const { descripcion, estado_actual, fecha_inicio, fecha_fin  } = obj;
        return { descripcion, estado_actual, fecha_inicio, fecha_fin};
    });
}

const extraerClaves = (responses) => {
    if (!responses) return "No hay preguntas registradas";
    const claves = Object.keys(responses);
    return claves

}

const extraerRespuestas = (responses) => {

    if (!responses) return "No hay respuestas registradas";
    const respuetas = Object.values(responses).join(", ");
    return  respuetas
}

const validarComentarios = (comentario) => {

    if (!comentario) return "No hay comentarios";

    return comentario
}

const buscarUsuario = async (id_usuario) => {

    const user = await services.getByid(id_usuario)
    if (!user) return null;

    const { ci, nombre, apellido} = user;
    const nombreFinal = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    const apellidoFinal = apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase();
    const ciFormateado = ci.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return {
        ciFormateado,
        nombreFinal,
        apellidoFinal,
    }
}

const formatearFecha = (fecha) => {
    if (!fecha){
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const year = hoy.getFullYear();
        return `${dia}/${mes}/${year}`;
    };

    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate() + 1).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const year = fechaObj.getFullYear();
    return `${dia}/${mes}/${year}`;
}

const maquetareport = async (data) => {
    
   const {
            fecha,
            id_usuario, 
            comentarioEvaluacion, 
            objetivos_usuario, 
            puntuacion, 
            comentarioHabilidad, 
            responses 
        } = data;
   
    const comentarioFinalEvaluacion = validarComentarios(comentarioEvaluacion); 
    const comentarioFinalHabilidad = validarComentarios(comentarioHabilidad);     
    const fechaFormateada= formatearFecha(fecha);
    const objetivos = extraerObjetivos(objetivos_usuario);
    const respuestas = extraerRespuestas(responses);
    const claves = extraerClaves(responses);
    
    const objetivosContent = objetivos.length > 0
        ? objetivos.map((obj, index) => ({
            text: `Objetivo ${index + 1}: ${obj.descripcion}\nEstado actual: ${obj.estado_actual}\nFecha inicio: ${formatearFecha(obj.fecha_inicio)}\nFecha fin: ${formatearFecha(obj.fecha_fin)}`,
            style: 'span',
            margin: [0, 4]
        }))
        : [{
            text: "No hay objetivos registrados.",
            style: 'span',
            margin: [0, 4]
        }];

    // Luego, en el array content, puedes agregar ...objetivosContent donde quieras mostrar los objetivos.
    
    const user = await buscarUsuario(parseInt(id_usuario, 10));
    const {nombreFinal, apellidoFinal, ciFormateado} = user;

    return{
        header:{
                text: `Fecha de Evaluacion: ${fechaFormateada}`,
                alignment: 'right',
                margin: [15,15]
            },
            content: [
                {
                    text : "Datos de la persona evaluada",
                    style: 'h1',
                },

                {
                    text: `Nombre: ${nombreFinal}`,
                    style: 'h2',                        
                },
                {
                    text: `Apellido: ${apellidoFinal}`,
                    style: 'h2',                           
                },
                {
                    text: `Cedula de Identidad: V-${ciFormateado}`,
                    style: 'h2', 
                },
                {
                    text: `Comentario de la evaluacion: ${comentarioFinalEvaluacion}`,
                    style: 'span', 
                },
                {
                    text: `Comentario de la habilidad: ${comentarioFinalHabilidad}`,
                    style: 'span', 
                },
                ...objetivosContent,
                {
                    text: `Puntuacion: ${puntuacion}`,
                    style: 'h2', 
                },
                {
                    text: `Respuestas de la evaluacion: ${respuestas} y preguntas: ${claves}`,
                    style: 'span', 
                },
                {
                    text: "Fin de la evaluacion",
                    style: 'h1',
                }
                
            ],
            styles: style,
    }
}

module.exports = maquetareport;