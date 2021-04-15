import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import logoMenu from "../../../assets/logoMenu.svg";

const Header = ({ onClickOpenSidebar, isSidebarOpen, ...props }) => {
  return (
    <Layout.Header className="header">
      <div className="logo">
        {isSidebarOpen ? (
          <MenuUnfoldOutlined onClick={onClickOpenSidebar} />
        ) : (
          <MenuFoldOutlined onClick={onClickOpenSidebar} />
        )}
        <Link to="/">
          <img src={logoMenu} alt="Consultoria e Projetos Elétricos Junior" />
        </Link>
      </div>
    </Layout.Header>
  );
};

export default Header;
