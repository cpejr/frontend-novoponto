import styled from "styled-components";

const SidebarMenuContainer = styled.div`
  .ant-layout-header {
    padding: 0 30px;
    height: 95px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-top: -20px;
  }

  .logo > span svg {
    font-size: 25px;
    color: #ffffff;
    margin-right: 30px;
    transition: color 0.2s;
  }
`;

export { SidebarMenuContainer };
