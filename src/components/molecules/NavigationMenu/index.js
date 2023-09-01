import {
  BulbOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu as AntdMenu, Badge } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useContext } from "react";
import { useLocation } from "react-router";
import Lottie from "react-lottie";

import { SessionContext } from "../../../context/SessionProvider";
import newsLottie from "../../../assets/lotties/news-lottie.json";
import MenuItem from "./MenuItem";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const defaultOptions = {
  loop: true,
  autoPlay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Menuu = ({ collapsed, ...props }) => {
  const location = useLocation();

  const { data } = useContext(SessionContext);
  const { showUpdateCatalog, hasNewUpdate } = useContext(GlobalsContext);

  const access = data?.member?.role?.access;
  const showAdm = access && access > 0;

	return (
		<AntdMenu
			mode="inline"
			defaultSelectedKeys={[location.pathname]}
			theme="light"
			style={{ height: "100%", borderRight: 0 }}
			inlineCollapsed={collapsed}
			onSelect={({ key }) => {
				key === "novidades" && showUpdateCatalog();
			}}
		>
			<MenuItem key="/ponto" route="/ponto" icon={<BulbOutlined />} label="Ponto" />
			<MenuItem
				key="/ponto/profile"
				route="/ponto/profile"
				member={
					<Badge
						dot={!data?.member?.message?.read}
						style={{
							top: collapsed ? 11 : -2,
							right: collapsed ? 0 : -4,
						}}
					>
						<UserOutlined style={{ margin: 0 }} />
					</Badge>
				}
				label={data?.member?.name || "Perfil"}
				icon = {<UserOutlined/>}
			/>
			<MenuItem
				key="/ponto/consultadehoras"
				route="/ponto/consultadehoras"
				icon={<ClockCircleOutlined />}
				label="Consulta de horas"
			/>

      <MenuItem
        key="/ponto/alteracaodehoras"
        route="/ponto/alteracaodehoras"
        icon={<CarryOutOutlined />}
        label="Adicionar/Remover horas"
      />

      <SubMenu
        key="sub3"
        icon={<LockOutlined />}
        title="Administração"
        //style={{ display: showAdm ? "block" : "none" }}
      >
        <MenuItem
          key="/ponto/acompanhamento"
          route="/ponto/acompanhamento"
          label="Acompanhamento"
        />
        <MenuItem         
          key="/ponto/atualizarnoticias"
          route="/ponto/atualizarnoticias"
          label="Atualizar Notícias"
        />
        {/* <MenuItem
					disabled={!access || access === 0}
					key="/ponto/horarioobrigatorio"
					route="/ponto/horarioobrigatorio"
					label="Horário Obrigatório"
				/> */}
				<MenuItem
					disabled={!access || access === 0}
					key="/ponto/membros"
					route="/ponto/membros"
					label="Membros"
				/>
				<MenuItem
					disabled={!access || access === 0}
					key="/ponto/cargos"
					route="/ponto/cargos"
					label="Cargos"
				/>
        <MenuItem
          disabled={!access || access === 0}
				  key="/ponto/departamentos"
				  route="/ponto/departamentos"
				  label="Departamentos"
			/>
				<MenuItem
					disabled={!access || access === 0}
					key="/ponto/tribos"
					route="/ponto/tribos"
					label="Tribos"
				/>
				<MenuItem
					disabled={!access || access === 0}
					key="/ponto/tarefas"
					route="/ponto/tarefas"
					label="Tarefas"
				/>
        <MenuItem
          disabled={!access || access === 0}
          key="/ponto/reconhecimentos"
          route="/ponto/reconhecimentos"
          label="Reconhecimentos"
        />
			</SubMenu>

      <MenuItem
        key="novidades"
        icon={
          hasNewUpdate ? (
            <span className="anticon">
              <Lottie
                options={{ ...defaultOptions, animationData: newsLottie }}
                height={24}
                width={15}
                style={{ lineHeight: 2.4, overflow: "unset" }}
              />
            </span>
          ) : (
            <InfoCircleOutlined />
          )
        }
        label="novidades"
        className="mt-auto"
      >
        Novidades
      </MenuItem>
    </AntdMenu>
  );
};

export default Menuu;
