import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

// Services
import { postHero, getHeroes, deleteHero, putHero } from 'services/Heroes';

// Ant Design Components
import { Table, Button, Row, Col, message, Spin, Modal } from 'antd';

// Components
import ModalHeroes from 'components/ModalHeroes';
import RowActionsButton from 'components/RowActionsButton';

// Icons
import { IoPersonAddSharp } from 'react-icons/io5';

// Style
import './Heroes.scss';

function Heroes() {
  // States
  const [heroes, setHeroes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [heroCurrent, setHeroCurrent] = useState({});

  // Asynchronous functions
  async function fetchHerois() {
    setIsFetching(true);

    try {
      const { data } = await getHeroes();
      setHeroes(data);
    } catch (error) {
      message.error(i18n.t('Erro ao cadastrar herói'));
    } finally {
      setIsFetching(false);
    }
  }

  async function handleOk(fields) {
    setIsModalVisible(false);
    setLoading(true);

    const { _id } = fields;

    try {
      if (_id) {
        await putHero(_id, fields);
        message.success(i18n.t('Herói atualizado com sucesso'));
      } else {
        await postHero(fields);
        message.success(i18n.t('Herói cadastrado com sucesso'));
      }
      fetchHerois();
    } catch (error) {
      message.error(i18n.t('Erro ao cadastrar herói'));
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(hero) {
    setLoading(true);
    const { _id } = hero;

    try {
      await deleteHero(_id);
      message.success(i18n.t('Herói deletado com sucesso'));
      fetchHerois();
    } catch (error) {
      message.error(i18n.t('Erro ao deletar herói'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHerois();
  }, []);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (value) => <span>{heroesEnum[value]}</span>,
    },
    {
      title: i18n.t('Ações'),
      width: 90,
      fixed: 'right',
      render: (data, row) => (
        <RowActionsButton
          onClickRemove={() => showModalRemove(row)}
          onClickEdit={() => showModalEdit(row)}
        />
      ),
    },
  ];

  const heroesEnum = {
    classe_s: i18n.t('Classe S'),
    classe_a: i18n.t('Classe A'),
    classe_b: i18n.t('Classe B'),
    classe_c: i18n.t('Classe C'),
  };

  function handleCancel() {
    setIsModalVisible(false);
  }

  function showModalCreate() {
    setHeroCurrent({});
    setIsModalVisible(true);
  }

  function showModalRemove(hero) {
    Modal.confirm({
      title: i18n.t('Deletar herói'),
      content: i18n.t(`Deseja deletar o herói ${hero.name}?`),
      okText: i18n.t('Sim'),
      okType: 'danger',
      cancelText: i18n.t('Não'),
      onOk() {
        handleRemove(hero);
      },
    });
  }

  function showModalEdit(hero) {
    setHeroCurrent(hero);
    setIsModalVisible(true);
  }

  return (
    <div className="heroes">
      <Spin spinning={loading || isFetching}>
        <Row className="row-btn-add" justify="end" gutter={16}>
          <Col>
            <Button
              type="primary"
              icon={<IoPersonAddSharp color="#000" size={26} />}
              onClick={showModalCreate}
            >
              {i18n.t('Adicionar Herói')}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={heroes} />
          </Col>
        </Row>

        <ModalHeroes
          visible={isModalVisible}
          onSubmit={handleOk}
          onCancel={handleCancel}
          hero={heroCurrent}
        />
      </Spin>
    </div>
  );
}

export default Heroes;
