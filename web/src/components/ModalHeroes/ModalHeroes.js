import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

// Ant Design Components
import { Modal, Form, Row, Col, Input, Select, Button, Space } from 'antd';

import './ModalHeroes.scss';

function ModalHeroes({ visible, onSubmit, onCancel, hero }) {
  // States
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      return;
    }

    setInitialFields(hero);
  }, [visible]);

  const classesHeroes = [
    { label: 'Classe S', value: 'classe_s', key: 1 },
    { label: 'Classe A', value: 'classe_a', key: 2 },
    { label: 'Classe B', value: 'classe_b', key: 3 },
    { label: 'Classe C', value: 'classe_c', key: 4 },
  ];

  function onFinish() {
    const { _id } = hero;
    const fields = form.getFieldsValue();

    if (_id) {
      onSubmit({ ...fields, _id });
    } else {
      onSubmit(fields);
    }
  }

  function setInitialFields(heroParam) {
    const { name, rank } = heroParam;
    form.setFieldsValue({
      name,
      rank,
    });
  }

  function getTitle() {
    const { _id } = hero;

    if (_id) {
      return i18n.t('Editar herói');
    }

    return i18n.t('Adicionar herói');
  }

  return (
    <div className="modal-heroes">
      <Modal title={getTitle()} visible={visible} onCancel={onCancel} footer>
        <Form
          className="login-form"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Row align="top">
            <Col span={24}>
              <Form.Item
                name="name"
                label={i18n.t('Herói')}
                required
                rules={[
                  {
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
                name="rank"
                label={i18n.t('Rank')}
                required
                rules={[
                  { required: true, message: i18n.t('Rank é obrigatório') },
                ]}
              >
                <Select>
                  {classesHeroes.map((classe) => (
                    <Select.Option key={classe.key} value={classe.value}>
                      {classe.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Button
                className="download-button uppercase"
                htmlType="submit"
                type="primary"
              >
                <Space size={12} align="center">
                  <span>{i18n.t('Salvar')}</span>
                </Space>
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

ModalHeroes.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  hero: PropTypes.shape({
    _id: PropTypes.string,
    rank: PropTypes.string,
    name: PropTypes.string,
  }),
};

ModalHeroes.defaultProps = {
  visible: false,
  hero: {},
};

export default ModalHeroes;
