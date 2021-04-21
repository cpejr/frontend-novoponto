import React from "react";
import Sider from "antd/lib/layout/Sider";
import NavigationMenu from "../../molecules/NavigationMenu";

const SideBar = ({ collapsed, ...props }) => {
  return (
    <Sider
      width={200}
      className="site-layout-background"
      trigger={null}
      collapsible
      collapsed={collapsed}
      {...props}
    >
      <NavigationMenu collapsed={collapsed} />
    </Sider>
  );
};

export default SideBar;
