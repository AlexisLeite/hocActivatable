import { FaWindowClose } from "@meronex/icons/fa";
import React, { ReactElement } from "react";
import { Button } from "theme-ui";
import SimpleButton from "../../src/components/common/SimpleButton";
import useBoolean from "../../src/hooks/useBoolean";
import { useModal } from "react-modal-hook";
import Modal from "../../src/components/common/dialogs/Modal";
import ApiaApi from "../../src/utils/apiaApi";
import Config from "../../src/config/dev";
import { TApiaFunction, TApiaLoad } from "../../src/types copy";
import { arrayOrArray } from "../../src/utils/utils";

export interface IEnvironmentDefinition {
  text: string;
  id: string;
}

export interface IEnvironmentsFilters {
  txtName: string;
  txtTitle: string;
  txtDesc: string;
  selectOnlyOne: boolean;
  txtAdtSql: string;
}

interface IEnvironmentsSelector {
  onChange: (ev: IEnvironmentDefinition[]) => void;
  onBlur: () => void;
  value?: IEnvironmentDefinition[];
  name: string;
  fetcher: (
    props: IEnvironmentsFilters
  ) => Promise<IEnvironmentDefinition[] | null>;
}

const environmentsLabel = "Ambientes";
const addEnvironmentLabel = "Agregar ambiente";

const EnvironmentsSelector = React.forwardRef(
  (props: IEnvironmentsSelector, ref): ReactElement => {
    const [loading, onLoading, offLoading] = useBoolean();
    const [filters, setFilters] = React.useState({
      txtName: "",
      txtTitle: "",
      txtDesc: "",
      selectOnlyOne: false,
      txtAdtSql: "",
    });

    const fetchEnvironments = React.useCallback(async () => {
      const result = await ApiaApi.post<TApiaLoad<TApiaFunction>>(
        Config.ADMIN_ON_ADD_ENVIRONMENT,
        filters
      );

      if (result && result.data) {
        const pageInfo = result.data.function.messages.result.pageInfo;
        const table = result.data.function.messages.result.table;
        table.row = arrayOrArray(table.row);
      }
    }, []);

    let showModal: () => void, hideModal: () => void;
    const modal = React.useCallback(
      ({ in: open, onExited }: { in: unknown; onExited: unknown }) => {
        <Modal
          open={open as boolean}
          onExited={onExited as () => void}
          id="EnvironmentsModal"
          onClose={hideModal}
          title={environmentsLabel}
        ></Modal>;
      },
      []
    );
    [showModal, hideModal] = useModal(modal as any);

    useModal;

    return (
      <div>
        <h3>{environmentsLabel}</h3>
        <ul className="environments">
          {props.value?.map((environment) => {
            return (
              <li key={environment.id}>
                <Button
                  aria-label={`Remove environment "${environment}"`}
                  type="button"
                  variant="outline"
                >
                  {environment.text}
                  <FaWindowClose />
                </Button>
              </li>
            );
          })}
        </ul>
        <SimpleButton
          isLoading={loading}
          ref={ref as React.Ref<HTMLButtonElement>}
          variant="primary"
          title={addEnvironmentLabel}
          onClick={async () => {
            onLoading();
            await fetchEnvironments();
            showModal();
          }}
        >
          {addEnvironmentLabel}
        </SimpleButton>
      </div>
    );
  }
);

export default EnvironmentsSelector;
