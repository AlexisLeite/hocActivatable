/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { Button, Container, Heading, IconButton, Label } from 'theme-ui';
import Config from 'config';
import { FaBars } from '@meronex/icons/fa';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useMountEffect } from '@react-hookz/web';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  adminReducers,
  refreshPage,
  updateFilters,
  clearFilters,
} from '../../../store/adminSlice';
import { TApiaFilter, TApiaFilterValue } from '../../../types';
import ApiaFilter from '../../common/ApiaFilter';
import AdministrationButtons from './AdministrationButtons';
import AdministrationList from './AdministrationList';
import AdministrationAsidePanel from './AdministrationAsidePanel';
import { TAdminColumn } from './types';
import { ListNotifications } from '../../common';

export interface IInnerFilterRender {
  className?: string;
  label?: string;
  filter: TApiaFilter;
  onChange: (ev: TApiaFilterValue) => void;
  onBlur: (ev: TApiaFilterValue) => void;
}

const InnerFilterRender = ({
  label,
  filter,
  onChange,
  onBlur,
}: IInnerFilterRender) => (
  <>
    <Label>{label}</Label>
    <ApiaFilter filter={filter} onChange={onChange} onBlur={onBlur} />
  </>
);

export interface IAdministrationPage {
  description: string;
  title: string;
  Footer?: React.ReactNode;

  columns: TAdminColumn[];
  filters: TApiaFilter[];

  children?: React.ReactNode;
  additionalPanels?: React.ReactNode;
}

const AdministrationPage = ({
  description,
  title,
  Footer,
  columns,
  children,
  additionalPanels,
  filters,
}: IAdministrationPage) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((globalState) => globalState.adminSlice);

  console.log({ state });

  useMountEffect(() => {
    dispatch(adminReducers.setColumns(columns));
    dispatch(updateFilters({ filters, init: true }));
  });

  const breakPoint = useBreakpointIndex({ defaultIndex: 5 });

  const additionalFilters = React.useMemo(
    () =>
      state.filters.filter((currentFilter) => {
        const hasColumn = state.columns.find(
          (currentColumn) => currentColumn.name === currentFilter.column,
        );
        return !hasColumn;
      }),
    [state.columns, state.filters],
  );
  const nonAdditionalFilters = React.useMemo(
    () =>
      state.filters.filter((currentFilter) => {
        const hasColumn = state.columns.findIndex(
          (currentColumn) => currentColumn.name === currentFilter.column,
        );
        return hasColumn !== -1;
      }),
    [state.columns, state.filters],
  );

  return (
    <Container variant="layout.administrationPage">
      <div className="notifications">
        <ListNotifications />
      </div>
      <header>
        <div>
          <Heading variant="text.title" as="h1">
            <span>{title}</span>
          </Heading>
          <p
            className="description"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
        <IconButton
          onClick={() => dispatch(adminReducers.showMenu(!state.showMenu))}
        >
          <FaBars />
        </IconButton>
      </header>
      <div className="content">
        <main>{children ?? <AdministrationList />}</main>
        <aside className={state.showMenu ? 'floatingMenu' : ''}>
          <div>
            {/* BUTTONS */}
            <AdministrationButtons
              onCreate={() => {
                console.log('Create');
              }}
              onClone={() => {
                console.log('Clone');
              }}
              onClose={() => {
                console.log('Close');
              }}
              onDelete={() => {
                console.log('Delete');
              }}
              onDependencies={() => {
                console.log('Dependencies');
              }}
              onModify={() => {
                console.log('Modify');
              }}
            />
            {/* OTHER PANELS */}
            {additionalPanels}

            {/* ADDITIONAL FILTERS */}
            {additionalFilters && (
              <AdministrationAsidePanel
                title={window.globalAdminData.additionalFiltersTitle}
                titleToolTip={window.globalAdminData.additionalFiltersTooltip}
                columns={1}
              >
                {additionalFilters.map((additionalFilter) => {
                  return (
                    <InnerFilterRender
                      className="additionalFilter"
                      key={additionalFilter.title}
                      label={additionalFilter.title}
                      filter={{ ...additionalFilter }}
                      onChange={() => {
                        if (additionalFilter.options) {
                          const activeElement =
                            document.activeElement as HTMLElement;
                          if (activeElement) activeElement.blur();
                        }
                      }}
                      onBlur={(ev) => {
                        dispatch(
                          updateFilters({
                            filters: [
                              { ...additionalFilter, currentValue: ev },
                            ],
                          }),
                        );
                      }}
                    />
                  );
                })}
              </AdministrationAsidePanel>
            )}

            {/* RESPONSIVE FILTERS */}
            {nonAdditionalFilters && breakPoint <= 1 && (
              <AdministrationAsidePanel
                title={window.globalAdminData.filtersTitle}
                titleToolTip={window.globalAdminData.filtersTooltip}
                columns={1}
              >
                {nonAdditionalFilters.map((filter) => {
                  return (
                    <InnerFilterRender
                      className="additionalFilter"
                      key={filter.title}
                      label={filter.title}
                      filter={{ ...filter }}
                      onChange={(ev) => {
                        if (filter.options)
                          dispatch(
                            updateFilters({
                              filters: [{ ...filter, currentValue: ev }],
                            }),
                          );
                      }}
                      onBlur={(ev) => {
                        dispatch(
                          updateFilters({
                            filters: [{ ...filter, currentValue: ev }],
                          }),
                        );
                      }}
                    />
                  );
                })}
              </AdministrationAsidePanel>
            )}

            {/* NOT IMPLEMENTED SORT BY ON BREAKPOINT */}

            <AdministrationAsidePanel title=" ">
              <Button
                variant="outline"
                disabled={state.loadingPage}
                onClick={() => {
                  dispatch(clearFilters());
                }}
              >
                {Config.FINDER_FILTER_DELETE_FILTERS}
              </Button>
              <Button
                variant="primary"
                disabled={state.loadingPage}
                onClick={() => {
                  dispatch(refreshPage());
                }}
              >
                {Config.FINDER_SEARCH_BUTTON_LABEL}
              </Button>
            </AdministrationAsidePanel>
          </div>
        </aside>
      </div>
      {Footer}
      <div className="spacer" />
    </Container>
  );
};

export default AdministrationPage;
