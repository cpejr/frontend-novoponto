import React from "react";
import { CommonButton } from "../../../components/atoms";
import { MdOutlineTextsms } from "react-icons/md";
import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
} from "../../../graphql/Notification";
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import MessageInput from "../../../components/atoms/NotificationInput";
import {
  Container,
  NotificationsComponent,
  RowContainer,
  Title,
  TitleContainer,
  TableTest,
  ControllerWrapper,
} from "./style";
import getNotificationColumns from "./NotificationColumn";
import { useForm, Controller } from "react-hook-form";

const Notification = () => {
  const { handleSubmit, reset, control } = useForm();

  // GraphQL hooks
  const [createNotificationMutation] = useMutation(CREATE_NOTIFICATION);
  const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS);
  const [deleteNotificationMutation] = useMutation(DELETE_NOTIFICATION);

  const createNotification = async (data) => {
    const hide = message.loading("Enviando");
    try {
      await createNotificationMutation({
        variables: data,
      });
      hide();
      message.success("Notificação enviada com sucesso", 2.5);
      refetch();
      reset();
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

  const columns = getNotificationColumns(handleDeleteNotification);
  return (
    <Container>
      <TitleContainer>
        <MdOutlineTextsms className="IconSVG" />
        <Title>Notificações</Title>
      </TitleContainer>

      <form onSubmit={handleSubmit(createNotification)}>
        <RowContainer>
          <ControllerWrapper>
            <Controller
              name="text"
              control={control}
              defaultValue=""
              render={({ field,onChange }) => (
                
                <MessageInput
                onChange={onChange}
                  title="Defina a mensagem:"
                  placeholder="Exemplo: 'Coleta quinzenal'."
                  {...field}
                />
              )}
            />
          </ControllerWrapper>
          <ControllerWrapper>
            <Controller
              name="link"
              control={control}
              defaultValue=""
              render={({ field,onChange }) => (
                <MessageInput
                onChange={onChange}
                  title="Adicione o link:"
                  placeholder="Link do forms ou outro questionário."
                  {...field}
                />
              )}
            />
          </ControllerWrapper>
          <ControllerWrapper>
            <Controller
              name="linkValidation"
              control={control}
              defaultValue=""
              render={({ field, onChange }) => (
                <MessageInput
                  onChange={onChange}
                  title="Tabela de confirmados:"
                  placeholder="Link da tabela Google Sheets com todos que realizaram a coleta."
                  {...field}
                />
              )}
            />
          </ControllerWrapper>
        </RowContainer>
        <CommonButton className="Button" type="submit">
          Enviar
        </CommonButton>
      </form>

      <NotificationsComponent>
        <TableTest
          columns={columns}
          dataSource={loading || error ? [] : [...data.notifications].reverse()}
          loading={loading}
          rowKey="_id"
          locale={{
            emptyText: loading ? "Carregando..." : error,
          }}
        />
      </NotificationsComponent>
    </Container>
  );
};

export default Notification;
