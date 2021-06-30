import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// This component will receive customers data and will export it as csv file within a button click

export const ExportCSV = ({buttonName, csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';


    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }

    return (
        // this is the button that is displayed to the managers
        <button className="confirm-booking"  onClick={(e) => exportToCSV(csvData,fileName)}>{buttonName} <i className="fas fa-download"></i></button>
    )
}