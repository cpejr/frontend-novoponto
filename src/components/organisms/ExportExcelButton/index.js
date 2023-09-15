import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CommonButton from "../../atoms/CommonButton";

  const ExportExcel = ({ jsonFormatedData, archiveName }) => {
  const archiveType = "application/vnd.openxmlformats-officedocument.sheet;charset=UTF-8";
  const archiveExtension = ".xlsx";

  async function exportToExcel() {
    const sheetData = XLSX.utils.json_to_sheet(jsonFormatedData);
    const sheet = { Sheets: { "data" : sheetData }, SheetNames: ["data"] };
    const buffer = XLSX.write(sheet, { bookType: "xlsx", type: "array" });
    const archive = new Blob([buffer], { type: archiveType });
    FileSaver.saveAs(archive, archiveName + archiveExtension);
  }

  return (
    <CommonButton 
    onClick={() => exportToExcel()}
    
    style={{
      padding: "1rem",
      backgroundColor: "#22762b",
      color: "white",
      borderRadius: "5px"}}
    >    
     Visualizar em Planilha
   </CommonButton>
  );
};

export default ExportExcel;