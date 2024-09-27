import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../graphql/Notification";
import NotificationPopUp from "../../components/organisms/NotificationPopUp";

export const NotificationHome = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>Erro ao carregar notificações!</p>;

  if (!data || !data.notifications || data.notifications.length === 0) {
    return;
  }

  return (
    <>
      {data.notifications.map((notification) => (
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
