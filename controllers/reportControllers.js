const ReportServices = require('../services/reportServices');
const services = new ReportServices();

const getReport = async (req, res) => {
    try {
        const report = await services.getReport(req.body);
        if (!report) return res.status(404).json({ message: "Report not found." });
        res.setHeader('Content-Type','application/pdf');
        report.pipe(res);
        report.end();

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getReportWithAI = async (req, res) => {
    try {
        
        const report = await services.getReportWithAI(req.body);
        if (!report) return res.status(404).json({ message: "No se pudo generar el reporte con IA" });
        
        res.setHeader('Content-Type','application/pdf');
        report.pipe(res);
        report.end();

    } catch (error) {
        console.error('Error al generar reporte con IA:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}

module.exports = {
    getReport,
    getReportWithAI
};