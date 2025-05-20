const { text } = require("express");
const userServices = require("../services/userServices");
const AIService = require("./aiService");
const services = new userServices();
const aiService = new AIService();

const style = {
    h1: {
        fontSize: 22,
        bold: true,
        margin: [0, 10, 0, 15],
        alignment: 'center'
    },
    h2: {
        fontSize: 14,
        bold: true,
        margin: [0, 8, 0, 4],
    },
    span: {
        fontSize: 14,
        margin: [0, 3, 0, 5],
    },
    tableHeader: {
        fontSize: 13,
        bold: true,
        alignment: 'center',
        margin: [0, 5, 0, 5]
    },
    tableCell: {
        fontSize: 12,
        margin: [0, 3, 0, 3]
    },
    sectionHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 15, 0, 15]
    },
    footer: {
        fontSize: 10,
        alignment: 'center',
        margin: [0, 20, 0, 0]
    }
}

const extraerObjetivos = (objetivos) => {

    if (!Array.isArray(objetivos)) return [];

    return objetivos.map(obj => {
        const { descripcion, estado_actual, fecha_inicio, fecha_fin  } = obj;

        const periodoComppleto= `${formatearFecha(fecha_inicio)}-${formatearFecha(fecha_fin)}`
        return { descripcion, estado_actual, periodoComppleto};
    });
}

const extraerClaves = (responses) => {
    if (!responses || typeof responses !== 'object') {
        console.log('Respuestas inválidas para extraer claves:', responses);
        return ["No hay preguntas registradas"];
    }
    
    // Obtener las claves (preguntas) como array
    return Object.keys(responses);
}

const extraerRespuestas = (responses) => {
    if (!responses || typeof responses !== 'object') {
        console.log('Respuestas inválidas para extraer valores:', responses);
        return ["No hay respuestas registradas"];
    }
    
    // Obtener los valores (respuestas) como array
    return Object.values(responses);
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

const maquetareport = async (data, withAI = false) => {
    
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
      // Obtener datos del usuario
    const user = await buscarUsuario(parseInt(id_usuario, 10));
    const {nombreFinal, apellidoFinal, ciFormateado} = user;
    
    // Sección de objetivos en formato de tabla/lista
    
    // Define todosObjetivosTable as an array of elements
    let todosObjetivosTable;
    
    if (objetivos.length > 0) {   
        // Create array with title and table as separate elements
        todosObjetivosTable = [
            // Title element
            {
                text: `Objetivos de ${nombreFinal}`,
                style: 'sectionHeader',
                margin: [0, 15, 0, 10]
            },
            // Table element
            {
                layout: 'lightHorizontalLines',
                table: {
                    widths: [50, '*', 'auto', 'auto'],
                    body: [
                        ['N°','DESCRIPCIÓN','ESTADO','PERÍODO' ],
                        ...objetivos.map((obj, index) =>[
                            index + 1,
                            obj.descripcion,
                            obj.estado_actual,
                            obj.periodoComppleto
                        ]),
                    ],
                },
                margin: [0, 10, 0, 10]
            }
        ];  
    } else {
        todosObjetivosTable = [
            {
                text: `Objetivos de ${nombreFinal}`,
                style: 'sectionHeader',
                margin: [0, 15, 0, 10]
            },
            {
                text: "No hay objetivos registrados.",
                style: 'span',
                italics: true,
                margin: [0, 5, 0, 15]    
            }
        ];
    }
    // Crear tabla para los datos personales
    const tablaPersonal = {
        
        text:[
            {
                text:"Datos Personales\n",
                style: "sectionHeader"
            },
            `Nombre: ${nombreFinal}\nApellido: ${apellidoFinal}\n Cedula de indentidad: ${ciFormateado}`
        ],
            
        margin: [0, 0, 0, 20]
    };
    
    // Tabla para comentarios
    const tablaComentarios = {
    
        text:[
            {
                text: "Comentarios acerca de la evaluacion: ",
                style: "sectionHeader",
            },
            {
                text:`${comentarioFinalEvaluacion}`,
                style: "span",
            }
            
        ],
        margin: [0, 10, 0, 10] // Add margin [left, top, right, botto

    };
    
    // Tabla para comentarios de habilidad
    const tablaHabilidades = {
        text:[
            {
                text: "Comentarios acerca de la evaluacion de habilidades: ",
                style: "sectionHeader",
            },
            {
                text:`${comentarioFinalHabilidad}`,
                style: "span",
            }
            
        ],
        margin: [0, 10, 0, 10] // Add margin [left, top, right, botto
    };
    
    // Sección de puntuación
    const seccionPuntuacion = {
        text: [
            {
                width: '70%',
                text: 'PUNTUACIÓN FINAL: ',
                style: 'sectionHeader',
                alignment: 'center'
            },
            {
                width: '30%',
                text: puntuacion,
                style: 'h1',
                alignment: 'center',
                color: parseInt(puntuacion) >= 3 ? '#27ae60' : parseInt(puntuacion) < 3 ? '#f39c12' : '#e74c3c'
            }
        ],
        margin: [0, 10, 0, 20]
    };
    
    // Create array of objects where each object has Habilidad and res properties
    const totalRespuestas = claves.map((clave, index) => {
        return {
            Habilidad: clave,
            res: index < respuestas.length ? respuestas[index] : 'Sin respuesta'
        };
    });
    
    // Determinar cuántos elementos procesar
    const maxItems = totalRespuestas.length;
    let tablaRespuestas;

    if (maxItems > 0) {
        // Para cada índice dentro del rango máximo, crear una entrada
         tablaRespuestas = [
            // Title element
            {
                text: `Evaluacion de Habilidades`,
                style: 'sectionHeader',
                margin: [0, 15, 0, 10]
            },
            // Table element
            {
                layout: 'lightHorizontalLines',
                table: {
                    widths: ['*', '40%'],
                    body: [
                        ['Habilidad','Tu Resultado' ],
                        ...totalRespuestas.map((item) => [
                           item.Habilidad,
                           item.res
                        ]),
                    ],
                },
                margin: [0, 10, 0, 10]
            }
        ]; 
    } else {
        // Si no hay elementos en ninguno de los arrays
        tablaRespuestas =[
            {
                text: `Evaluacion de Habilidades`,
                style: 'sectionHeader',
                margin: [0, 15, 0, 10]
            },
            {
                text: `No se hizo evaluacion de habilidades`,
                style: 'span',
                margin: [0, 15, 0, 10]
            }
        ]
    }
    
    // Pie de página
    const piePagina = {
        text: `Documento Realizado por ActionMetrics ${fechaFormateada}` ,
        style: 'footer'
    };
    
    // Definir estructura del documento
    const docDefinition = {
        header: {
            columns: [
                {
                    text: `Fecha: ${fechaFormateada}`,
                    alignment: 'right',
                    fontSize: 12,
                }
            ],
            margin: [15, 15, 15, 30]
        },
        content: [
            {
                text: 'Reporte de Desempeño',
                style: 'h1'
            },
            tablaPersonal,
            todosObjetivosTable,
            tablaComentarios,
            tablaRespuestas,
            tablaHabilidades,
            seccionPuntuacion,
            piePagina
        ],
        styles: style,
        pageMargins: [40, 60, 40, 60],
        defaultStyle: {
            font: 'Roboto'
        }
    };
    
    // Si es con IA, agregar la sección correspondiente
    if (withAI) {
        try {
            // Generar análisis de IA
            const analisisIA = await aiService.generateAIComment(user, data);
            
            // Encontrar la posición de seccionPuntuacion
            const seccionIndex = docDefinition.content.findIndex(item => 
                item === seccionPuntuacion
            );
            
            // Insertar la sección de IA DESPUÉS de seccionPuntuacion
            if (seccionIndex !== -1) {
                // Insertar después (+1) de la posición de seccionPuntuacion
                docDefinition.content.splice(seccionIndex + 1, 0,
                    {
                        text: 'Plan de mejora con IA',
                        style: 'sectionHeader',
                        margin: [0, 30, 0, 10],
                        pageBreak: 'before'
                    },
                    {
                        text: analisisIA,
                        style: 'span',
                        margin: [0, 5, 0, 20]
                    }
                );
            }
        } catch (error) {
            console.error('Error al generar análisis de IA:', error);
        }
    }
    
    return docDefinition;
}

const maquetareportWithAI = async (data) => {
    return maquetareport(data, true);
};

module.exports = {
    maquetareport,
    maquetareportWithAI
};