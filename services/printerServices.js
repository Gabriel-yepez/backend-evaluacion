const PdfPrinter = require('pdfmake');

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

class PrinterServices {

    static printer = new PdfPrinter(fonts);
    createPdf = (docDefinition) => {
        return PrinterServices.printer.createPdfKitDocument(docDefinition);
    }
}

module.exports = PrinterServices;