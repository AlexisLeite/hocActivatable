// mock api
const ROOT_URL = "http://localhost:3000";
const Config = {
  // Apia finder

  FINDER_FIRST_STRUCTURE_LOAD: `${ROOT_URL}/finder/firstStructureLoad?`,
  FINDER_REFRESH_DATA: `${ROOT_URL}/finder/refreshData?`,
  FINDER_SELECT_ROW: `${ROOT_URL}/finder/selectRow?`,
  FINDER_SELECT_ROW_GET_DATA: `${ROOT_URL}/finder/selectRowGetData?`,
  FINDER_GET_SORTED_STRUCTURE: `${ROOT_URL}/finder/getSortedStructure?`,
  FINDER_SEARCH_INIT: `${ROOT_URL}/finder/searchInit?`,
  FINDER_GET_FILTERS_CONDITIONS: `${ROOT_URL}/finder/getFiltersConditions?`,
  FINDER_FILTER_CONDITIONS_CHANGE: `${ROOT_URL}/finder/filterConditionsChange?`,
  FINDER_CHECK_MODAL_VALUE: `${ROOT_URL}/finder/checkModalValue?`,

  // Administration

  ADMIN_GET_PAGE: (pageNumber: number) =>
    `${ROOT_URL}/administration/groups/getPage?`,
  ADMIN_REFRESH_PAGE: `${ROOT_URL}/administration/groups/refreshPage?`,
  ADMIN_MORE_INFO: `${ROOT_URL}/administration/groups/moreInfo?`,
  ADMIN_FILTER: `${ROOT_URL}/administration/groups/filter?`,
  ADMIN_CREATE_EXCEL_FILE: `${ROOT_URL}/administration/groups/createExcelFile?`,
  ADMIN_DOWNLOAD_LIST: `${ROOT_URL}/administration/groups/downloadList?`,
  ADMIN_UPLOAD: `${ROOT_URL}/administration/groups/ajaxUploadStart?`,
  ADMIN_SORT: `${ROOT_URL}/administration/groups/sort?`,
  ADMIN_CREATE: `${ROOT_URL}/administration/groups/create?`,
  ADMIN_UPDATE: (id: number) => `${ROOT_URL}/administration/groups/update?`,
  ADMIN_GET_ENVIRONMENTS: `${ROOT_URL}/administration/groups/getEnvironments?`,
  ADMIN_ON_ADD_ENVIRONMENT: `${ROOT_URL}/administration/groups/onAddEnvironment?`,
  ADMIN_GET_IMAGES: `${ROOT_URL}/administration/getImages?`,
  ADMIN_CONFIRM: `${ROOT_URL}/administration/confirm${
    Math.random() * 100 < 20 ? "Wrong" : "Ok"
  }?`,
  ADMIN_DELETE: (id: number) =>
    `${ROOT_URL}/administration/groups/delete${
      Math.random() * 100 < 20 ? "Wrong" : "Ok"
    }?`,
  ADMIN_CLONE: `${ROOT_URL}/administration/groups/clone?`,
  ADMIN_LOAD_DEPD: (id: number) =>
    `${ROOT_URL}/administration/groups/loadDeps?`,
  ADMIN_DOWNLOAD_DEPS: (id: number) =>
    `${ROOT_URL}/administration/groups/downloadDeps?`,
};

export default Config;
