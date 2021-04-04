import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarMenuContainer } from "./styles";

import { Layout, Menu } from "antd";
import {
  BulbOutlined,
  UserOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  LockOutlined,
  CarryOutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import logoMenu from "../../../assets/logoMenu.svg";

const SidebarMenu = ({ children }) => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  const [openSideBar, setOpenSideBar] = useState(false);

  const handleOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <SidebarMenuContainer>
      <Layout>
        <Header className="header">
          <div className="logo">
            {openSideBar ? (
              <MenuUnfoldOutlined onClick={handleOpenSideBar} />
            ) : (
              <MenuFoldOutlined onClick={handleOpenSideBar} />
            )}
            <Link to="/">
              <img
                src={logoMenu}
                alt="Consultoria e Projetos Elétricos Junior"
              />
            </Link>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            className="site-layout-background"
            trigger={null}
            collapsible
            collapsed={openSideBar}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              theme="light"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<BulbOutlined />}>
                <Link to="/">Ponto</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ClockCircleOutlined />}>
                <Link to="/consultadehoras">Consulta de horas</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/profile">Perfil</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CarryOutOutlined />}>
                <Link to="/alteracaodehoras">Adicionar/Remover horas</Link>
              </Menu.Item>
              {/* <Menu.Item key="5" icon={<LockOutlined />}>
                <Link to="/admin/login">Administração</Link>
              </Menu.Item> */}
              <SubMenu
                key="sub3"
                icon={<LockOutlined />}
                title="Administração"
              >
                <Menu.Item key="9">
                  <Link to="/acompanhamentodehoras">Acomp. de horas</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/atualizarnoticias">Atualizar Notícias</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to="/horarioobrigatorio">Horário Obrigatório</Link>
                </Menu.Item>
                <Menu.Item key="12">
                  <Link to="/membros">Membros</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to="/cargos">Cargos</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
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
