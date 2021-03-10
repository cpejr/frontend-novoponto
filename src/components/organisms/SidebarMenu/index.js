import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    SidebarMenuContainer,
} from "./styles";

import { Layout, Menu } from 'antd';
import { BulbOutlined, 
    UserOutlined, 
    ClockCircleOutlined, 
    NotificationOutlined, 
    LockOutlined, 
    CarryOutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined } from '@ant-design/icons';

import logoMenu from '../../../assets/logoMenu.svg';

const SidebarMenu = ({children}) => {
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
                    {
                        openSideBar ? <MenuUnfoldOutlined onClick={handleOpenSideBar} /> : <MenuFoldOutlined  onClick={handleOpenSideBar}/>
                    }
                    <Link to="/">
                        <img src={logoMenu} alt="Consultoria e Projetos Elétricos Junior" />
                    </Link>
                </div>
                </Header>
                <Layout>
                <Sider width={200} className="site-layout-background" trigger={null} collapsible collapsed={openSideBar}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <Menu.Item key="1"  icon={<BulbOutlined />}>
                        <Link to="/">
                            Ponto
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2"  icon={<ClockCircleOutlined />}>
                        <Link to="/consultadehoras">
                            Consulta de horas
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3"  icon={<UserOutlined />}>
                        <Link to="/profile">
                            Perfil
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4"  icon={<CarryOutOutlined />}>
                        <Link to="/alteracaodehoras">
                            Adicionar/Remover horas
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5"  icon={<LockOutlined />}>
                        <Link to="/admin/login">
                            Administração
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="Exemplo com subtopicos">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                    id="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    { children }
                    </Content>
                </Layout>
                </Layout>
        </Layout>
        </SidebarMenuContainer>
    );
};

export default SidebarMenu;