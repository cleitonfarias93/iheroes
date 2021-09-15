import React from 'react';
import i18n from 'i18next';
import { useHistory } from 'react-router-dom';

// Services
import { postLogin } from 'services/Login';

// Hooks
import useAuth from 'hooks/useAuth';

// Ant Design Components
import { Card, Form, Input, Row, Col, Button, message } from 'antd';

// Icons
import { FiUser } from 'react-icons/fi';
import { AiOutlineLock } from 'react-icons/ai';

// Style
import './Login.scss';

function Login() {
  const history = useHistory();

  // States
  const [form] = Form.useForm();
  const { setAuth } = useAuth();

  async function handleSubmit() {
    const fields = form.getFieldsValue();

    try {
      const { data } = await postLogin(fields);
      setAuth(data);
      history.push('/heroes');
    } catch (error) {
      message.error(i18n.t('Não foi possível efetuar o login'));
    }
  }

  function navigateToSignup() {
    history.push('/signup');
  }

  function getTitle() {
    return (
      <div className="title-card">
        <span>i</span>
        <span>Heros</span>
      </div>
    );
  }

  return (
    <Form
      className="login-form"
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
    >
      <Card title={getTitle()}>
        <Row gutter={16} align="top">
          <Col span={24}>
            <Form.Item
              name="email"
              label={i18n.t('Email')}
              required
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: i18n.t('Email é obrigatório'),
                },
              ]}
            >
              <Input autoFocus prefix={<FiUser size={16} color="#9a9a9a" />} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="password"
              label={i18n.t('Senha')}
              required
              rules={[
                { required: true, message: i18n.t('Senha é obrigatório') },
              ]}
            >
              <Input.Password
                prefix={<AiOutlineLock size={16} color="#9a9a9a" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          className="submit-button uppercase"
          htmlType="submit"
          type="primary"
        >
          {i18n.t('Entrar')}
        </Button>

        <div className="sign-up">
          <span>Não tem uma conta? </span>
          <Button type="link" onClick={navigateToSignup}>
            Cadastre-se aqui
          </Button>
        </div>
      </Card>
    </Form>
  );
}

export default Login;
