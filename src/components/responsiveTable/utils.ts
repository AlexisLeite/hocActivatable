import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const preventDefault: React.ReactEventHandler = (ev) => {
  ev.preventDefault();
};