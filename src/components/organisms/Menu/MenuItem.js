import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ icon, route, label, ...props }) => {
  return (
    <Menu.Item key={route} icon={icon} {...props}>
      <Link to={route}>{label}</Link>
    </Menu.Item>
  );
};

export default MenuItem;
