import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ icon, route, label, children, ...props }) => {
  return (
    <Menu.Item key={route} icon={icon} {...props}>
      {!children ? <Link to={route}>{label}</Link> : children}
    </Menu.Item>
  );
};

export default MenuItem;
