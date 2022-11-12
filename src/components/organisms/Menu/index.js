import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { SessionContext } from "../../../context/SessionProvider";
import { useHistory } from "react-router-dom";

import Header from "./Header";
import SideBar from "./SideBar";
import { SidebarMenuContainer } from "./styles";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import Drawer from "./Drawer";

const SidebarMenu = ({ children }) => {
	const { data } = useContext(SessionContext);
	const history = useHistory();
	
	const { Content } = Layout;

	const { menuColapse, toggleMenu, isMobile } = useContext(GlobalsContext);

	const [drawerOpen, setDrawerOpen] = useState(false);

	function handleOnClickToggle() {
		if (!isMobile) toggleMenu();
		else setDrawerOpen(!drawerOpen);
	}

	return (
		<SidebarMenuContainer>
			{!data ? (history.push("/login")) : (
				<Layout>
					<Header
						onClickToggle={handleOnClickToggle}
						isSidebarColapsed={menuColapse}
						isMobile={isMobile}
					/>
					<Layout hasSider={true}>
						{isMobile && (
							<Drawer visible={drawerOpen} onClose={handleOnClickToggle} />
						)}
						{!isMobile && <SideBar collapsed={menuColapse} />}
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
			)}
		</SidebarMenuContainer>
	);
};

export default SidebarMenu;
