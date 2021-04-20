import React, { useContext, useEffect, useState } from "react";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { useMutation, useQuery } from "@apollo/client";

import {
  LOGGED_MEMBERS,
  CREATE_SESSION,
  FINISH_SESSION,
} from "../../graphql/Sessions";

import { message, Skeleton } from "antd";

import defaultNews from "../../assets/defaultNews.svg";
import searchIcon from "../../assets/searchIcon.svg";

import InputText from "../../components/atoms/InputText";
import {
  CommonButton,
  HourDisplayer,
  LogoutPointButton,
} from "../../components/atoms";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import ConfirmationModal from "../../components/molecules/Modal";
import AutocompleteInput from "../../components/molecules/AutocompleteInput";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";

import { GlobalsContext } from "../../context/GlobalsProvider";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);
  const {
    membersLoading,
    membersError,
    membersData,
    refetchMembers,
  } = useContext(GlobalsContext);

  const {
    loading: loadingLoggedMembers,
    error: errorLoggedMembers,
    data: loggedMembers,
    refetch: refetchLoggedMembers,
  } = useQuery(LOGGED_MEMBERS);

  const [filteredMembers, setFilteredMembers] = useState([]);

  const [errorInpuLogin, setErrorInpuLogin] = useState(false);

  const [memberToLogin, setMemberToLogin] = useState("");
  const [memberToLogout, setMemberToLogout] = useState("");
  const [memberToLogoutMessage, setMemberToLogoutMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLogoutMemberModal, setShowLogoutMemberModal] = useState(false);

  const [resetAutocompleteField, setResetAutocompleteField] = useState(false);

  const [startSessionMutation] = useMutation(CREATE_SESSION);
  const [endSessionMutation] = useMutation(FINISH_SESSION);

  let clearSetTimeout = "";

  const handleOkModal = () => {
    setShowModal(false);
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleLogin = async () => {
    if (!memberToLogin) {
      setErrorInpuLogin(true);
    } else {
      setErrorInpuLogin(false);

      const foundMemberIndex = membersData.members
        .map((member) => member.name)
        .indexOf(memberToLogin);
      const foundMemberLoggedIndex = loggedMembers.loggedMembers
        .map((member) => member.name)
        .indexOf(memberToLogin);

      if (foundMemberIndex !== -1 && foundMemberLoggedIndex == -1) {
        var hide = message.loading("Fazendo Login...");
        try {
          await startSessionMutation({
            variables: { memberId: membersData.members[foundMemberIndex]._id },
          });
          hide();
          message.success(
            `Bom trabalho ${membersData.members[foundMemberIndex].name}!`,
            2.5
          );
        } catch (err) {
          console.error(err);
          hide();
          message.error("Houve um problema, tente novamente", 2.5);
        }
        refetchMembers();
        refetchLoggedMembers();
        setMemberToLogin(null);
        setResetAutocompleteField(true);
      }
    }
  };

  const handleLogoutAllMembers = () => {
    if (loggedMembers.loggedMembers.length > 0) {
      loggedMembers.loggedMembers.forEach((member) => {
        handleLogoutMember(member);
      });
    }
  };

  const handleSearchMembers = (e) => {
    if (e.target.value !== "") {
      const filteredMembersAfterForEach = filteredMembers.filter((item) => {
        if (item.member.name.toLowerCase().includes(e.target.value)) {
          return item;
        }
      });
      setFilteredMembers(filteredMembersAfterForEach);
    } else {
      setFilteredMembers([...loggedMembers.loggedMembers]);
    }
  };

  const handleOpenModalToLogoutMember = (member) => {
    setMemberToLogoutMessage(`Deseja deslogar ${member.name}?`);
    setMemberToLogout(member);
    setShowLogoutMemberModal(true);
  };

  const handleCancelLogoutMemberModal = () => {
    setShowLogoutMemberModal(false);
  };

  const handleLogoutMember = async (member) => {
    var hide = message.loading("Fazendo Login...");
    try {
      await endSessionMutation({
        variables: { memberId: member._id },
      });
      hide();
      message.success(`Bom descanso ${member.name}!`, 2.5);
      setShowLogoutMemberModal(false);
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetchMembers();
    refetchLoggedMembers();
  };

  useEffect(() => {
    if (loggedMembers) {
      const filtered = loggedMembers.loggedMembers.slice().sort((a, b) => {
        if (a.member.name < b.member.name) {
          return -1;
        }
        if (a.member.name > b.member.name) {
          return 1;
        }
        return 0;
      });
      setFilteredMembers(filtered);
    }
    setResetAutocompleteField(false);
  }, [loggedMembers]);

  useEffect(() => {
    clearTimeout(clearSetTimeout);
    function carregou() {
      var elements = document.getElementsByClassName("txt-rotate");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      // css.type = "text/css";
      css.innerHTML =
        ".txt-rotate > .wrap { font-size: 30px; border-right: 0.01em solid #666 }";
      document.body.appendChild(css);
    }
    carregou();
  }, [filteredMembers]);

  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    clearSetTimeout = setTimeout(function () {
      that.tick();
    }, delta);
  };

  if (loadingLoggedMembers || membersLoading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={loadingLoggedMembers}
        loading={loadingLoggedMembers}
      />
    );
  else if (errorLoggedMembers || membersError) {
    message.error("Erro ao carregar os membros, tente recarregar a pagina");
    return <div>Erro</div>;
  } else {
    const options = membersData.members.map((item) => item.name);
    return (
      <PontoComponent theme={themeColors}>
        <div className="fullContentPagePoint">
          <div className="newsSection">
            <div className="news">
              <img src={defaultNews} alt="Confira as novidades" />
            </div>

            <div className="news">
              <img src={defaultNews} alt="Confira as novidades" />
            </div>
          </div>

          <div className="pointSection">
            <div className="searchesSubsection">
              <InputText
                icon={searchIcon}
                placeholder="Pesquisar membros"
                onChange={(e) => handleSearchMembers(e)}
              />

              <div className="loginAndItsValidateSection">
                <div className="loginSection">
                  <AutocompleteInput
                    options={options}
                    callback={setMemberToLogin}
                    resetAutocompleteField={resetAutocompleteField}
                  />
                  <CommonButton
                    buttonLabel="Login"
                    color={themeColors.yellow}
                    width="84px"
                    onClick={handleLogin}
                  />
                </div>
                {errorInpuLogin && (
                  <span className="validateMessageLogin">Campo vazio.</span>
                )}
              </div>
            </div>

            <div className="subSectionLoggedMembers">
              <table className="HeaderTablePointMembers">
                <thead>
                  <tr>
                    <th className="memberColumn">Membro</th>
                    <th className="startTime">Chegada</th>
                    <th className="finishTime">Tempo</th>
                    <th className="logoutButton"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((item, index) => (
                      <tr key={index}>
                        <td className="memberColumn">
                          <LoggedMembers
                            name={item.member.name}
                            imageLink={item.member.imageLink}
                            role={item.member.role.name}
                            description={item.member.status}
                          />
                        </td>
                        <td className="startTime">
                          <HourDisplayer
                            hour={item.start}
                            hourColor={themeColors.green}
                            dateOrTime={"date"}
                          />
                        </td>
                        <td className="finishTime">
                          <DurationDisplayer
                            startTime={item.start}
                            color={themeColors.yellow}
                          />
                        </td>
                        <td className="logoutButton">
                          <LogoutPointButton
                            onClick={() =>
                              handleOpenModalToLogoutMember(item.member)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <h1 style={{ color: "#fff", fontSize: "30px" }}>
                          Trabalhe enquanto eles
                          <span
                            className="txt-rotate"
                            data-period="2000"
                            data-rotate='[ " dormem...", " comem (???)", " estudam rsrs", " dão migué B)", " ... isso não faz mais sentido" ]'
                          ></span>
                        </h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="buttonLogouAllMembers">
              <CommonButton
                buttonLabel="Deslogar todos os membros"
                color={themeColors.yellow}
                width="207px"
                onClick={handleLogoutAllMembers}
              />
            </div>
          </div>
        </div>
        <ConfirmationModal
          content="teste"
          title="Um titulo"
          isVisible={showModal}
          handleOk={handleOkModal}
          handleCancel={handleCancelModal}
        />
        <ConfirmationModal
          title="Confirmação de logout"
          content={memberToLogoutMessage}
          isVisible={showLogoutMemberModal}
          handleOk={() => handleLogoutMember(memberToLogout)}
          handleCancel={handleCancelLogoutMemberModal}
        />
      </PontoComponent>
    );
  }
};

export default Ponto;
