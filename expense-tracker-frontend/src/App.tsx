import React, { useState } from 'react';
import { DashboardOutlined , DatabaseTwoTone } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';


const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuItemClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem.key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <Dashboard />;
      case '2':
        return <Expenses />;
      default:
        return null;
    }
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuItemClick}
          defaultSelectedKeys={['1']}
          items={
            [
              {
                key: '1',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: '2',
                icon: <DatabaseTwoTone />,
                label: 'Expenses',
              },
           ]
          }
        />
        
      </Sider>
      <Layout>
        <Header style={{ padding: 0,margin:0, fontSize:25, background: colorBgContainer, textAlign: "center" }} >Expense Tracker</Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: '90vh', background: colorBgContainer }}>{ renderContent()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>@Malish</Footer>
      </Layout>
    </Layout>
  );
};

export default App;