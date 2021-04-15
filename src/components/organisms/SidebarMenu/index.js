import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarMenuContainer } from "./styles";

import { Layout, Menu } from "antd";
import {
  BulbOutlined,
  UserOutlined,
  ClockCircleOutlined,
  LockOutlined,
  CarryOutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import logoMenu from "../../../assets/logoMenu.svg";
import { SessionContext } from "../../../context/SessionProvider";

const SidebarMenu = ({ children }) => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  const location = useLocation();
  const { data } = useContext(SessionContext);

  const user = data?.login || null; // É isso msm?

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
              defaultSelectedKeys={[location.pathname]}
              theme="light"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="/" icon={<BulbOutlined />}>
                <Link to="/">Ponto</Link>
              </Menu.Item>
              <Menu.Item key="/consultadehoras" icon={<ClockCircleOutlined />}>
                <Link to="/consultadehoras">Consulta de horas</Link>
              </Menu.Item>
              <Menu.Item key="/profile" icon={<UserOutlined />}>
                <Link to="/profile">Perfil</Link>
              </Menu.Item>
              <Menu.Item key="/alteracaodehoras" icon={<CarryOutOutlined />}>
                <Link to="/alteracaodehoras">Adicionar/Remover horas</Link>
              </Menu.Item>
              <SubMenu
                key="sub3"
                icon={<LockOutlined />}
                title="Administração"
                disabled={user?.role?.access !== "ADM"} // É isso msm?
              >
                <Menu.Item key="/acompanhamentodehoras">
                  <Link to="/acompanhamentodehoras">Acomp. de horas</Link>
                </Menu.Item>
                <Menu.Item key="/atualizarnoticias">
                  <Link to="/atualizarnoticias">Atualizar Notícias</Link>
                </Menu.Item>
                <Menu.Item key="/horarioobrigatorio">
                  <Link to="/horarioobrigatorio">Horário Obrigatório</Link>
                </Menu.Item>
                <Menu.Item key="/membros">
                  <Link to="/membros">Membros</Link>
                </Menu.Item>
                <Menu.Item key="/cargos">
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
