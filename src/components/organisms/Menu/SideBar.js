import React, { useContext } from "react";
import {
  BulbOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { useLocation } from "react-router";

import { SessionContext } from "../../../context/SessionProvider";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const SideBar = ({ collapsed, ...props }) => {
  const location = useLocation();
  console.log(location);
  const { data } = useContext(SessionContext);

  const access = data?.member?.role?.access;
  const showAdm = access && access > 0;

  return (
    <Sider
      width={200}
      className="site-layout-background"
      trigger={null}
      collapsible
      collapsed={collapsed}
      {...props}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        theme="light"
        style={{ height: "100%", borderRight: 0 }}
        inlineCollapsed={collapsed}
      >
        <MenuItem key="/" route="/" icon={<BulbOutlined />} label="Ponto" />
        <MenuItem
          key="/consultadehoras"
          route="/consultadehoras"
          icon={<ClockCircleOutlined />}
          label="Consulta de horas"
        />
        <MenuItem
          key="/profile"
          route="/profile"
          icon={<UserOutlined />}
          label="Perfil"
        />
        <MenuItem
          key="/alteracaodehoras"
          route="/alteracaodehoras"
          icon={<CarryOutOutlined />}
          label="Adicionar/Remover horas"
        />

        <SubMenu
          key="sub3"
          icon={<LockOutlined />}
          title="Administração"
          style={{ display: showAdm ? "block" : "none" }}
        >
          <MenuItem
            key="/acompanhamentodehoras"
            route="/acompanhamentodehoras"
            label="Acomp. de horas"
          />
          <MenuItem
            disabled={!access || access === 0}
            key="/atualizarnoticias"
            route="/atualizarnoticias"
            label="Atualizar Notícias"
          />
          <MenuItem
            disabled={!access || access === 0}
            key="/horarioobrigatorio"
            route="/horarioobrigatorio"
            label="Horário Obrigatório"
          />
          <MenuItem
            disabled={!access || access === 0}
            key="/membros"
            route="/membros"
            label="Membros"
          />
          <MenuItem
            disabled={!access || access === 0}
            key="/cargos"
            route="/cargos"
            label="Cargos"
          />
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
