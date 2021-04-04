import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import {
  DefaultLabel,
  DefaultText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  TextArea,
} from "../../components/atoms";
import { SessionContext } from "../../context/SessionProvider";

const Profile = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, logOut } = useContext(SessionContext);

  return (
    <>
      <div className="row">
        <MemberAvatar src={data?.member?.imageLink} />
        <div className="col-1">
          <MemberName name={data?.member?.name} className="namePart" />
          <DefaultLabel
            labelText={data?.member?.role?.name}
            labelColor="#FFD100"
          />
        </div>
        <LogoutPointButton className="exitButton" onClick={logOut} />
      </div>
      <div>
        <DefaultText>Assessor: {data?.member?.responsible?.name}</DefaultText>
      </div>
      <DefaultText>Menssagem do acompanhamento:</DefaultText>
      <div className="message">
        <DefaultText>{data?.member?.message}</DefaultText>
      </div>
      <DefaultText>Frase:</DefaultText>
      <TextArea maxLength={50} />
    </>
  );
};

export default Profile;
