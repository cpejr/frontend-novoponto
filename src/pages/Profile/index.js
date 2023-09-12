import React, { useContext, useEffect } from "react";
import { ProfileComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { OutlinedBox } from "../../components/atoms";
import MemberProfile from "../../components/organisms/MemberProfile";
import useGoogleAuth from "../../services/firebase";
import ExportExcel from "../../components/atoms/ExportExcelButton";

const CardView = () => {
  const { themeColors } = useContext(ThemeContext);
  const { data, updateSelf, getSessionData } = useContext(SessionContext);
  const { googleLogout } = useGoogleAuth();

  useEffect(() => {
    if (!!data) getSessionData();
    if (data && !data?.member?.message?.read)
      updateSelf({
        message: { read: true, text: data?.member?.message?.text },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const dadosJson = ;
  const nomeDoArquivo = "PlanilhaSessões";

  return (
    <ProfileComponent theme={themeColors} >
      <OutlinedBox className="outlinedBox mx-auto mx-md-0">
        <MemberProfile
          onLogOut={googleLogout}
          onSave={updateSelf}
          member={data?.member}
        />
      </OutlinedBox>
      <ExportExcel></ExportExcel>
    </ProfileComponent>
  );
};

export default CardView;
