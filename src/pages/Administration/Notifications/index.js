import { CommonButton, OutlinedBox, TextArea } from "../../../components/atoms";
import MemberProfile from "../../../components/organisms/MemberProfile";
import { MdOutlineTextsms } from "react-icons/md";
import { ThemeContext } from "../../../context/ThemeProvider";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import {
  Container,
  LinkContainer,
  MessageContainer,
  RowContainer,
  TextAreaMessage,
  Title,
  TitleContainer,
} from "./style";

const Notification = () => {
  return (
    <Container>
      <TitleContainer>
        <MdOutlineTextsms className="IconSVG" />
        <Title>Notificações</Title>
      </TitleContainer>
      <RowContainer>
        <MessageContainer>
          <h3>Defina a mensagem:</h3>
          <TextAreaMessage />
        </MessageContainer>
        <LinkContainer>
          <h3>Adicione o link:</h3>
          <TextAreaMessage />
        </LinkContainer>
      </RowContainer>
      <CommonButton className="Button">Enviar</CommonButton>
    </Container>
  );
};

export default Notification;
