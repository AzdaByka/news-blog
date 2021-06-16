import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData, fileName}:{csvData:any,fileName:any}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData: any[], fileName: string) => {
        const arrayForExport: any[] = []
        csvData.forEach((ad) => {
            var object = {
                "Дата": ad[0],
                "Заголовок": ad[1],
                "CTR": ad[2],
                "Показы": ad[3],
                "Комментарии": ad[4],
                "Подписки": ad[5],
            }
            arrayForExport.push(object)
        });

        console.log(arrayForExport);
        const ws = XLSX.utils.json_to_sheet(arrayForExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });


        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button variant="success" onClick={(e) => exportToCSV(csvData,fileName)}>Excel</Button>
    )
}