const maquetareport = require('./maquetareport');
const PrinterServices = require('./printerServices');

class ReportServices {

    constructor () {
        this.printer = new PrinterServices();
    }

    async getReport(data) {
        const docDefinition= await maquetareport(data);
        return this.printer.createPdf(docDefinition);
    }
}

module.exports = ReportServices;
