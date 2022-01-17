import React from 'react';
import { Button } from 'theme-ui';
import AdministrationAsidePanel from './AdministrationAsidePanel';

export interface IAdministrationButtons {
  onCreate?: () => void;
  onModify?: () => void;
  onDelete?: () => void;
  onClone?: () => void;
  onDependencies?: () => void;
  onClose?: () => void;
}

const AdministrationButtons = React.memo(
  ({
    onCreate,
    onModify,
    onDelete,
    onClone,
    onDependencies,
    onClose,
  }: IAdministrationButtons) => {
    const config = window.specificAdminData.panels.adminButtons;
    const { buttons } = config;

    const definedButtons = React.useMemo(
      () => ({
        create: buttons.create !== undefined && {
          ...buttons.create,
          onClick: onCreate,
        },
        modify: buttons.modify !== undefined && {
          ...buttons.modify,
          onClick: onModify,
        },
        delete: buttons.delete !== undefined && {
          ...buttons.delete,
          onClick: onDelete,
        },
        clone: buttons.clone !== undefined && {
          ...buttons.clone,
          onClick: onClone,
        },
        dependencies: buttons.dependencies !== undefined && {
          ...buttons.dependencies,
          onClick: onDependencies,
        },
        close: buttons.close !== undefined && {
          ...buttons.close,
          onClick: onClose,
        },
      }),
      [
        buttons.clone,
        buttons.close,
        buttons.create,
        buttons.delete,
        buttons.dependencies,
        buttons.modify,
        onClone,
        onClose,
        onCreate,
        onDelete,
        onDependencies,
        onModify,
      ],
    );

    return (
      <AdministrationAsidePanel>
        {Object.values(definedButtons).map((button) => {
          return button ? (
            <Button
              key={button.label}
              title={button.toolTip}
              type="button"
              variant={button.className === 'suggested' ? 'primary' : 'outline'}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ) : null;
        })}
      </AdministrationAsidePanel>
    );
  },
);

AdministrationButtons.displayName = 'Administration buttons';

export default AdministrationButtons;
