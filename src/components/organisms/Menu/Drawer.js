import { Drawer as AntDrawer } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../../molecules/NavigationMenu";

const Drawer = ({ visible, onClose, ...props }) => {
  const location = useLocation();

  useEffect(() => {
    if (visible) onClose && onClose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AntDrawer
      placement="left"
      bodyStyle={{ padding: 0 }}
      closable={false}
      width={200}
      visible={visible}
      onClose={onClose}
      {...props}
    >
      <Menu />
    </AntDrawer>
  );
};

export default Drawer;
