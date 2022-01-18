/** @jsxImportSource theme-ui */
import * as React from "react";
import { Box, Close } from "theme-ui";
import { useBreakpointIndex } from "@theme-ui/match-media";

export interface IDialogHeader {
  title?: string;
  close: () => void;
  NavBar?: JSX.Element;
  className?: string;
  id?: string;
}

const DialogHeader = ({
  title = "",
  close,
  NavBar,
  className,
  id,
}: IDialogHeader): JSX.Element => {
  const breakpointIndex = useBreakpointIndex();

  const Title = (
    <h2
      sx={{
        m: "0",
        flex: 2,
        color: "darkBlue",
      }}
      className="modalTitle"
      id={id ? `Modal-${id}-title` : ""}
    >
      {title}
    </h2>
  );

  const CloseButton = (
    <Close
      role="button"
      aria-label="Cerrar"
      onClick={close}
      title="Cerrar"
      sx={{
        mr: "unset",
      }}
      className="modalHeaderCloseButton"
    />
  );

  const NavBarElement = NavBar && (
    <Box
      sx={{
        textAlign: "right",
        display: "flex",
        gap: ["3px", 2],
        justifyContent: "end",
        flexDirection: ["column", "row"],
        width: ["100%", "auto"],
      }}
      className="modalHeaderBar"
    >
      {NavBar}
    </Box>
  );

  return breakpointIndex > 1 ? (
    <div
      className={className}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: 0,
        justifyContent: "space-between",
        width: "100%",
        gap: 2,
      }}
    >
      {Title}
      {NavBarElement}
      {CloseButton}
    </div>
  ) : (
    <div
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 0,
        justifyContent: "space-between",
        width: "100%",
        gap: 2,
      }}
    >
      <div
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        {Title}
        {CloseButton}
      </div>
      {NavBarElement}
    </div>
  );
};

export default DialogHeader;
