export type TRequestError = {
  response: {
    [key: string]: string;
  };
};

export type TOnClose =
  | 'clearEvalPath'
  | 'confirmOkOnClose'
  | 'confirmOkOnCloseSplash'
  | 'confirmOkOnSaveSplash'
  | 'releaseOkOnClose'
  | null;

export type TErrMessage = {
  message: {
    text: string;
    label?: string;
  };
};
