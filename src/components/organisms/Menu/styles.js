import styled from "styled-components";

const SidebarMenuContainer = styled.div`
  .ant-layout-header {
    padding: 0 30px;
    height: 80px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-top: -20px;
  }

  .logo > span svg {
    font-size: 25px;
    color: #ffffff;
    transition: color 0.2s;
    margin-top: 17px;
  }
`;

export { SidebarMenuContainer };
