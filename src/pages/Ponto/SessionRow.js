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
      <td className="memberColumn">
        <LoggedMembers
          name={member.name}
          imageLink={member.imageLink}
          role={member?.role?.name}
          description={member.status}
        />
      </td>
      <td className="startTime">
        <HourDisplayer
          date={session.start}
          hourColor={themeColors.green}
        />
      </td>
      <td className="finishTime">
        <DurationDisplayer
          startTime={session.start}
          color={themeColors.yellow}
        />
      </td>
      <td className="logoutButton">
        <Button
          icon={<img src={logoutPointIcon} alt="Deslogar" />}
          onClick={handleLogout}
        />
      </td>
    </tr>
  );
};

export default SessionRow;
