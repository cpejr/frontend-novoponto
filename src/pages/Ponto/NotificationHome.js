import { useMutation, useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS, GET_USERS_LIST } from "../../graphql/Notification";
import NotificationPopUp from "../../components/organisms/NotificationPopUp";
import { SessionContext } from "../../context/SessionProvider";
import { useContext, useEffect, useState } from "react";

export const NotificationHome = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);
  const [getUserslistMutation] = useMutation(GET_USERS_LIST, {
    onError: (err) => {
      console.log(err);
    },
  });
  const { data: memberData } = useContext(SessionContext);

  const [validNotifications, setValidNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (data) {
        let validNot = [];

        for (let i = 0; i < data.notifications.length; i++) {
          const isValid = await verifyUserNotifications(
            data.notifications[i].linkValidation,
            member.email
          );

          if (isValid === false) {
            validNot.push(data.notifications[i]);
          }
        }

        setValidNotifications(validNot);
        console.log(validNot);
      }
    };

    fetchNotifications(); // Chama a função assíncrona
  }, [data]);

  const { member } = memberData || {};

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>Erro ao carregar notificações!</p>;

  if (!data || !data.notifications || data.notifications.length === 0) {
    return <></>;
  }

  async function verifyUserNotifications(sheetURL, userName) {
    try {
      const verify = await getUserslistMutation({
        variables: { sheetID: sheetURL, userName },
      });
      return verify.data.getUserList;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  return (
    <>
      {validNotifications.map((notification) => (
        <NotificationPopUp
          key={notification.id}
          message={notification.text}
          link={notification.link}
          show={true}
        />
      ))}
    </>
  );
};
