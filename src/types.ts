export type TApiaFieldType =
  | "area"
  | "button"
  | "captcha"
  | "check"
  | "editor"
  | "file"
  | "grid"
  | "hidden"
  | "href"
  | "image"
  | "input"
  | "label"
  | "multiple"
  | "password"
  | "radio"
  | "select"
  | "title"
  | "tree"
  | "form";

export type TButtonFormAction =
  | "btnNext"
  | "btnPrevious"
  | "btnConfirm"
  | "btnSave"
  | "btnFree"
  | "btnDelegate"
  | "onConfirmError"
  | "btnCloseTab";

export type TModalSize = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export type TApiaButtonType =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "warning"
  | "link";

export type TApiaFieldValueType = "N" | "S" | "D" | "";

export type TFrmParent = "E" | "P";

export type TErrorMessageType = "exception" | "sysMessage" | "sysException";

export type TDateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD";

export type TFormEvts =
  | "onLoad"
  | "onSubmit"
  | "onReload"
  | "onBeforePrint"
  | "onAfterPrint";

export type TFieldEvts =
  | "onLoad"
  | "onReload"
  | "onSubmit"
  | "onChange"
  | "onClick"
  | "onPopulate"
  | "gridAdd"
  | "gridSort"
  | "gridDelete";

export type TApiaSelectPossibleValue = {
  value: string | number;
  label: string;
  selected?: boolean;
};

export type TApiaMultiplePossibleValue = {
  value: string | number;
  label: string;
  selected?: boolean;
};

export type TApiaRadioPossibleValue = {
  value: string | number;
  label: string;
  selected?: boolean;
};

export type TApiaPossibleValue = TApiaRadioPossibleValue &
  TApiaMultiplePossibleValue &
  TApiaSelectPossibleValue;

export type TFncParams = {
  type: "V" | "P" | "E";
  value?: string;
  attId?: number;
};

export type TFormScriptEvents = {
  fncName: string;
  evtName: Readonly<TFormEvts>;
  evtId?: number;
  fncParams: TFncParams[];
}[];

export type TFieldScriptEvents = {
  fncName: string;
  evtName: Readonly<TFieldEvts>;
  evtId: number | string;
  fncParams: TFncParams[];
}[];

export type TFieldServerEvents = {
  evtId: number;
  evtName: Readonly<TFieldEvts>;
  isAjax: boolean;
}[];

export type TApiaFormPropertiesObj = {
  readOnly?: boolean;
  frmHidden?: boolean;
  frmClosed?: boolean;
  frmHighlight?: boolean;
  frmInvisible?: boolean;
  frmTab?: boolean;
  frmDontFire?: boolean;
};

export type TApiaForm = {
  id: Readonly<string>;
  formName: Readonly<string>;
  formTitle: Readonly<string>;
  cols: number;
  rows: number;
  prpFrmClosed: boolean;
  signableForm: boolean;
  requiredSignableForm: boolean;
  markedToSign: boolean;
  readOnly: boolean;
  field: TApiaComponents[] | TApiaComponents;
  scriptEvents?: TFormScriptEvents;
  properties: TApiaFormPropertiesObj;
};

export type TFileUploaded = {
  docId: string;
  downloadDocId: string;
  docName?: string;
  docTypeLabel?: string;
  docTypeId?: string;
  docSize?: string;
  docTypeFreeMetadata?: boolean;
  docLangGroup?: string;
  canEdit?: boolean;
  lock?: string;
  name?: string;
  size?: string;
  lockedBy?: string;
};

export type TGridValue = {
  gridHeader: IApiaDataGrid["gridHeader"];
  field: {
    attId: string;
    attLabel: string;
    attName: string;
    fieldType: TApiaFieldType;
    id: string;
    valueType: TApiaFieldValueType;
    properties: TApiaFieldPropsObj;
    scriptEvents: TFieldScriptEvents;
    serverEvents: TFieldServerEvents;
    fieldValue?: {
      value: string;
      properties: TApiaFieldPropsObj;
    };
    row?: {
      value: string;
      properties: TApiaFieldPropsObj;
      possibleValue: TApiaPossibleValue[];
    };
  }[];
  startIndex?: number;
  curPage?: number;
  pages?: number;
  rowCount?: number;
};

export type TApiaFieldPropsObj = {
  alignment?: string;
  alt?: string;
  bold?: string;
  checked?: boolean;
  colspan?: number;
  cssClass?: string;
  disabled?: boolean;
  docType?: string;
  fontColor?: string;
  gridHeight?: number;
  gridTitle?: string;
  height?: string;
  hideAddButton?: boolean;
  hideDelButton?: boolean;
  hideGridButtons?: boolean;
  hideIncludeButton?: boolean;
  hideOrderButton?: boolean;
  pagedGridSize?: number;
  paged?: boolean;
  includeFirstRow?: boolean;
  imageUrl?: string;
  inputAsText?: boolean;
  multiselect?: boolean;
  name?: string;
  noPrint?: boolean;
  readonly?: boolean;
  regExpMessage?: string;
  required?: boolean;
  rowspan?: number;
  selParent?: boolean;
  size?: string;
  tooltip?: string;
  tooltipHelp?: boolean;
  transient?: boolean;
  underlined?: boolean;
  url?: string;
  value?: string;
  valueColor?: string;
  visibilityHidden?: boolean;
  possibleValue?:
    | TApiaSelectPossibleValue[]
    | TApiaSelectPossibleValue
    | TApiaRadioPossibleValue[]
    | TApiaMultiplePossibleValue[]
    | TApiaMultiplePossibleValue;
  leafIcon?: string;
  parentIcon?: string;
  fieldId?: string;
  props?: string;
  id?: string;
  noLock?: boolean;
  noErase?: boolean;
  noModify?: boolean;
  noDownload?: boolean;
  allowEdition?: boolean;
  hideDocDownload?: boolean;
  qryId?: string;
  startIndex?: number;
  curPage?: number;
  pages?: number;
  rowCount?: number;
  colWidth?: string;
};

export type TApiaComponents =
  | IApiaInput
  | IApiaDatePicker
  | IApiaHiddenInput
  | IApiaTextArea
  | IApiaSelect
  | IApiaMultiple
  | IApiaCheckBox
  | IApiaRadioButton
  | IApiaFileUploader
  | IApiaDataGrid
  | IApiaLink
  | IApiaTitle
  | IApiaImage
  | IApiaText
  | IApiaButton;

export interface IApiaFormComponent {
  formData: TApiaForm;
  formId: string;
}
export interface IApiaComponent {
  field: TApiaComponents;
  formId: string;
  formName: string;
  frmParent: TFrmParent;
  formReadonly?: boolean;
  onGrid?: boolean;
  index?: number;
}
export interface IApiaCommonComponent {
  attId: Readonly<string>;
  attLabel: Readonly<string>;
  attName: Readonly<string>;
  cols?: number;
  rows?: number;
  fieldType: Readonly<TApiaFieldType>;
  forceSync?: boolean;
  id: Readonly<string>;
  isAjaxEvent?: boolean;
  properties: TApiaFieldPropsObj;
  scriptEvents?: TFieldScriptEvents;
  serverEvent?: boolean;
  serverEvents?: TFieldServerEvents;
  valueType: Readonly<TApiaFieldValueType>;
  file_prp?: string;
  index?: number;
  x: number;
  y: number;
  qryId?: string;
  qry_show_value?: string;
}

export interface IApiaInput extends IApiaCommonComponent {
  value: string | number;
  length?: number;
  regExp?: RegExp;
  mask?: string;
  maskPlaceholder?: string;
  alwaysShowMask?: boolean;
  decimalZeroes?: string;
  cantDecimals?: string;
}
export interface IApiaDatePicker extends IApiaCommonComponent {
  value: string;
  isoDateValue?: string;
  length?: number;
  valueType: "D";
}

export interface IApiaFinder extends IApiaCommonComponent {
  value: string;
}

export type IApiaFileInput = IApiaCommonComponent;

export interface IApiaHiddenInput extends IApiaCommonComponent {
  value: string;
  length?: number;
}
export interface IApiaTextArea extends IApiaCommonComponent {
  value: string;
  length?: number;
}
export interface IApiaSelect extends IApiaCommonComponent {
  value: string | number;
  possibleValue: TApiaSelectPossibleValue[] | TApiaSelectPossibleValue;
}
export interface IApiaMultiple extends IApiaCommonComponent {
  value: string[] | number[];
  possibleValue: TApiaMultiplePossibleValue[] | TApiaMultiplePossibleValue;
}
export interface IApiaCheckBox extends IApiaCommonComponent {
  value: string | boolean | number;
}
export interface IApiaRadioButton extends IApiaCommonComponent {
  value: string | number;
  possibleValue: TApiaRadioPossibleValue[];
}
export interface IApiaLink extends IApiaCommonComponent {
  value: string;
  url: string;
}
export interface IApiaTitle extends IApiaCommonComponent {
  value: string;
}
export interface IApiaText extends IApiaCommonComponent {
  value: string;
}
export interface IApiaImage extends IApiaCommonComponent {
  value: string;
}
export interface IApiaButton extends IApiaCommonComponent {
  value: string;
}
export interface IApiaEditor extends IApiaCommonComponent {
  value: string;
  readonly: boolean;
}
export interface IApiaTree extends IApiaCommonComponent {
  value: string;
  index: number;
  parent: boolean;
  text: string;
  parentElement: {
    index: number;
    value: string;
    text: string;
  };
  possibleValue: IApiaTree[];
}
export interface IApiaCaptcha extends IApiaCommonComponent {
  value: string;
}

export interface IApiaFileUploader extends IApiaCommonComponent {
  value: string;
  maxFiles?: number;
  docType?: string;
}

export interface IApiaDataGrid extends IApiaCommonComponent {
  value: string;
  startIndex: string;
  curPage: string;
  pages: string;
  rowCount: string;
  gridHeader: {
    col: {
      title: string;
      colTitle: string;
    }[];
  };
  field: {
    attId: string;
    attLabel: string;
    attName: string;
    fieldType: TApiaFieldType;
    id: string;
    valueType: TApiaFieldValueType;
    properties: TApiaFieldPropsObj;
    scriptEvents: TFieldScriptEvents;
    serverEvents: TFieldServerEvents;
    fieldValue?: {
      value: string;
      properties: TApiaFieldPropsObj;
    }[];
    row?: {
      value: string;
      properties: TApiaFieldPropsObj;
      possibleValue: TApiaPossibleValue[];
    }[];
  }[];
}

export interface ICaptchaSubmit {
  [key: string]: string;
}
export interface IApiaAsText extends IApiaCommonComponent {
  value: string;
}

export interface IApiaBaseComponent {
  fieldId: string;
  props: TApiaFieldPropsObj & TApiaFieldAttributes & TApiaFormAttributes;
}

export interface IApiaInputField extends IApiaBaseComponent {
  field: IApiaInput;
}

export interface IApiaFinderField extends IApiaBaseComponent {
  field: IApiaFinder;
}

export interface IApiaDatePickerField extends IApiaBaseComponent {
  field: IApiaDatePicker;
}

export interface IApiaTextAreaField extends IApiaBaseComponent {
  field: IApiaTextArea;
}
export interface IApiaButtonField extends IApiaBaseComponent {
  field: IApiaButton;
}

export interface IApiaCheckBoxField extends IApiaBaseComponent {
  field: IApiaCheckBox;
}

export interface IApiaRadioButtonField extends IApiaBaseComponent {
  field: IApiaRadioButton;
}

export interface IApiaSelectField extends IApiaBaseComponent {
  field: IApiaSelect;
}
export interface IApiaMultipleField extends IApiaBaseComponent {
  field: IApiaMultiple;
}

export interface IApiaFileInputField extends IApiaBaseComponent {
  field: IApiaFileInput;
}

export interface IApiaUploaderField extends IApiaBaseComponent {
  field: IApiaFileUploader;
  maxFilesAllowed: number;
}

export interface IApiaHiddenInputField extends IApiaBaseComponent {
  field: IApiaHiddenInput;
}
export interface IApiaImageField extends IApiaBaseComponent {
  field: IApiaImage;
}

export interface IApiaLinkField extends IApiaBaseComponent {
  field: IApiaLink;
}

export interface IApiaTextField extends IApiaBaseComponent {
  field: IApiaText;
}

export interface IApiaDataGridField extends IApiaBaseComponent {
  field: IApiaDataGrid;
}

export interface IApiaTitleField extends IApiaBaseComponent {
  field: IApiaTitle;
}
export interface IApiaEditorField extends IApiaBaseComponent {
  field: IApiaEditor;
}
export interface IApiaTreeField extends IApiaBaseComponent {
  field: IApiaTree;
}
export interface IApiaCaptchaField extends IApiaBaseComponent {
  field: IApiaCaptcha;
}
export interface IApiaAsTextField {
  fieldId: string;
  field: IApiaAsText;
}

// export interface IApiaDataGrid {
//   headerData: {
//     id: string;
//     title: string;
//     colTitle: string;
//     fieldType: Omit<
//       TApiaFieldType,
//       'grid' | 'area' | 'radio' | 'editor' | 'captcha' | 'tree' | 'multiple'
//     >;
//   }[];
//   fieldsData: [{ fields: React.ReactElement }[]];
//   paged?: boolean;
//   pagedGridSize?: number;
//   readonly?: boolean;
//   visibilityHidden?: boolean;
//   hideGridButtons?: boolean;
//   hideIncludeButton?: boolean;
//   hideAddButton?: boolean;
//   hideDelButton?: boolean;
//   hideOrderButton?: boolean;
//   gridHeight?: number;
//   gridTitle?: string;
//   startIndex?: number;
//   curPage?: number;
//   pages?: number;
//   rowCount?: number;
//   position: number;
//   divDataXML: HTMLDivElement;
//   createApiaFormElement: () => void;
//   includeFirstRow?: boolean;
//   alterOnlyLastPage?: boolean;
//   gridForm?: string;
//   gridQuery?: boolean;
//   maxRecords?: number;
// }

export type TApiaFieldAttributes = {
  attributes?: {
    fieldType: IApiaCommonComponent["fieldType"];
    attId: IApiaCommonComponent["attId"];
    attName: IApiaCommonComponent["attName"];
    attLabel: IApiaCommonComponent["attLabel"];
    valueType: IApiaCommonComponent["valueType"];
    index: Readonly<number>;
    onGrid: Readonly<boolean>;
    fileProperties?: TFileUploaded[];
  };
};

export type TApiaFormAttributes = {
  formData?: {
    id: Readonly<string>;
    frmParent: Readonly<TFrmParent>;
    frmId: Readonly<string>;
    frmName: Readonly<string>;
    readOnly: Readonly<boolean>;
  };
};

export type TApiaFieldPropertiesObj = TApiaFieldPropsObj &
  TApiaFieldAttributes &
  TApiaFormPropertiesObj &
  TApiaFormAttributes;

export type TComponentSubmitValues =
  | string
  | number
  | boolean
  | string[]
  | TFileUploaded[]
  | TGridValue
  | undefined;

export type TAlertImportance = "main" | "modal" | "global";

// alert/notification types
export type TAlertObj = {
  uuid?: number;
  message: string;
  type: TErrorMessageType | string;
  open: boolean;
  id?: string;
  stack?: string;
  onClose?: number | string;
  importance?: TAlertImportance;
  windowIndex?: number;
};

// common apia messages converted by XML2JS
export type TApiaSystemMessageObj<Structure = Record<string, unknown>> =
  Structure & {
    onClose?: string;
    sysMessages?: {
      message: {
        text: string;
        label?: string;
      }[];
    };
    sysExceptions?: {
      exception: {
        text: string;
        label?: string;
      }[];
    };
    exceptions?: {
      exception:
        | {
            text: string;
            label?: string;
          }[]
        | {
            text: string;
            label?: string;
          };
    };
    actions?: unknown;
    code?: unknown;
    load?: Structure;
  };

// XML2JS response from several requests
export type TResultObj = {
  success: boolean;
};

export type TComponentValidatorObjEvents =
  | ""
  | "init"
  | "jsapi-update"
  | "jsapi-update-validate"
  | "props-update"
  | "click"
  | "blur"
  | "focus"
  | "change"
  | "checked"
  | "unchecked"
  | "cal-date-picked"
  | "validate"
  | "file-validation"
  | "onLoad"
  | "onSubmit"
  | "onReload"
  | "finder-modal-return"
  | "finder-"
  | null;

export type TComponentValidatorObj = {
  isValid: boolean;
  value?: TComponentSubmitValues;
  message?: string | null;
  event?: TComponentValidatorObjEvents;
  fieldType: TApiaFieldType;
  valueType: TApiaFieldValueType;
};
export type TSessionExceptions = {
  exception: {
    label: string;
    text: string;
  };
};

export type TApiaFilterValue = string | number;

export type TApiaFilterOption = {
  label: string;
  value: TApiaFilterValue;
};

export type TApiaFilter = {
  // Information
  id: string | number;
  column?: string;
  title?: string;
  placeholder?: string;
  toolTip?: string;
  currentValue: TApiaFilterValue;

  // If it has options, it will be a select
  options?: TApiaFilterOption[];

  // There it could be more types in the future, if no type then it is an input
  type?: "date";
};

// Rows definition
export type TApiaRowDefinition = {
  "data-selected"?: boolean;
  selected?: boolean;
  dblclic: boolean;
  id: string;
  classToAdd?: string;
  unselectableTR?: boolean;
  cell: (
    | string
    | { label: string; classToAdd?: string; [key: string]: unknown }
  )[];
};

export type TApiaFunctionPageInfo = {
  // Ready
  amount: string;
  currentPage: string;
  hasMore: boolean;
  pageCount: string;
  prefix: string;
  reachedMax: boolean;
  selectOnlyOne: boolean;
  totalRecords: string;
};

export type TApiaTableFunction = {
  result: {
    pageInfo: TApiaFunctionPageInfo;
    table: {
      row: TApiaRowDefinition | TApiaRowDefinition[];
    };
  };
};

export type TApiaResponseLoadWithFunction<FunctionType = TApiaTableFunction> = {
  canClose: boolean;
  type: string;
  function: {
    name: string;
    messages: FunctionType;
  };
};

export type TApiaColumn = {
  name: string;
  label: string;
  toolTip: string;
  dataSortBy: string;
  sort: string;
  width: number;
};
