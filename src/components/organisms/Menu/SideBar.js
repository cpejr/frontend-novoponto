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

const SideBar = ({ collapsed, ...props }) => {
  const location = useLocation();

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
        <MenuItem route="/" icon={<BulbOutlined />} label="Ponto" />
        <MenuItem
          route="/consultadehoras"
          icon={<ClockCircleOutlined />}
          label="Consulta de horas"
        />
        <MenuItem route="/profile" icon={<UserOutlined />} label="Perfil" />
        <MenuItem
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
          <MenuItem route="/acompanhamentodehoras" label="Acomp. de horas" />
          <MenuItem
            disabled={!access || access === 0}
            route="/atualizarnoticias"
            label="Atualizar Notícias"
          />
          <MenuItem
            disabled={!access || access === 0}
            route="/horarioobrigatorio"
            label="Horário Obrigatório"
          />
          <MenuItem
            disabled={!access || access === 0}
            route="/membros"
            label="Membros"
          />
          <MenuItem
            disabled={!access || access === 0}
            route="/cargos"
            label="Cargos"
          />
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
