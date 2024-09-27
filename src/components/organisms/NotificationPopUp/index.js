import { useState, useEffect } from "react";
import { Container } from "./styles";
import { IoClose } from "react-icons/io5";

const NotificationPopUp = ({ message, link, show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [show]);

  const handleClose = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const handleLink = () => {
    window.open(link, "_blank");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Container visible={visible} onClick={handleLink}>
      <IoClose className="iconClose" onClick={handleClose} />
      <h1>{message}</h1>
    </Container>
  );
};

export default NotificationPopUp;
