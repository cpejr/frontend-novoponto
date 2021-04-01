import styled from "styled-components";

const SidebarMenuContainer = styled.div`
  a,
  a:hover {
    text-decoration: none;
    color: #fff;
  }

  .ant-layout-header {
    padding: 0 40px;
  }

  .header,
  .ant-menu-dark {
    background: #000;
  }

  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: #141414;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo > span svg {
    font-size: 30px;
    color: #fff;
    margin-right: 16px;
    transition: color 0.2s;
  }

  .logo > span svg:hover {
    color: #1890ff;
  }

  .ant-menu,
  .ant-menu-light {
    background: #1d1d1d;
    color: #fff;
  }

  #site-layout-background,
  .ant-layout-sider {
    background: #141414;
  }

  .ant-menu-submenu-arrow,
  .ant-menu-item:not(.ant-menu-item-selected) {
    color: #fff;
  }

  .ant-menu-submenu:hover > .ant-menu-submenu-title > .anticon,
  .ant-menu-submenu:hover
    > .ant-menu-submenu-title
    > .ant-menu-submenu-expand-icon,
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
  .ant-menu-submenu-selected
    > .ant-menu-submenu-title
    > .ant-menu-submenu-arrow,
  .ant-menu-submenu-selected,
  .ant-menu-item-selected,
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    color: #ffd100;
  }

  li.ant-menu-item:hover,
  .ant-menu-item:active,
  .ant-menu-submenu-title:active,
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #ffffff20;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    font-weight: 600;
  }

  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  .ant-menu-vertical .ant-menu-item::after,
  .ant-menu-inline .ant-menu-item::after {
    border-color: #ffd100;
  }
`;

export { SidebarMenuContainer };
