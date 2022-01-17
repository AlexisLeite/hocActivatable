import React, { ReactElement } from "react";

interface Props {}

var groupTypeFilterOptions = JSON.parse(`[{}



              ,{
                "value":"1",
                "selected": false,
                "label": "Autogenerado"
              }


              ,{
                "value":"0",
                "selected": true,
                "label": "Normal"
              }

      ]`);

var globalAdminData = {
  // Options
  buttonDownloadText: "Descargar",
  buttonDownloadTooltip: "-: TOOLTIP :- Descargar",

  buttonUploadText: "Upload",
  buttonUploadTooltip: "-: TOOLTIP :- Upload",

  optionsTitle: "Opciones",
  optionsTooltip: "-: TOOLTIP :- Opciones",

  // Additional filters
  additionalFiltersTitle: "Filtros adicionales",
  additionalFiltersTooltip:
    "-: TOOLTIP :- Filtros adicionales que pueden aplicarse",

  // Common filters
  filtersTitle: "Filtros",
  filtersTooltip: "-: TOOLTIP :- Filtros que pueden aplicarse",
};

var specificAdminData = {
  image: "images/uploaded/fncGrupos.gif",

  // Labels}
  component: "Groups",
  title: "Grupos",
  description:
    '<div id="fncDescriptionText">Esta funcionalidad permite administrar los grupos del sistema.</div>',

  // Tooltips

  // Global vars in jsp
  ajaxUrl: "/apia.administration.GroupsAction.run",
  additionalInfoInTable: true,

  // Columns
  columns: [
    {
      name: "Nombre",
      label: "Nombre",
      toolTip: "-: TOOLTIP :- Nombre",
      dataSortBy: "0",
      sort: "Up",
      width: 10,
    },
    {
      name: "Descripci&#243;n",
      label: "Descripci&#243;n",
      toolTip: "-: TOOLTIP :- Descripci&#243;n",
      dataSortBy: "1",
      sort: "",
      width: 20,
    },
    {
      name: "Usuario",
      label: "Usuario",
      toolTip: "-: TOOLTIP :- Usuario de la &#250;ltima actualizaci&#243;n",
      dataSortBy: "2",
      sort: "",
      width: 10,
    },
    {
      name: "Fecha",
      label: "Fecha",
      toolTip: "-: TOOLTIP :- Fecha de la &#250;ltima actualizaci&#243;n",
      dataSortBy: "3",
      sort: "",
      width: 10,
    },
  ],

  // Filters
  filters: [
    {
      column: "Nombre",
      id: "nameFilter",
      toolTip: "-: TOOLTIP :- Nombre",
      title: "Nombre",
      requestName: "txtName",
      currentValue: "",
    },
    {
      column: "Descripci&#243;n",
      id: "descFilter",
      toolTip: "-: TOOLTIP :- Descripci&#243;n",
      title: "Descripci&#243;n",
      requestName: "txtDesc",
      currentValue: "",
    },
    {
      column: "Usuario",
      id: "regUsrFilter",
      toolTip: "-: TOOLTIP :- Usuario de la &#250;ltima actualizaci&#243;n",
      title: "Usuario",
      requestName: "txtRegUser",
      currentValue: "",
    },
    {
      column: "Fecha",
      id: "regDateFilter",
      toolTip: "-: TOOLTIP :- Fecha de la &#250;ltima actualizaci&#243;n",
      title: "Fecha",
      requestName: "txtRegDate",
      currentValue: "",
      type: "date",
    },

    // Additional filters, those which doesn't have a corresponding column
    {
      id: "groupTypeFilter",
      title: "Tipo:",
      requestName: "selTip",
      currentValue: "",
      options: groupTypeFilterOptions,
    },
  ],

  panels: {
    adminButtons: {
      title: "Acciones",
      toolTip: "-: TOOLTIP :- Acciones que pueden ser realizadas",
      buttons: {
        create: {
          className: "suggested",
          toolTip: "-: TOOLTIP :- Crear",
          label: "Crear",
        },
        modify: {
          toolTip: "-: TOOLTIP :- Modificar",
          label: "Modificar",
        },
        delete: {
          toolTip: "-: TOOLTIP :- Eliminar",
          label: "Eliminar",
        },
        clone: {
          toolTip: "-: TOOLTIP :- Clonar",
          label: "Clonar",
        },
        dependencies: {
          toolTip: "-: TOOLTIP :- Dependencias",
          label: "Dependencias",
        },
        close: {
          toolTip: "-: TOOLTIP :- Cerrar",
          label: "Cerrar",
        },
      },
    },
    options: {
      title: "Opciones",
      toolTip: "-: TOOLTIP :- Opciones",
      buttons: {
        download: {
          label: "Descargar",
          toolTip: "-: TOOLTIP :- Descargar",
        },
        upload: {
          label: "Upload",
          toolTip: "-: TOOLTIP :- Upload",
        },
      },
    },
  },
};

export default function AdminPage({}: Props): ReactElement {
  return <div></div>;
}
