import {
  BulbOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu as AntdMenu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useContext } from "react";
import { useLocation } from "react-router";
import { SessionContext } from "../../../context/SessionProvider";
import MenuItem from "./MenuItem";

const Menuu = ({ collapsed, ...props }) => {
  const location = useLocation();

  const { data } = useContext(SessionContext);

  const access = data?.member?.role?.access;
  const showAdm = access && access > 0;

  return (
    <AntdMenu
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
          key="/acompanhamento"
          route="/acompanhamento"
          label="Acompanhamento"
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
    </AntdMenu>
  );
};

export default Menuu;
