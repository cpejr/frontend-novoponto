import { Button } from "antd";
import React, { useContext } from "react";
import { HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import PresentialDisplayer from "../../components/molecules/PresentialDisplayer";
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
    <tr {...props} className="d-flex justify-content-between">
      <td className="col-6 col-sm-5 col-md-6">
        <LoggedMembers
          name={member.name}
          imageLink={member.imageLink}
          tribe={member?.tribe}
          role={member?.role?.name}
          description={member.status}
          recognition={member.Badge}
        />
      </td>
      <td className="col-2 d-none d-sm-flex align-items-center justify-content-center">
        <div className="d-flex">
          <PresentialDisplayer
            isPresential={session.isPresential}
            presentialColor={themeColors.green}
          />
        </div>
      </td>
      <td className="col-1 col-sm-2 col-md-1 d-none d-sm-flex align-items-center justify-content-center">
        <div className="d-flex">
          <HourDisplayer
            hour={session.start}
            hourColor={themeColors.green}
            dateOrTime={"date"}
          />
        </div>
      </td>
      <td className="col-2 col-sm-2 col-md-1 d-flex align-items-center justify-content-center">
        <div className="d-flex">
          <DurationDisplayer
            startTime={session.start}
            color={themeColors.yellow}
          />
        </div>
      </td>
      <td className="col-1 d-block d-sm-none"></td>
      <td className="col-2 col-sm-1 d-flex align-items-center justify-content-center">
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
