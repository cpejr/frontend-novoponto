import React from "react";
import ReactRotatingText from "react-rotating-text";

import { Container, Header, Title } from "./styles";

const Table = ({ tableColumns, sessions, onLogout, ...props }) => {
  return (
    <>
      <Container>
        <Header>
          {tableColumns.map((info) => (
            <Title width={info.width} minWidth={info.minWidth}>
              {info.label}
            </Title>
          ))}
        </Header>
      </Container>
      <table className="table table-borderless" {...props}>
        <thead>
          <tr className="customHeader d-flex">
            <th className="col-5 col-sm-4">
              <p className="m-0 ms-4">Membro</p>
            </th>
            <th className="col-2 text-center d-none d-sm-block">
              <p className="m-0 text-center">Modalidade</p>
            </th>
            <th className="col-2 text-center d-none d-sm-block">
              <p className="m-0 text-center">Chegada</p>
            </th>
            <th className="col-3 col-sm-2 text-center">
              <p className="m-0 text-center">Tempo</p>
            </th>
            <th scope="col-3 col-sm-2"></th>
          </tr>
        </thead>
        <tbody>
          {(!sessions || sessions.length === 0) && (
            <tr>
              <td colSpan="4">
                <h1 style={{ color: "#fff", fontSize: "30px" }}>
                  Trabalhe enquanto eles{" "}
                  <ReactRotatingText
                    typingInterval={120}
                    deletingInterval={80}
                    items={[
                      "dormem...",
                      "comem (???)",
                      "estudam rsrs",
                      "dão migué B)",
                      "... isso não faz mais sentido",
                    ]}
                  />
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
    // </div>
  );
};

export default Table;
