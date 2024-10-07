import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../graphql/Notification";
import NotificationPopUp from "../../components/organisms/NotificationPopUp";

export const NotificationHome = () => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>Erro ao carregar notificações!</p>;

  if (!data || !data.notifications || data.notifications.length === 0) {
    return <></>;
  }

  function url() {
    const split = data.notifications[2].linkValidation.split("/");
    const sheetID = split[5];

    console.log(sheetID);

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv`;

    async function fetchSecondColumn() {
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error("Erro ao buscar o CSV: " + response.statusText);
        }

        const csvText = await response.text();
        const data = parseCSV(csvText);
        const secondColumn = data.map((row) => row[1]); // Pega a segunda coluna
        console.log(secondColumn); // Exibe o array da segunda coluna
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    function parseCSV(text) {
      const rows = text.split("\n"); // Divide o texto em linhas
      return rows.map((row) => row.split(",").map((cell) => cell.trim())); // Divide cada linha em células
    }

    // Chama a função para buscar e pegar a segunda coluna
    fetchSecondColumn();
  }

  url();

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
