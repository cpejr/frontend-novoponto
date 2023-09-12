import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CommonButton from "../CommonButton";

const ExportExcel = ({ dadosJson, nomeDoArquivo }) => {
  const tipoArquivo = "application/vnd.openxmlformats-officedocument.sheet;charset=UTF-8";
  const extensaoArquivo = ".xlsx";

  async function exportarParaExcel() {
    const dadosPlanilha = XLSX.utils.json_to_sheet(dadosJson);
    const planilha = { Sheets: { "data" : dadosPlanilha }, SheetNames: ["data"] };
    const buffer = XLSX.write(planilha, { bookType: "xlsx", type: "array" });
    const arquivo = new Blob([buffer], { type: tipoArquivo });
    FileSaver.saveAs(arquivo, nomeDoArquivo + extensaoArquivo);
  }

  return (
    <CommonButton className=""
    onClick={() => exportarParaExcel()}
    
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