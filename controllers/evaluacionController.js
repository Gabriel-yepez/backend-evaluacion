const EvaluacionServices = require("../services/evaluacionServices");
const HabilidadServices = require("../services/habilidadServices");
const PrinterServices = require("../services/printerServices");
const { getReportDefinitionById } = require('../controllers/reportControllers');

const evaluacionServices = new EvaluacionServices();
const habilidadServices = new HabilidadServices();
const printerServices = new PrinterServices();

const getEvaluacionCount = async (req, res)=>{

    try {
        const count = await evaluacionServices.getEvaluacionCount()
        if (!count) return res.status(404).json({ message: "no evaluaciones Found.",count });
        res.status(200).json(count)
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
}

const getAllEvaluacion = async (req, res)=>{
    try {
        const evaluacion = await evaluacionServices.getEvaluacion()

        if(evaluacion.length === 0) return res.status(404).json({ message: "no evaluaciones Found."});
        res.status(200).json(evaluacion)
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
}

const createEvaluacion = async (req, res) => {
    try {
        const { reportId } = req.body;
        
        // Validar que se haya enviado un reportId
        if (!reportId) {
            return res.status(400).json({
                success: false,
                message: "Se requiere el ID del reporte previamente generado"
            });
        }
        
        // Obtener el reporte en caché
        const cachedReport = getReportDefinitionById(reportId);
        
        if (!cachedReport) {
            return res.status(404).json({
                success: false,
                message: "El reporte solicitado no existe o ha expirado. Genere un nuevo reporte."
            });
        }
        
        // Extraer los datos y la definición del documento
        const { docDefinition, reportData } = cachedReport;
        
        // Guardar el PDF y obtener la URL
        const pdfResult = await printerServices.savePdf(docDefinition, reportData.id_usuario, reportData.fecha);
        
        // 2. Luego crear la evaluación con la URL del PDF
        const evaluacionData = {
            fecha: new Date(),
            comentario: reportData.comentarioEvaluacion || 'Sin comentarios',
            estado: true,
            url: pdfResult.fileUrl,
            id_usuario: reportData.id_usuario
        };
        
        const evaluacion = await evaluacionServices.createEvaluacion(evaluacionData);
        
        // 3. Finalmente crear la habilidad asociada
        if (reportData.comentarioHabilidad) {
            const habilidadData = {
                descripcion: reportData.comentarioHabilidad,
                id_evaluacion: evaluacion.id
            };
            
            const habilidad = await habilidadServices.createHabilidad(habilidadData);
            
            // Retornar respuesta completa con evaluación, habilidad y URL del PDF
            return res.status(201).json({
                success: true,
                message: "Evaluación creada exitosamente con habilidad",
                evaluacion,
                habilidad,
                reportUrl: pdfResult.fileUrl
            });
        }
        
        // Retornar respuesta sin habilidad
        return res.status(201).json({
            success: true,
            message: "Evaluación creada exitosamente",
            evaluacion,
            reportUrl: pdfResult.fileUrl
        });
        
    } catch (error) {
        console.error('Error al crear evaluación:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            details: error.message
        });
    }
}

module.exports = {
  getEvaluacionCount,
  getAllEvaluacion,
  createEvaluacion
}