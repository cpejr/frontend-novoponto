import styled from 'styled-components';

const SidebarMenuContainer = styled.div`

    a, a:hover{
        text-decoration: none;
        color: #fff;
    }

    .ant-layout-header{
        padding: 0 40px;
    }

    .header, .ant-menu-dark{
        background: #000;
    }

    #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: #141414;
  }

  .logo{
      display: flex;
      align-items: center;
  }

  .logo > span svg{
      font-size: 30px;
      color: #fff;
      margin-right: 16px;
      transition: color 0.2s;
  }

  .logo > span svg:hover{
      color: #1890ff;
  }

  .ant-layout-sider ul{
    background: #1D1D1D;
  }

  .ant-layout-sider li{
      color: #fff;
  }

  li.ant-menu-item:hover{
      background-color: #1890ff;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
      background: #FFD100;
      font-weight: 600;
  }
  
  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
  
  #site-layout-background {
    background: #141414;
  }

`;


export { SidebarMenuContainer };

