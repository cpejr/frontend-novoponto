import React, { useEffect, useRef, useState, useContext} from "react";
import { Button, message } from "antd";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

import {
  CREATE_SESSION,
  END_ALL_SESSIONS,
  FINISH_SESSION,
  LOGGED_MEMBERS,
} from "../../graphql/Sessions";
import { GET_TASKS } from "../../graphql/Tasks";
import { InputText } from "../../components/atoms";
import searchIcon from "../../assets/searchIcon.svg";
import SessionsTable from "./SessionsTable";
import { SessionContext } from "../../context/SessionProvider";
import ConfirmationModal from "../../components/molecules/ConfirmationModal";
import { SESSION_SUBSCRIPTION } from "../../graphql/Subscription";
import diacriticCaseInsensitiveMatch from "../../utils/diacriticCaseInsensitiveMatch";
import LoginModal from "../../components/molecules/LoginModal";

const Sessions = () => {

  const [memberToLogout, setMemberToLogout] = useState();
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showLogoutAllMembers, setShowLogoutAllMembers] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const [startSessionMutation] = useMutation(CREATE_SESSION);
  const [endSessionMutation] = useMutation(FINISH_SESSION);
  const [endAllSessions] = useMutation(END_ALL_SESSIONS);

  const filterMemberField = useRef();
  const memberToLogin = useRef();
  const { data } = useContext(SessionContext);
  
 memberToLogin.current=data.member;
 
  
  const { data: loggedData, refetch: refetchLoggedMembers } =
    useQuery(LOGGED_MEMBERS);
  const { data: tasksData } = useQuery(GET_TASKS);

  const { data: sessionUpdateData } = useSubscription(SESSION_SUBSCRIPTION);

  const { loggedMembers } = loggedData || {};

  async function handleLogoutMember(member) {  
    let hide = message.loading("Deslogando...");

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

  async function handleLogin(modality, taskId) {
    const hide = message.loading("Fazendo Login...");
    try {
      await startSessionMutation({
        variables: {
          memberId: memberToLogin.current._id,
          isPresential: modality,
          taskId: taskId,
        },
      });
      hide();
      message.success(`Bom trabalho ${memberToLogin.current.name}!`, 2.5);
    } catch (err) {
      hide();
      message.warn(err.message, 2.5);
    } finally {
      memberToLogin.current = undefined;
    
    }
    setLoginModalVisible(false);
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
    const value = filterMemberField?.current?.input.value;
    if (value && value.trim() !== "")
      setFilteredSessions(
        loggedMembers?.filter(({ member: { name } }) =>
          diacriticCaseInsensitiveMatch(name, value)
        )
      );
    else setFilteredSessions(loggedMembers);
  }

  return (
    <div className="pointSection">
      <div className="d-flex flex-column-reverse flex-sm-row flex-grow justify-content-between my-3">
        <div className="mt-sm-0 mt-3 col-sm-6 col-md-5 col-lg-4 col-xl-3">
          <InputText
            ref={filterMemberField}
            icon={searchIcon}
            placeholder="Pesquisar membros"
            onChange={updateFilter}
          />
        </div>
        <form className="d-flex ms-0 ms-sm-3 col-sm-6 col-md-5 col-lg-4 col-xl-3 justify-content-end">
          <Button width="84px"
           onClick={() =>{setLoginModalVisible(true)} } 
           >
            Fazer Login
          </Button> 
        </form>
      </div>

      <div className="w-100 table-responsive mb-3">
        <SessionsTable
          sessions={filteredSessions}
          onLogout={({ member }) => setMemberToLogout(member)}
        />
      </div>

      <div className="d-flex justify-content-end">
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
      <LoginModal
        title="Confirmação de login"
        content={`Como deseja logar ${memberToLogin.current?.name}?`}
        isVisible={loginModalVisible}
        tasks={tasksData?.tasks}
        handleLogin={handleLogin}
        handleCancel={() => setLoginModalVisible(false)}
      />
    </div>
  );
};

export default Sessions;
