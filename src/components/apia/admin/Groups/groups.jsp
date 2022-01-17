<%@include file="../../includes/startInc.jsp" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <%@include file="../../includes/headInclude.jsp" %>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Groups</title>
    <script>
      var groupTypeFilterOptions = JSON.parse(`[{}
        <system:util show="prepareTypePool" saveOn="types" />
          <system:edit show="iteration" from="types" saveOn="type_save">
            <system:edit show="saveValue" from="type_save" field="type" saveOn="type" />
              ,{
                "value":"<system:edit show='value' from='type_save' field='type'/>",
                "selected": <system:edit show='ifValue' from='type_save' field='selected' value='true'>true</system:edit><system:edit show='ifValue' from='type_save' field='selected' value='false'>false</system:edit>,
                "label": "<system:edit show='value' from='type_save' field='typeName'/>"
              }
        </system:edit>
      ]`);

      var globalAdminData = {
        // Options
        buttonDownloadText: '<system:label show="text" label="btnDow" />',
        buttonDownloadTooltip: '<system:label show="tooltip" label="btnDow" />',

        buttonUploadText: '<system:label show="text" label="btnUpl" />',
        buttonUploadTooltip: '<system:label show="tooltip" label="btnUpl" />',

        optionsTitle: '<system:label show="text" label="mnuOpc" />',
        optionsTooltip: '<system:label show="tooltip" label="mnuOpc" />',

        // Additional filters
        additionalFiltersTitle:
          '<system:label show="text" label="titAdmAdtFilter"/>',
        additionalFiltersTooltip:
          '<system:label show="tooltip" label="titAdmAdtFilter"/>',

        // Common filters
        filtersTitle: 'Filtros',
        filtersTooltip: '-: TOOLTIP :- Filtros que pueden aplicarse',
      };

      var specificAdminData = {
        image: '<system:edit show="value" from="theBean" field="fncImage"/>',

        // Labels
        component: 'Groups',
        title:
          '<system:edit show="ifValue" from="theBean" field="modeGlobal" value="true"><system:label show="text" label="mnuGru" /></system:edit><system:edit show="ifValue" from="theBean" field="modeGlobal" value="false"><system:label show="text" label="mnuAmbGro" /></system:edit>',
        description:
          '<system:edit show="ifValue" from="theBean" field="modeGlobal" value="true"><div id="fncDescriptionText"><system:label show="text" label="dscFncGroups"/></div></system:edit><system:edit show="ifValue" from="theBean" field="modeGlobal" value="false"><div id="fncDescriptionText"><system:label show="text" label="dscFncEnvGroups"/></div></system:edit>',

        // Tooltips

        // Global vars in jsp
        ajaxUrl: '/apia.administration.GroupsAction.run',
        additionalInfoInTable: true,

        // Columns
        columns: [
          {
            name: '<system:label show="text" label="lblNom"/>',
            label: '<system:label show="text" label="lblNom"/>',
            toolTip: '<system:label show="tooltip" label="lblNom" />',
            dataSortBy:
              '<system:edit show="constant" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_NAME"/>',
            sort: '<system:filter show="sortStyle" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_NAME"/>',
            width: 10,
          },
          {
            name: '<system:label show="text" label="lblDesc"/>',
            label: '<system:label show="text" label="lblDesc"/>',
            toolTip: '<system:label show="tooltip" label="lblDesc" />',
            dataSortBy:
              '<system:edit show="constant" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_DESC"/>',
            sort: '<system:filter show="sortStyle" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_DESC"/>',
            width: 20,
          },
          {
            name: '<system:label show="text" label="lblLastUsrName"/>',
            label: '<system:label show="text" label="lblLastUsrName"/>',
            toolTip: '<system:label show="tooltip" label="lblLastUsrName" />',
            dataSortBy:
              '<system:edit show="constant" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_USER"/>',
            sort: '<system:filter show="sortStyle" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_USER"/>',
            width: 10,
          },
          {
            name: '<system:label show="text" label="lblLastActDate"/>',
            label: '<system:label show="text" label="lblLastActDate"/>',
            toolTip: '<system:label show="tooltip" label="lblLastActDate" />',
            dataSortBy:
              '<system:edit show="constant" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_DATE"/>',
            sort: '<system:filter show="sortStyle" from="com.dogma.vo.filter.PoolFilterVo" field="ORDER_DATE"/>',
            width: 10,
          },
        ],

        // Filters
        filters: [
          {
            column: '<system:label show="text" label="lblNom"/>',
            id: 'nameFilter',
            toolTip: '<system:label show="tooltip" label="lblNom" />',
            title: '<system:label show="text" label="lblNom"/>',
            requestName: 'txtName',
            currentValue:
              '<system:filter show="value" filter="0"></system:filter>',
          },
          {
            column: '<system:label show="text" label="lblDesc"/>',
            id: 'descFilter',
            toolTip: '<system:label show="tooltip" label="lblDesc" />',
            title: '<system:label show="text" label="lblDesc" />',
            requestName: 'txtDesc',
            currentValue:
              '<system:filter show="value" filter="1"></system:filter>',
          },
          {
            column: '<system:label show="text" label="lblLastUsrName"/>',
            id: 'regUsrFilter',
            toolTip: '<system:label show="tooltip" label="lblLastUsrName" />',
            title: '<system:label show="text" label="lblLastUsrName" />',
            requestName: 'txtRegUser',
            currentValue:
              '<system:filter show="value" filter="2"></system:filter>',
          },
          {
            column: '<system:label show="text" label="lblLastActDate"/>',
            id: 'regDateFilter',
            toolTip: '<system:label show="tooltip" label="lblLastActDate" />',
            title: '<system:label show="text" label="lblLastActDate" />',
            requestName: 'txtRegDate',
            currentValue:
              '<system:filter show="value" filter="3"></system:filter>',
            type: 'date',
          },

          // Additional filters, those which doesn't have a corresponding column
          {
            id: 'groupTypeFilter',
            title: '<system:label show="text" label="lblTipDat" />:',
            requestName: 'selTip',
            currentValue: '',
            options: groupTypeFilterOptions,
          },
        ],

        panels: {
          adminButtons: {
            title: '<system:label show="text" label="titActions" />',
            toolTip: '<system:label show="tooltip" label="titActions" />',
            buttons: {
              create: {
                className: 'suggested',
                toolTip: '<system:label show="tooltip" label="btnCre" />',
                label: '<system:label show="text" label="btnCre" />',
              },
              modify: {
                toolTip: '<system:label show="tooltip" label="btnMod" />',
                label: '<system:label show="text" label="btnMod" />',
              },
              delete: {
                toolTip: '<system:label show="tooltip" label="btnEli" />',
                label: '<system:label show="text" label="btnEli" />',
              },
              clone: {
                toolTip: '<system:label show="tooltip" label="btnClo" />',
                label: '<system:label show="text" label="btnClo" />',
              },
              dependencies: {
                toolTip: '<system:label show="tooltip" label="btnDep" />',
                label: '<system:label show="text" label="btnDep" />',
              },
              close: {
                toolTip: '<system:label show="tooltip" label="btnClose" />',
                label: '<system:label show="text" label="btnClose" />',
              },
            },
          },
          options: {
            title: '<system:label show="text" label="mnuOpc" />',
            toolTip: '<system:label show="tooltip" label="mnuOpc" />',
            buttons: {
              download: {
                label: '<system:label show="text" label="btnDow" />',
                toolTip: '<system:label show="tooltip" label="btnDow" />',
              },
              upload: {
                label: '<system:label show="text" label="btnUpl" />',
                toolTip: '<system:label show="tooltip" label="btnUpl" />',
              },
            },
          },
        },
      };
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
