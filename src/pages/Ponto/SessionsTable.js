import React from "react";
import SessionRow from "./SessionRow";
import ReactRotatingText from "react-rotating-text";

const SessionsTable = ({ sessions, onLogout, ...props }) => {
  return (
    <table className="HeaderTablePointMembers" {...props}>
      <thead>
        <tr>
          <th className="memberColumn">Membro</th>
          <th className="startTime">Chegada</th>
          <th className="finishTime">Tempo</th>
          <th className="logoutButton"></th>
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

        {(!sessions || sessions.size === 0) && (
          <tr>
            <td colSpan="4">
              <h1 style={{ color: "#fff", fontSize: "30px" }}>
                Trabalhe enquanto eles{" "}
                <ReactRotatingText
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
  );
};

export default SessionsTable;
