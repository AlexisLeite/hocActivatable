/** @jsxImportSource theme-ui */
import * as React from "react";
import DialogButtonBar from "./DialogButtonBar";
import SimpleButton from "../SimpleButton";
import { TApiaButtonType } from "../../../types";

export interface IConfirm {
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmType?: TApiaButtonType;
  onConfirmOk: () => void;
  onConfirmCancel?: () => void;
  showCancel?: boolean;
  isLoading?: boolean;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

const Confirm = ({
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmType = "primary",
  onConfirmOk,
  onConfirmCancel,
  showCancel = true,
  isLoading,
  contentRef,
  className,
}: IConfirm): JSX.Element => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "3",
      }}
      className={`${className ?? ""} confirm`}
    >
      <div
        ref={contentRef}
        sx={{
          overflow: "auto",
          padding: "3px",
          maxHeight: "65vh",
          my: 3,
          flexBasis: "100%",
          wordBreak: "break-word",
          display: "flex",
          flexDirection: "column",
        }}
        className="confirmContent"
      >
        {children}
      </div>
      <DialogButtonBar
        sx={{ flexBasis: "40px", flexGrow: 0, flexShrink: 0 }}
        className="confirmButtonBar"
      >
        <SimpleButton
          onClick={onConfirmOk}
          title={confirmText}
          variant={confirmType}
          mt={[0, 0, 0]}
          disabled={isLoading}
          isLoading={isLoading}
          className="confirmButton"
        >
          {confirmText}
        </SimpleButton>
        {onConfirmCancel && showCancel && (
          <SimpleButton
            onClick={onConfirmCancel}
            title={cancelText}
            variant="secondary"
            mt={[0, 0, 0]}
            disabled={isLoading}
            className="cancelButton"
          >
            {cancelText}
          </SimpleButton>
        )}
      </DialogButtonBar>
    </div>
  );
};

export default Confirm;
