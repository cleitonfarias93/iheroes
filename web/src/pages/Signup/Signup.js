import React from 'react';
import i18n from 'i18next';
import { useHistory } from 'react-router-dom';

// Services
import { postUsers } from 'services/Users';

// Ant Design Components
import { Card, Form, Input, Row, Col, Button, message } from 'antd';

// Style
import './Signup.scss';

function Signup() {
  const history = useHistory();

  // States
  const [form] = Form.useForm();

  async function handleSubmit() {
    const fields = form.getFieldsValue();

    try {
      await postUsers(fields);
      message.success(i18n.t('Cadastro realizado com sucesso'));
      history.push('/login');
    } catch (error) {
      if (error.response.status === 409) {
        message.error(i18n.t('Ops! Esse e-mail já está em uso'));
      } else {
        message.error(i18n.t('Erro ao tentar realizar cadastro'));
      }
    }
  }

  return (
    <Form
      className="signup-form"
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
    >
      <Card title={i18n.t('Cadastre-se')}>
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
              <Input autoFocus />
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
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <div className="container-buttons">
          <Button
            className="submit-button uppercase"
            htmlType="submit"
            type="primary"
          >
            {i18n.t('Salvar')}
          </Button>
          <Button
            className="cancel-button uppercase"
            onClick={() => history.push('login')}
            danger
            type="primary"
          >
            {i18n.t('Cancelar')}
          </Button>
        </div>
      </Card>
    </Form>
  );
}

export default Signup;
