import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import logoMenu from "../../../assets/logoHeader.png";

const Header = ({ isMobile, onClickToggle, isSidebarColapsed, ...props }) => {
  function getDesktopIcon() {
    if (isSidebarColapsed)
      return <MenuUnfoldOutlined onClick={onClickToggle} />;
    return <MenuFoldOutlined onClick={onClickToggle} />;
  }

  let style = {};
  //if (isMobile) style = { position: "fixed", zIndex: 1, width: "100%" };

  return (
    <Layout.Header className="header" style={style}>
      <div className="logo">
        {isMobile ? <MenuOutlined onClick={onClickToggle} /> : getDesktopIcon()}
        <Link to="/">
          <img src={logoMenu} alt="Ábaco consultoria" />
        </Link>
      </div>
    </Layout.Header>
  );
};

export default Header;
