import { useMutation, useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS, GET_USERS_LIST } from "../../graphql/Notification";
import NotificationPopUp from "../../components/organisms/NotificationPopUp";
import { SessionContext } from "../../context/SessionProvider";
import { useContext } from "react";

export const NotificationHome = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);
  const [getUserslistMutation] = useMutation(GET_USERS_LIST);
  const { data: memberData } = useContext(SessionContext);

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
      return verify;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  const validNotifications = data.notifications.filter((notification) => {
    return !verifyUserNotifications(notification.linkValidation, member.email);
  });

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
