import { Button } from "antd";
import React, { useContext } from "react";
import { HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import { ThemeContext } from "../../context/ThemeProvider";

import logoutPointIcon from "../../assets/logoutPointIcon.svg";

const SessionRow = ({ session, onLogout, ...props }) => {
  const { themeColors } = useContext(ThemeContext);

  const { member } = session;

  function handleLogout() {
    onLogout && onLogout(session);
  }

  return (
    <tr {...props}>
      <td className="col-sm-6">
        <LoggedMembers
          name={member.name}
          imageLink={member.imageLink}
          role={member?.role?.name}
          description={member.status}
        />
      </td>
      <td className="col-sm-2 d-none d-sm-table-cell align-middle">
        <div className="d-flex justify-content-center">
          <HourDisplayer
            hour={session.start}
            hourColor={themeColors.green}
            dateOrTime={"date"}
          />
        </div>
      </td>
      <td className="col-sm-2 align-middle">
        <div className="d-flex justify-content-center">
          <DurationDisplayer
            startTime={session.start}
            color={themeColors.yellow}
          />
        </div>
      </td>
      <td className="col-sm-2 align-middle">
        <Button
          className="w-100"
          icon={<img src={logoutPointIcon} alt="Deslogar" />}
          onClick={handleLogout}
        />
      </td>
    </tr>
  );
};

export default SessionRow;
