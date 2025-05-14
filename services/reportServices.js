const PrinterServices = require('./printerServices');


class ReportServices {

    constructor () {
        this.printer = new PrinterServices();
    }

    async getReport() {

        const docDefinition= {

            content: [
                'hola mudno',
                'reporte 1 hecho',
            ]
        }

        return this.printer.createPdf(docDefinition);
    }
}

module.exports = ReportServices;
