import React, { ReactElement } from 'react';
import { useMountEffect } from '@react-hookz/web';
import Config from 'config';
import ApiaApi from '../../../utils/apiaApi';
import { TApiaResponseLoadWithFunction } from '../execution/ApiaFinder/types';
import { arrayOrArray } from '../../../utils/util';
import { clog } from '../../../utils/util/utils';
import ResponsiveTable from '../../common/responsiveTable/ResponsiveTable';
import Pagination from '../../common/Pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  adminReducers,
  getPage,
  refreshPage,
  updateFilters,
} from '../../../store/adminSlice';
import { TApiaFilter, TApiaFilterValue } from '../../../types';

const AsyncMoreInfoRenderer = React.memo(() => {
  const [moreInfo, setMoreInfo] = React.useState({
    name: '',
    value: '',
  });
  useMountEffect(async () => {
    const result = await ApiaApi.post<
      TApiaResponseLoadWithFunction<{
        row: { cell: { label: string; name: string } };
      }>
    >(Config.ADMIN_MORE_INFO).catch(() => {});

    if (result && result.data) {
      console.log({ result });
      const resultCell = arrayOrArray(
        arrayOrArray(result.data.function.messages.row)[0].cell,
      )[0];

      if (typeof resultCell !== 'string') {
        const { name } = resultCell;
        const value = resultCell.label;
        setMoreInfo({ name, value });
      }
    }
  });
  return (
    <span>
      <strong>{moreInfo.name}:</strong> {moreInfo.value}
    </span>
  );
});

AsyncMoreInfoRenderer.displayName = 'AsyncMoreInfoRenderer';

const AdministrationList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((globalState) => globalState.adminSlice);

  React.useEffect(() => {
    const initialFetch = async () => {
      await dispatch(getPage({ page: 0 }));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedColumns = React.useMemo(
    () => [
      {
        asMoreInformation: true,
        name: 'moreInfo',
        title: 'More info',
        renderer: AsyncMoreInfoRenderer,
      },
      ...state.columns.map((column) => {
        return {
          asMoreInformation: false,
          width: column.width,
          hideFromTitle: false,
          name: column.name,
          enableSorting: true,
          title: column.label,
          toolTip: column.toolTip,
          required: true,
        };
      }),
    ],
    [state.columns],
  );
  const changeSelectionHandler = React.useCallback(
    (changeSelected: number[]) => {
      dispatch(adminReducers.updateCurrent(changeSelected));
    },
    [dispatch],
  );
  const Footer = React.useMemo(
    () => (
      <Pagination
        currentPage={Number.parseInt(state.pageInfo?.currentPage ?? '1', 10)}
        totalPages={Number.parseInt(state.pageInfo?.pageCount ?? '1', 10)}
        onPageChange={async (page) => {
          await dispatch(getPage({ page }));
        }}
        onRefresh={async () => {
          await dispatch(refreshPage());
        }}
      />
    ),
    [dispatch, state.pageInfo?.currentPage, state.pageInfo?.pageCount],
  );
  const memoizedRows = React.useMemo(
    () =>
      state.table?.map((row) => {
        return {
          classToAdd: row.classToAdd,
          id: row.id,
          locked: row.unselectableTR,
          selected: row.selected,
          cells: [
            { value: '' }, // More info cell
            ...arrayOrArray(row.cell).map((cell) => {
              if (typeof cell === 'string') return { value: cell };
              return {
                value: cell.label,
                ...cell,
              };
            }),
          ],
        };
      }) ?? [],
    [state.table],
  );

  const handleFilterChange = React.useCallback(
    async (ev: { filter: TApiaFilter; value: TApiaFilterValue }) => {
      console.log({ ev });
      await dispatch(
        updateFilters({
          filters: [
            {
              ...ev.filter,
              currentValue: ev.value,
            },
          ],
        }),
      );
    },
    [dispatch],
  );

  return state.pageInfo && state.table && state.columns.length > 0 ? (
    <div sx={{ variant: 'layout.administrationList' }}>
      <ResponsiveTable
        columns={memoizedColumns}
        filters={state.filters}
        rows={memoizedRows}
        onChangeSelection={changeSelectionHandler}
        onSortChange={(ev) => {
          clog('orange/onChangeSort', { ev });
        }}
        onFilterBlur={handleFilterChange}
        multiple
        Footer={Footer}
        loading={state.loadingPage}
        responsiveIndex={2}
      />
    </div>
  ) : (
    <div>{Config.LOADING}</div>
  );
};

export default AdministrationList;
