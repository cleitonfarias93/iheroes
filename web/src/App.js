import React from 'react';
import i18n from 'i18next';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

// Pages
import Heroes from 'pages/Heroes';

// Hooks
import useAuth from 'hooks/useAuth';

// Ant Design Components
import { Button, Layout, Menu, Modal } from 'antd';

// Icons
import { FiLogOut } from 'react-icons/fi';

// Styles
import './App.scss';

function App() {
  const history = useHistory();
  const location = useLocation();

  const { logout } = useAuth();

  function updateRoute(path) {
    history.push(path);
  }

  function showModalLogout() {
    Modal.confirm({
      title: i18n.t('Confirmar logout'),
      content: i18n.t('Deseja realmente finalizar sessão?'),
      okText: i18n.t('Sim'),
      cancelText: i18n.t('Cancelar'),
      onOk() {
        logout();
        history.push('/login');
      },
    });
  }

  function getPathname() {
    return location.pathname.replace(/\//g, '');
  }

  return (
    <Switch>
      <Layout className="App">
        <Layout.Sider className="side-bar">
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={[getPathname()]}
          >
            <Menu.Item key="heroes" onClick={() => updateRoute('/heroes')}>
              {i18n.t('Heróis')}
            </Menu.Item>
            <Menu.Item
              key="allocation-heroes"
              onClick={() => updateRoute('/heroes')}
            >
              {i18n.t('Alocação de Heróis')}
            </Menu.Item>
          </Menu>
          <Button
            className="btn-logout"
            onClick={showModalLogout}
            icon={<FiLogOut size={30} />}
            type="primary"
          >
            {i18n.t('Logout')}
          </Button>
        </Layout.Sider>
        <Route path="/heroes" component={Heroes} />
      </Layout>
    </Switch>
  );
}

export default App;
