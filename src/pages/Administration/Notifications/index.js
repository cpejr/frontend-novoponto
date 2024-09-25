import React, { useState } from "react";

import { CommonButton, OutlinedBox, TextArea } from "../../../components/atoms";
import { MdOutlineTextsms } from "react-icons/md";
import { ThemeContext } from "../../../context/ThemeProvider";
import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
} from "../../../graphql/Notification";
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";

import {
  Container,
  LinkContainer,
  MessageContainer,
  NotificationsComponent,
  RowContainer,
  TextAreaMessage,
  Title,
  TitleContainer,
} from "./style";
import NotificationRow from "./NotificationRow";

const Notification = () => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  //hook
  const [createNotificationMutation] = useMutation(CREATE_NOTIFICATION);
  const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS);
  const [deleteNotificationMutation] = useMutation(DELETE_NOTIFICATION);

  const createNotification = async () => {
    const hide = message.loading("Enviando");
    const newNotification = {
      text,
      link,
    };

    try {
      const response = await createNotificationMutation({
        variables: newNotification,
      });
      console.log(response);
      hide();
      message.success("Notificação enviada com sucesso", 2.5);
      setText("");
      setLink("");
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
  };

  const handleDeleteNotification = async (_id) => {
    const hide = message.loading("Deletando...");

    try {
      await deleteNotificationMutation({ variables: { _id } });
      hide();
      refetch();
      message.success("Notificação deletada com sucesso", 2.5);
    } catch (error) {
      console.error(error);
      hide();
      message.error("Houve um problema ao deletar a notificação", 2.5);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <MdOutlineTextsms className="IconSVG" />
        <Title>Notificações</Title>
      </TitleContainer>
      <RowContainer>
        <MessageContainer>
          <h3>Defina a mensagem:</h3>
          <TextAreaMessage
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </MessageContainer>
        <LinkContainer>
          <h3>Adicione o link:</h3>
          <TextAreaMessage
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </LinkContainer>
      </RowContainer>
      <CommonButton className="Button" onClick={createNotification}>
        Enviar
      </CommonButton>
      <NotificationsComponent>
        <table className="notificationTable">
          <thead>
            <tr>
              <th className="messageColumn">Mensagem</th>
              <th className="linkColumn">Link</th>
              <th className="actionColumn">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3">Erro ao carregar as notificações!</td>
              </tr>
            ) : (
              data.notifications
                .slice()
                .reverse()
                .map((notification) => (
                  <NotificationRow
                    key={notification._id}
                    notification={notification}
                    onDelete={() => handleDeleteNotification(notification._id)}
                  />
                ))
            )}
          </tbody>
        </table>
      </NotificationsComponent>
    </Container>
  );
};

export default Notification;
