import React, { ComponentType, Suspense } from 'react';

const componentName = window?.specificAdminData?.component;
let Component: React.LazyExoticComponent<React.ComponentType<unknown>>;

try {
  Component = React.lazy<ComponentType<unknown>>(
    () =>
      import(
        /* webpackChunkName: "AdminComponent" */ `./${componentName}/${componentName}.tsx`
      ) as Promise<{
        default: ComponentType<unknown>;
      }>,
  );
} catch (e: unknown) {
  console.log(e);
}

const Administration = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Component && <Component />}
    </Suspense>
  );
};

export default Administration;
