import React, { useContext, useEffect, useState } from "react";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import defaultNews from "../../assets/defaultNews.svg";
import searchIcon from "../../assets/searchIcon.svg";

import InputText from "../../components/atoms/InputText";
import CommonButton from "../../components/atoms/CommonButton";
import HourDisplayer from "../../components/atoms/HourDisplayer";
import LogoutPointButton from "../../components/atoms/LogoutPointButton";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import ConfirmationModal from "../../components/molecules/Modal";

const fakeLoggedMembers = [
  {
    member: "Diogo",
    role: "Gerente de Produtos",
    description: "Um teste",
  },
  {
    member: "Arthur Lima",
    role: "Head de Projetos",
    description: "Opa, e ai",
  },
  {
    member: "Arthur Braga",
    role: "Head de Marketing",
    description: "NADA MAIS",
  },
  {
    member: "João Prates",
    role: "Consultor de Vendas",
    description: "VENDASSSSSSSSSSSS",
  },
];

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  const [loggedMembers, setLoggedMembers] = useState(fakeLoggedMembers);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [errorInpuLogin, setErrorInpuLogin] = useState(false);

  const [memberToLogin, setMemberToLogin] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (e) => {
    setMemberToLogin(e.target.value);
  };

  const handleOpenModal = () => {
    console.log("clicou");
    setShowModal(true);
  };
  const handleOkModal = () => {
    setShowModal(false);
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    // alert("Parabéns, vc logou!");

    if(memberToLogin === ''){
      setErrorInpuLogin(true)
    }else{
      setErrorInpuLogin(false)
    }
    // handleOpenModal();
  };

  const handleLogouAllMembers = () => {
    // alert("Parabéns, vc logou!");
    if(loggedMembers.length > 0){
        setLoggedMembers([]);
    }
  };

  const handleSearchMembers = (e) => {
    if (e.target.value !== "") {
      const filteredMembersAfterForEach = filteredMembers.filter((item) => {
        if (item.member.toLowerCase().includes(e.target.value)) {
          return item;
        }
      });
      setFilteredMembers(filteredMembersAfterForEach);
    } else {
      setFilteredMembers(loggedMembers);
    }
  };

  const handleLogoutMember = (membersName) => {
    const teste = filteredMembers.filter(item => item.member !== membersName);
    setFilteredMembers(teste);
  }

  useEffect(() => {
    setFilteredMembers(
      loggedMembers.sort(function (a, b) {
        if (a.member < b.member) {
          return -1;
        }
        if (a.member > b.member) {
          return 1;
        }
        return 0;
      })
    );
  }, [loggedMembers]);

  useEffect(() => {
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
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };
    carregou();
  }, [filteredMembers])
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

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  

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
              handleInputText={(e) => handleSearchMembers(e)}
            />

            <div className="loginAndItsValidateSection">
              <div className="loginSection">
                <InputText placeholder="Logar" handleInputText={handleLogin} error={errorInpuLogin}/>
                <CommonButton
                  buttonLabel="Login"
                  buttonColor={themeColors.yellow}
                  buttonColorHover={themeColors.yellowHover}
                  buttonWidth="84px"
                  handleClick={handleClick}
                />
              </div>
              { errorInpuLogin &&
                  <span className="validateMessageLogin">
                    Campo vazio.
                  </span>
              }
            </div>
          </div>

          <div className="subSectionLoggedMembers">
            <table className="HeaderTablePointMembers">
              <tr>
                <th className="memberColumn">Membro</th>
                <th className="startTime">Chegada</th>
                <th className="finishTime">Tempo</th>
                <th className="logoutButton"></th>
              </tr>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((item, index) => (
                  <tr key={index}>
                    <td className="memberColumn">
                      <LoggedMembers
                        name={item.member}
                        role={item.role}
                        description={item.description}
                      />
                    </td>
                    <td className="startTime">
                      <HourDisplayer
                        hour={new Date()}
                        hourColor={themeColors.green}
                      />
                    </td>
                    <td className="finishTime">
                      <HourDisplayer
                        hour={new Date().getTime()}
                        hourColor={themeColors.yellow}
                        startTime={true}
                      />
                    </td>
                    <td className="logoutButton">
                      <LogoutPointButton onClick={() => handleLogoutMember(item.member)}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <h1 style={{color: '#fff'}}>
                    Trabalhe enquanto eles 
                    <span
                      class="txt-rotate"
                      data-period="2000"
                      data-rotate='[ " dormem...", " comem (???)", " estudam rsrs", " dão migué B)", " ... isso não faz mais sentido" ]'
                    ></span>
                  </h1>
                </tr>
              )}
            </table>
          </div>

          <div className="buttonLogouAllMembers">
            <CommonButton
              buttonLabel="Deslogar todos os membros"
              buttonColor={themeColors.yellow}
              buttonColorHover={themeColors.yellowHover}
              buttonWidth="207px"
              handleClick={handleLogouAllMembers}
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
    </PontoComponent>
  );
};

export default Ponto;
