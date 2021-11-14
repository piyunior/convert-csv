const document = require("csv-parse");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
let auxArr = []
// const assert = require('assert')

function readCSV(direction, name) {
    fs.createReadStream(direction).pipe(document({ delimiter: ";", trim: true, columns: ['ID', 'TEXTO'] })).on('data', (row) => {
        auxArr.push(row)
    }).on('end', () => {
        let aux = auxArr.map((x) => {
            return {
                id_order: x.ID,
                order_note: x.TEXTO === '' ? null : x.TEXTO
            }
        });
        const csvWriter = createCsvWriter({
            path: `${name}.csv`,
            header: [
                {
                    id: "id_order",
                    title: "id_order"
                },
                {
                    id: "order_note",
                    title: "order_note"
                }
            ]
        })
        csvWriter
            .writeRecords(aux)
            .then(() => console.log('The CSV file was written successfully'))
    })
}
readCSV('./notas_pedidos.csv','notas')
readCSV('./out.csv','outNew')
