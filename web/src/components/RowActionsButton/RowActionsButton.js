import React, { useState } from 'react';
import i18n from 'i18next';
import Proptypes from 'prop-types';

// Icons
import { FaEdit, FaEllipsisH, FaEllipsisV, FaTrashAlt } from 'react-icons/fa';

// External components
import { Button, Dropdown, Menu, Space } from 'antd';

// RowActionMenu styles
import './RowActionsButton.scss';

export default function RowActionButton({ onClickEdit, onClickRemove }) {
  // States
  const [visible, setVisible] = useState(false);

  const actions = [
    {
      key: 'Editar',
      icon: <FaEdit size={18} />,
      label: i18n.t('Editar'),
      className: 'menu-item-edit',
      visible: true,
      action: handleEdit,
    },
    {
      key: 'Remover',
      icon: <FaTrashAlt size={16} />,
      label: i18n.t('Remover'),
      className: 'menu-item-remove',
      visible: true,
      action: handleRemove,
    },
  ];

  function handleEdit() {
    if (onClickEdit) {
      onClickEdit();
    }
    handleMenuToggle(false);
  }

  function handleRemove() {
    if (onClickRemove) {
      onClickRemove();
    }
    handleMenuToggle(false);
  }

  function handleMenuToggle(status) {
    setVisible(status);
  }

  function renderMenuItem(action) {
    const { key, className, icon, label, action: actionOnClick } = action;

    return (
      <Menu.Item key={key} className={className} onClick={actionOnClick}>
        <Space size={13}>
          {icon}
          {label}
        </Space>
      </Menu.Item>
    );
  }

  function renderRowActionMenu() {
    return (
      <Menu className="row-action-menu">{actions.map(renderMenuItem)}</Menu>
    );
  }

  return (
    <div className="row-action-button-wrapper">
      <Dropdown
        className="row-action-button"
        overlay={renderRowActionMenu()}
        trigger={['click']}
        placement="bottomRight"
        visible={visible}
        onVisibleChange={handleMenuToggle}
      >
        <Button type="text">
          {visible ? <FaEllipsisH /> : <FaEllipsisV />}
        </Button>
      </Dropdown>
    </div>
  );
}

RowActionButton.propTypes = {
  onClickEdit: Proptypes.func,
  onClickRemove: Proptypes.func,
};

RowActionButton.defaultProps = {
  onClickEdit: null,
  onClickRemove: null,
};
