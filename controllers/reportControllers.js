const ReportServices = require('../services/reportServices');
const services = new ReportServices();

const getReport = async (req, res) => {
    try {
        const report = await services.getReport();
        if (!report) return res.status(404).json({ message: "Report not found." });
        res.setHeader('Content-Type','application/pdf');
        report.pipe(res);
        report.end();

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = {
    getReport
};