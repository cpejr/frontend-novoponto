import React, { useContext } from "react";

import { PontoComponent,RulesBox,RulesTitle,RulesFlex,RuleItem } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";
import { NotificationHome } from "./NotificationHome";
import { SessionContext } from "../../context/SessionProvider";
const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);
  const rules = [
    "Aplauda se alguém tiver indo bem, dê um toque se alguém tiver fazendo algo errado",
    "Chegar no horário é atraso! 5 minutos de tolerância!",
    "Sujou, Lavou! Desorganizou, Organizou!",
    "Sua presença é importante! 3 horas obrigatórias semanais na salinha!",
    "Câmera desligada é FALTA! Vocês são muito bonitos para ficar de câmera desligada!",
    "Da salinha pra dentro, pensar duas vezes! Respeite seu local de trabalho e o dos seus colegas!",
    "Sempre que se sentir incomodado, utilize o canal de ouvidoria! Queremos te ouvir!"
  ];
  return (
    <PontoComponent theme={themeColors} className="m-0 mt-lg-3 m-lg-5">
      <NotificationHome />
      <NewsCarousel />
      <RulesBox>
      <RulesTitle>REGRAS DE GESTÃO</RulesTitle>
      <RulesFlex>
          {rules.map((regra, index) => (
                <RuleItem key={index}>
                {regra}
              </RuleItem>
          ))}
        </RulesFlex>
      </RulesBox>
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
