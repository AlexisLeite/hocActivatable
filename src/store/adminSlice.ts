import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { stringify } from "qs";
import { TAdminColumn } from "../components/apia/admin/types";
import Config from "../components/config";
import {
  TApiaColumn,
  TApiaFilter,
  TApiaFunctionPageInfo,
  TApiaResponseLoadWithFunction,
  TApiaRowDefinition,
} from "../types";
import ApiaApi from "../utils/apiaApi";
import { arrayOrArray, makeFormData } from "../utils/utils";

interface IAdminSlice {
  columns: TApiaColumn[];
  currentSelected: number[];
  filters: TApiaFilter[];
  loadingPage: boolean;
  pageInfo?: TApiaFunctionPageInfo;
  table?: TApiaRowDefinition[];

  showMenu?: boolean;
}

const parseTable = (
  serverResponse: AxiosResponse<TApiaResponseLoadWithFunction | null> | void
) => {
  if (serverResponse && serverResponse.data) {
    const { pageInfo } = serverResponse.data.function.messages.result;
    const table = arrayOrArray(
      serverResponse.data.function.messages.result.table.row
    );

    if (pageInfo && table) {
      return { pageInfo, table };
    }
  }
  return null;
};

/**
 * The updateFilters method is intended to be called with an array
 * of ApiaFilter[] with the currentValue modified for each filter
 * that must be updated
 *
 * @example
 *
 * updateFilters(filters.map(currentFilter => {
 *  if(currentFilter.id === modifyingId)
 *    return {...currentFilter, currentValue: newValue}
 *  return currentFilter
 * }))
 */
export const updateFilters = createAsyncThunk<
  {
    filters: TApiaFilter[];
    data: {
      pageInfo: TApiaFunctionPageInfo;
      table: TApiaRowDefinition[];
    } | null;
  } | null,
  { filters: TApiaFilter[]; init?: boolean },
  { state: { adminSlice: IAdminSlice } }
>("adminSlice/updateFilters", async (props, thunkAPI) => {
  if (props.init) {
    return { data: null, filters: props.filters };
  }

  const filters = [...thunkAPI.getState().adminSlice.filters];
  let changes = 0;
  props.filters.forEach((newState) => {
    const updatingFilterIndex = filters.findIndex(
      (searchFilter) => searchFilter.id === newState.id
    );
    if (updatingFilterIndex !== -1) {
      if (filters[updatingFilterIndex].currentValue === newState.currentValue) {
        return;
      }
      changes += 1;
      filters[updatingFilterIndex] = {
        ...filters[updatingFilterIndex],
        currentValue: newState.currentValue,
      };
    }
  });

  if (changes === 0) return null;

  const formData = makeFormData(
    filters.reduce((postObject, currentFilter) => {
      return {
        ...postObject,
        [currentFilter.id]: currentFilter.currentValue,
      };
    }, {})
  );
  const response = await ApiaApi.post<TApiaResponseLoadWithFunction>(
    `${Config.ADMIN_FILTER}&timestamp=${Date.now()}`,
    formData
  );

  return {
    filters,
    data: response ? parseTable(response) : null,
  };
});

/**
 * @example
 *
 * dispatch(clearFilters())
 */
export const clearFilters = createAsyncThunk<
  void,
  void,
  { state: { adminSlice: IAdminSlice } }
>("adminSlice/clearFilters", async (art, { getState, dispatch }) => {
  const { filters } = getState().adminSlice;
  const newFilters = filters.map((currentFilter) => ({
    ...currentFilter,
    currentValue: "",
  }));
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  await dispatch(
    updateFilters({
      filters: newFilters,
    })
  );
});

export const getPage = createAsyncThunk<
  { pageInfo: TApiaFunctionPageInfo; table: TApiaRowDefinition[] } | null,
  { page: number }
>("adminSlice/getPage", async ({ page }) => {
  const result = await ApiaApi.post<TApiaResponseLoadWithFunction>(
    `${Config.ADMIN_GET_PAGE}${stringify({
      page,
      timestamp: Date.now(),
    })}`
  );

  if (result) return parseTable(result);
  return null;
});

export const refreshPage = createAsyncThunk<
  { pageInfo: TApiaFunctionPageInfo; table: TApiaRowDefinition[] } | null,
  void
>("adminSlice/refreshPage", async () => {
  const result = await ApiaApi.post<TApiaResponseLoadWithFunction>(
    `${Config.ADMIN_REFRESH_PAGE}&timestamp: ${Date.now()}`
  );

  if (result) return parseTable(result);
  return null;
});

const initLoading = (state: WritableDraft<IAdminSlice>) => {
  state.loadingPage = true;
};
const endLoading = (state: WritableDraft<IAdminSlice>) => {
  state.loadingPage = false;
};
const assignTable = (
  state: WritableDraft<IAdminSlice>,
  {
    payload,
  }: PayloadAction<{
    pageInfo: TApiaFunctionPageInfo;
    table: TApiaRowDefinition[];
  } | null>
) => {
  if (payload) {
    state.pageInfo = payload.pageInfo;
    state.table = payload.table;
  }
  endLoading(state);
};

const extraReducers = [getPage, refreshPage, updateFilters];

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    columns: [],
    currentSelected: [],
    filters: [],
    loadingPage: false,
  } as IAdminSlice,
  reducers: {
    setColumns: (state, { payload }: PayloadAction<TAdminColumn[]>) => {
      state.columns = payload;
    },
    showMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.showMenu = payload;
    },
    updateCurrent: (state, { payload }: { payload: number[] }) => {
      state.currentSelected = payload;
    },
  },
  extraReducers: (builder) => {
    extraReducers.forEach((def) => {
      builder.addCase(def.pending, initLoading);
      builder.addCase(def.rejected, endLoading);
    });
    builder.addCase(getPage.fulfilled, assignTable);
    builder.addCase(refreshPage.fulfilled, assignTable);
    builder.addCase(updateFilters.fulfilled, (state, { payload }) => {
      if (payload) {
        state.filters = payload.filters;

        const { data } = payload;
        if (data)
          assignTable(state, {
            payload: data,
            type: "dontMatter",
          });
      }
      endLoading(state);
    });
  },
});

export const adminReducers = adminSlice.actions;
export default adminSlice.reducer;
