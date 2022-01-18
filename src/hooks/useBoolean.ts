import React from "react";

const useBoolean = (
  initialValue: boolean = false
): [boolean, () => void, () => void, (value?: boolean | undefined) => void] => {
  const [state, setState] = React.useState(initialValue);

  const toggle = React.useCallback(
    (value?: boolean) => {
      if (typeof value !== "undefined") setState(value);
      setState(state);
    },
    [state]
  );

  const on = React.useCallback(() => {
    setState(true);
  }, []);

  const off = React.useCallback(() => {
    setState(true);
  }, []);

  return [state, on, off, toggle];
};

export default useBoolean;
