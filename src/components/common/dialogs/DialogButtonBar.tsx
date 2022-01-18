/** @jsxImportSource theme-ui */
import * as React from "react";

export interface IDialogButtonBar {
  children: React.ReactNode;
  className?: string;
}

const DialogButtonBar = ({
  children,
  className,
}: IDialogButtonBar): JSX.Element => {
  return (
    <div
      className={className}
      sx={{
        flexBasis: "20%",
        flexDirection: ["column", null, "row", "row"],
        display: "flex",
        justifyContent: "flex-start",
        gap: "2",
        mb: "0",
      }}
    >
      {children}
    </div>
  );
};

export default DialogButtonBar;
