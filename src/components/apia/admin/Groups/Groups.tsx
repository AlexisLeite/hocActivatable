import React from "react";
import { Button } from "theme-ui";
import AdministrationPage from "../AdministrationPage";
import AdministrationAsidePanel from "../AdministrationAsidePanel";
import ApiaApi from "../../../../utils/apiaApi";
import { TApiaResponseLoadWithFunction } from "../../../../types";
import Config from "../../../config";

export type TApiaFilterValue = string | number;

export type TApiaFilterOption = {
  label: string;
  value: TApiaFilterValue;
};

export type TApiaFilter = {
  // Information
  id: string | number;
  column?: string;
  title?: string;
  placeholder?: string;
  toolTip?: string;
  currentValue: TApiaFilterValue;

  // If it has options, it will be a select
  options?: TApiaFilterOption[];

  // There it could be more types in the future, if no type then it is an input
  type?: "date";
};

const Groups = () => {
  const { options } = window.specificAdminData.panels;

  return (
    <AdministrationPage
      description={window.specificAdminData.description}
      title={window.specificAdminData.title}
      columns={window.specificAdminData.columns}
      filters={window.specificAdminData.filters}
      additionalPanels={
        <AdministrationAsidePanel
          title={options.title}
          titleToolTip={options.toolTip}
        >
          <Button
            variant="outline"
            title={options.buttons.download?.toolTip}
            onClick={async () => {
              const result = await ApiaApi.post<TApiaResponseLoadWithFunction>(
                Config.ADMIN_DOWNLOAD_CREATE_FILE
              ).catch(() => {});

              if (
                result &&
                result.data &&
                result.data.function.name === "downloadFile"
              ) {
                await ApiaApi.get(Config.ADMIN_DOWNLOAD_FILE).catch(() => {});
              }
            }}
          >
            {options.buttons.download?.label}
          </Button>
          <Button variant="outline" title={options.buttons.upload?.toolTip}>
            {options.buttons.upload?.label}
          </Button>
        </AdministrationAsidePanel>
      }
    />
  );
};

export default Groups;
