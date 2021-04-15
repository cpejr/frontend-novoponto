import React, { useState } from "react";
import { Layout } from "antd";

import Header from "./Header";
import SideBar from "./SideBar";
import { SidebarMenuContainer } from "./styles";

const SidebarMenu = ({ children }) => {
  const { Content } = Layout;

  const [openSideBar, setOpenSideBar] = useState(false);

  const handleOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <SidebarMenuContainer>
      <Layout>
        <Header
          onClickOpenSidebar={handleOpenSideBar}
          isSidebarOpen={openSideBar}
        />
        <Layout hasSider={true}>
          <SideBar />
          <Layout>
            <Content
              id="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
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
