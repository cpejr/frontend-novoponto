import React from "react";
import SessionRow from "./SessionRow";
import ReactRotatingText from "react-rotating-text";

const SessionsTable = ({ sessions, onLogout, ...props }) => {
  return (
    // <div class="table-responsive">
    <table className="table table-borderless" {...props}>
      <thead>
        <tr className="customHeader d-flex ">
          <th className="col-6 col-sm-5 col-md-6">
            <p className="m-0 ms-4">Membro</p>
          </th>
          <th className="col-2 text-center d-none d-sm-block">
            <p className="m-0 text-center">Modalidade</p>
          </th>
          <th className="col-1 col-sm-2 col-md-1 text-center d-none d-sm-block">
            <p className="m-0 text-center">Chegada</p>
          </th>
          <th className="col-2 col-sm-2 col-md-1 text-center">
            <p className="m-0 text-center">Tempo</p>
          </th>
          <th scope="col-4 col-sm-3"></th>
        </tr>
      </thead>
      <tbody >
        <div className="usersSession">
          {sessions?.map((session) => (
            <SessionRow
              key={session.member._id}
              session={session}
              onLogout={onLogout}
            />
          ))}
        </div>

        {(!sessions || sessions.length === 0) && (
          <tr>
            <td colSpan="4">
              <h1 style={{ color: "#fff", fontSize: "30px" }}>
                <ReactRotatingText
                  typingInterval={120}
                  deletingInterval={80}
                  items={[
                    "Tudo vazio por aqui...",
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
