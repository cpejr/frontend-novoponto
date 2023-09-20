import React, { useContext } from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CommonButton from "../../atoms/CommonButton";
import { SessionContext } from "../../../context/SessionProvider";

const ExportExcel = ({ jsonData, archiveName }) => {
  const { data } = useContext(SessionContext);
  const { member } = data || {};

  const archiveType =
    "application/vnd.openxmlformats-officedocument.sheet;charset=UTF-8";
  const archiveExtension = ".xlsx";

  const jsonFormatedData = jsonData.map((session) => {
    return {
      Início: session?.start,
      Fim: session?.end,
      Duração: session?.formatedDuration,
      "Nome da Tarefa": session?.task.name,
      "É presencial?": session?.isPresential,
    };
  });

  async function exportToExcel() {
    const sheetData = XLSX.utils.json_to_sheet(jsonFormatedData);
    const sheet = { Sheets: { data: sheetData }, SheetNames: ["data"] };
    const buffer = XLSX.write(sheet, { bookType: "xlsx", type: "array" });
    const archive = new Blob([buffer], { type: archiveType });
    FileSaver.saveAs(
      archive,
      `${archiveName} - ${member?.name} - ${member?.role?.name} - ${member?.tribe?.name}.${archiveExtension}`
    );
  }

  return (
    <CommonButton onClick={() => exportToExcel()} color="#22762b" nowrap>
      Visualizar em Planilha
    </CommonButton>
  );
};

export default ExportExcel;

