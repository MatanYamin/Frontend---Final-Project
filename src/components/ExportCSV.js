import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import GetAppIcon from '@material-ui/icons/GetApp';
import PeopleIcon from '@material-ui/icons/People';

// This component will receive customers data and will export it as csv file within a button click

export const ExportCSV = ({buttonName, csvData, fileName, numClients}) => {

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
        <>
        <Tabs
        //   textColor="primary"
          indicatorColor="primary"
          centered
        >
        <Tab onClick={(e) => exportToCSV(csvData,fileName)} icon={<GetAppIcon />} label={buttonName + " כקובץ csv"} />
        <Tab icon={<PeopleIcon />} label={"מספר לקוחות: " + numClients} />
        </Tabs>
        {/* <button className="confirm-booking"  onClick={(e) => exportToCSV(csvData,fileName)}>{buttonName} <i className="fas fa-download"></i></button> */}
        </>
    )
}