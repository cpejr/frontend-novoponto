import styled from "styled-components";

const SidebarMenuContainer = styled.div`
  .ant-layout-header {
    padding: 0 30px;
    height: 70px;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-top: -10px;
  }
  .logo > span svg {
    font-size: 25px;
    color: #fff;
    margin-right: 16px;
    transition: color 0.2s;
  }
`;

export { SidebarMenuContainer };
