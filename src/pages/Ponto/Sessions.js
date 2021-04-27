import React, { useEffect, useRef, useState } from "react";
import { Button, message } from "antd";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

import {
  CREATE_SESSION,
  END_ALL_SESSIONS,
  FINISH_SESSION,
  LOGGED_MEMBERS,
} from "../../graphql/Sessions";
import { InputText } from "../../components/atoms";
import searchIcon from "../../assets/searchIcon.svg";
import SessionsTable from "./SessionsTable";
import ConfirmationModal from "../../components/molecules/Modal";
import AutocompleteMemberInput from "../../components/organisms/AutoCompleteMemberInput";
import { SESSION_SUBSCRIPTION } from "../../graphql/Subscription";

const Sessions = ({ members, ...props }) => {
  const [memberTextToLogin, setMemberTextToLogin] = useState("");
  const [memberToLogout, setMemberToLogout] = useState();
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showLogoutAllMembers, setShowLogoutAllMembers] = useState(false);

  const [startSessionMutation] = useMutation(CREATE_SESSION);
  const [endSessionMutation] = useMutation(FINISH_SESSION);
  const [endAllSessions] = useMutation(END_ALL_SESSIONS);

  const filterMemberField = useRef();
  const memberToLogin = useRef();

  const {
    loading: loadingLoggedMembers,
    error: errorLoggedMembers,
    data: loggedData,
    refetch: refetchLoggedMembers,
  } = useQuery(LOGGED_MEMBERS);

  const { data: sessionUpdateData } = useSubscription(SESSION_SUBSCRIPTION);

  const { loggedMembers } = loggedData || {};

  async function handleLogoutMember(member) {
    let hide = message.loading("Deslogado...");

    try {
      await endSessionMutation({
        variables: { memberId: member._id },
      });

      hide();

      message.success(`Bom descanso ${member.name}!`, 2.5);
      setMemberToLogout();
    } catch (err) {
      hide();
      console.error(err);
      message.error("Houve um problema, tente novamente", 2.5);
    }
  }

  async function handleLogin() {
    if (memberToLogin.current) {
      let hide = message.loading("Fazendo Login...");

      try {
        await startSessionMutation({
          variables: { memberId: memberToLogin.current._id },
        });
        hide();
        message.success(`Bom trabalho ${memberToLogin.current.name}!`, 2.5);
      } catch (err) {
        hide();
        message.warn(err.message, 2.5);
      } finally {
        memberToLogin.current = undefined;
        setMemberTextToLogin();
      }
    }
  }

  useEffect(() => {
    refetchLoggedMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUpdateData]);

  useEffect(() => {
    updateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedMembers]);

  function updateFilter() {
    const value = filterMemberField.current.value;

    if (!value || value !== "" || value.trim() !== "")
      setFilteredSessions(
        loggedMembers?.filter((session) => session.includes(value.trim()))
      );
    else setFilteredSessions(loggedMembers);
  }

  return (
    <div className="pointSection">
      <div className="searchesSubsection">
        <InputText
          ref={filterMemberField}
          icon={searchIcon}
          placeholder="Pesquisar membros"
          onChange={updateFilter}
        />

        <div className="loginAndItsValidateSection">
          <form className="loginSection">
            <AutocompleteMemberInput
              onChange={setMemberTextToLogin}
              value={memberTextToLogin}
              onMemberChange={(member) => (memberToLogin.current = member)}
              onKeyDown={(e) => e.keyCode === 13 && handleLogin()}
            />
            <Button width="84px" onClick={handleLogin}>
              Login
            </Button>
          </form>
        </div>
      </div>

      <div className="subSectionLoggedMembers">
        <SessionsTable
          sessions={filteredSessions}
          onLogout={({ member }) => setMemberToLogout(member)}
        />
      </div>

      <div className="buttonLogouAllMembers">
        <Button onClick={() => setShowLogoutAllMembers(true)}>
          Deslogar todos os membros
        </Button>
      </div>
      <ConfirmationModal
        title="Confirmação de logout"
        content={`Deseja deslogar ${memberToLogout?.name}?`}
        isVisible={!!memberToLogout}
        handleOk={() => handleLogoutMember(memberToLogout)}
        handleCancel={() => setMemberToLogout()}
      />
      <ConfirmationModal
        title="Confirmação"
        content={`Deseja deslogar todos os membros?`}
        isVisible={showLogoutAllMembers}
        handleOk={() => {
          endAllSessions();
          setShowLogoutAllMembers(false);
        }}
        handleCancel={() => setShowLogoutAllMembers(false)}
      />
    </div>
  );
};

export default Sessions;
