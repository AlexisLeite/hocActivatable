/* eslint-disable no-var */
/* eslint-disable vars-on-top */

import { TApiaFilter } from '../../../types';

export type TAdminColumn = {
  name: string;
  label: string;
  toolTip: string;
  dataSortBy: string;
  sort: string;
  width: number;
};

export interface IApiaGlobalAdminData {
  // Options
  buttonDownloadText: string;
  buttonDownloadTooltip: string;

  buttonUploadText: string;
  buttonUploadTooltip: string;

  optionsTitle: string;
  optionsTooltip: string;

  // Additional filters
  additionalFiltersTitle: string;
  additionalFiltersTooltip: string;

  // Common filters
  filtersTitle: string;
  filtersTooltip: string;
}

export interface IApiaAdminActionsButton {
  className?: string;
  toolTip: string;
  label: string;
}

export interface IApiaSpecificAdminData {
  image: string;

  // Labels
  component: string;
  title: string;
  description: string;

  // Tooltips

  // Global vars in jsp
  ajaxUrl: string;
  additionalInfoInTable: boolean;

  // Columns
  columns: TAdminColumn[];
  filters: TApiaFilter[];

  panels: Record<
    string,
    {
      title: string;
      toolTip: string;
      buttons: Record<string, IApiaAdminActionsButton | undefined>;
    }
  >;
}

declare global {
  var CONTEXT: string;
  var globalAdminData: IApiaGlobalAdminData;
  var specificAdminData: IApiaSpecificAdminData;
}
