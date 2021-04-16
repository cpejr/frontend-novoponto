import React, { useContext } from "react";
import { Layout } from "antd";

import Header from "./Header";
import SideBar from "./SideBar";
import { SidebarMenuContainer } from "./styles";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const SidebarMenu = ({ children }) => {
  const { Content } = Layout;

  const { menuColapse, toggleMenu } = useContext(GlobalsContext);

  return (
    <SidebarMenuContainer>
      <Layout>
        <Header
          onClickOpenSidebar={toggleMenu}
          isSidebarColapsed={menuColapse}
        />
        <Layout hasSider={true}>
          <SideBar collapsed={menuColapse} />
          <Layout>
            <Content
              id="site-layout-background"
              style={{
                margin: 0,
                minHeight: "100vh",
                padding: 16,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </SidebarMenuContainer>
  );
};

export default SidebarMenu;
