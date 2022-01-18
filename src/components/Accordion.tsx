/** @jsxImportSource theme-ui */
import * as React from "react";
import { FaPlus, FaMinus } from "@meronex/icons/fa";

export interface IAccordion {
  title: string;
  id: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  frmClosed?: boolean;
  frmHidden?: boolean;
}

const Accordion = ({
  frmClosed = false,
  frmHidden = false,
  title,
  id,
  children,
  onClick,
}: IAccordion): JSX.Element => {
  const expandedIcons = () => {
    if (frmClosed) {
      return (
        <FaPlus
          sx={{
            ml: "4",
          }}
        />
      );
    }
    return (
      <FaMinus
        sx={{
          ml: "4",
        }}
      />
    );
  };

  return (
    <section
      aria-hidden={frmHidden}
      aria-label={title}
      key={`${id}__${title}`}
      sx={{
        variant: "layout.formContainer",
        display: frmHidden ? "none" : "block",
      }}
    >
      <button
        type="button"
        title={title}
        id={`section_${id}`}
        aria-expanded={!frmClosed}
        aria-controls={`panel_${id}`}
        onClick={onClick}
        sx={{
          variant: "buttons.accordion",
          borderBottom: frmClosed ? "1px solid" : "none",
        }}
      >
        <h2>{title}</h2>
        {expandedIcons()}
      </button>
      {children}
    </section>
  );
};

export default Accordion;
