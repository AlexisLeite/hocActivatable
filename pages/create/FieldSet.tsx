import React, { ReactElement } from "react";
import AnimateHeight from "react-animate-height";
import { Box } from "theme-ui";
import Accordion from "../../src/components/Accordion";

export interface IFieldset {
  name: string;
  title: string;
  children?: React.ReactNode;
  open: boolean;
  onClick: () => void;
  inAccordion?: boolean;
}

const Fieldset = ({
  title,
  children,
  name,
  open,
  onClick,
  inAccordion,
}: IFieldset) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const definitiveOpen = inAccordion ? open : isOpen;
  return (
    <Accordion
      title={title}
      id={name}
      frmClosed={!definitiveOpen}
      onClick={() => (inAccordion ? onClick() : setIsOpen(!definitiveOpen))}
    >
      <AnimateHeight
        id={`anime_accordion_${name}`}
        duration={300}
        height={definitiveOpen ? "auto" : 0}
        // easing=""
      >
        <Box
          as="fieldset"
          className={`Fieldset-${name} ${definitiveOpen ? "open" : "closed"}`}
          id={`panel_${name}`}
          aria-hidden={!definitiveOpen}
          variant="layout.form"
        >
          {children}
        </Box>
      </AnimateHeight>
    </Accordion>
  );
};

export default Fieldset;
