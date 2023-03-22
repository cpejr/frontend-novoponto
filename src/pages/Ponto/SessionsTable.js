import React from "react";
import SessionRow from "./SessionRow";
import ReactRotatingText from "react-rotating-text";

const SessionsTable = ({ sessions, onLogout, ...props }) => {
  return (
    // <div class="table-responsive">
    <table className="table table-borderless" {...props}>
      <thead>
        <tr className="customHeader d-flex">
          <th className="col-6 col-sm-4">
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
        {sessions?.map((session) => (
          <SessionRow
            key={session.member._id}
            session={session}
            onLogout={onLogout}
          />
        ))}

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
    // </div>
  );
};

export default SessionsTable;
