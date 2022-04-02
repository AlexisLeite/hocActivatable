import { darken, desaturate, getColor, lighten } from "@theme-ui/color";
import { Theme } from "theme-ui";

const smallButton = {
  fontSize: "0.8em",
  padding: "6px 14px",
};

const Burocrat: Theme = {
  grids: {
    form: {
      columnGap: "4",
      rowGap: "3",
      alignItems: "self-end",
      gridAutoRows: [
        "minmax(70px, auto)",
        "minmax(70px, auto)",
        "minmax(70px, auto)",
      ],
      // gridAutoRows: ['min-content', 'min-content', 'minmax(16px, auto)'],
      // gridAutoRows: 'minmax(min-content, 16px)',
    },
    formReadOnly: {
      columnGap: "4",
      rowGap: "3",
      alignItems: "self-end",
      gridAutoRows: "minmax(auto, auto)",
    },
  },
  layout: {
    table: {},
    tableRow: {
      cursor: "pointer",
      fontWeight: "normal",
      backgroundColor: "transparent",
      color: "inherit",
      display: ["block", "table-row"],
      "&:last-child div": {
        borderBottom: "none",
      },
    },
    "table-head-th": {
      bg: "primary",
      position: "sticky",
      border: "0.9px solid #d2d2da",
      top: "-1px",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    "tableRow-selected": {
      variant: "layout.tableRow",
      fontWeight: "bold",
      backgroundColor: lighten("primary", 0.45),
      color: darken("primary", 0.5),
    },
    "tableRow-highlighted": {
      variant: "layout.tableRow",
      fontWeight: "bold",
      backgroundColor: lighten("primary", 0.55),
      color: darken("primary", 0.5),
    },
    root: {
      p: "4",
      minWidth: "320px",
      maxWidth: "root",
    },
    formContainer: {
      mb: "3",
    },
    form: {
      bg: "white",
      p: "4",
      border: "1px solid",
      borderColor: darken("lightBlue", 0.05),
    },
    buttonBar: {
      my: ["3", "4", "4"],
      justifyContent: "center",
      flexDirection: ["column", "row", "row"],
      gap: "2",
    },
    overlay: {
      position: "fixed",
      overflow: "hidden",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      padding: "1.5em 1.5em",
      userSelect: "none",
      zIndex: "1000",
      alignItems: "center",
      backgroundColor: `rgba(0, 0, 0, 0.75)`,
    },
    "overlay-stretch": {
      variant: "layout.overlay",
      alignItems: ["stretch", null, "center"],
    },
    modal: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      p: 4,
      alignItems: "center",
      justifyItems: "center",
      maxHeight: "95vh",
      "&>div": {
        overflow: "hidden",
        flexGrow: 0,
        flexShrink: 0,
        p: "3px",
        width: "100%",
      },
      "&>div.modalHeader": {
        flexBasis: "40px",
        flexGrow: 1,
        overflow: "visible",
      },
      "&>div.modalContent": {
        flexBasis: "98%",
        flexShrink: 1,
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
      },
    },
    "modal-sm": {
      variant: "layout.modal",
      maxWidth: "350px",
    },
    "modal-md": {
      variant: "layout.modal",
      maxWidth: "500.1px",
    },
    "modal-lg": {
      variant: "layout.modal",
      maxWidth: "640px",
    },
    "modal-xl": {
      variant: "layout.modal",
      maxWidth: "730px",
    },
    "modal-xxl": {
      variant: "layout.modal",
      maxWidth: ["95vw", null, "80vw"],
      height: [null, null, "80vh"],
    },
    "modal-xxxl": {
      variant: "layout.modal",
      maxWidth: ["95vw", null, "95vw"],
      height: [null, null, "95vh"],
    },
    "modal-flex": {
      variant: "layout.modal",
      maxWidth: "95vw",
      maxHeight: "95vh",

      ".modalContent": {
        overflow: "auto",
      },
    },
    confirmModal: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      "& > div:first-of-type": {
        flexBasis: "100%",
        wordBreak: "break-word",
      },
      gap: "10px",
    },
    // Section
    section: {
      border: "1px solid lightgrey",
      padding: 3,
    },

    responsiveTable: {
      "&:focus, :focus": {
        outline: "none",
        table: {
          tbody: {
            tr: {
              "&.highlighted": {
                td: {
                  borderTop: "1px solid hsl(247, 98%, 10%)",
                  borderBottom: "1px solid hsl(247, 98%, 10%)",
                },
                "td:first-of-type": {
                  borderLeft: "1px solid hsl(247, 98%, 10%)",
                },
                "td:last-of-type": {
                  borderRight: "1px solid hsl(247, 98%, 10%)",
                },
              },
            },
          },
        },
      },
      table: {
        "td,th": {
          border: "1px solid",
          borderColor: "lightBorder",
        },
        ".stickyColumns": {
          bg: "background",

          button: {
            background: "none",
            border: "none",
          },
        },
        thead: {
          bg: "background",

          th: {
            bg: "primary",
            color: "background",
            border: "none",
            borderRight: "1px solid",
            borderColor: "lightBorder",

            "&:last-of-type": {
              border: "none",
            },
          },
          "tr:first-of-type": {
            th: {
              borderColor: "hsl(205deg 100% 35%)",
            },
          },

          "th.required": {
            textDecoration: "underline",
          },

          "th.tableHeaderFilter": {
            bg: "background",
            color: "secondary",
          },
        },
        tbody: {
          tr: {
            cursor: "pointer",
            ":hover:not(.locked)": {
              td: {
                borderTop: "1px solid hsl(247, 98%, 10%)",
                borderBottom: "1px solid hsl(247, 98%, 10%)",
              },
              "td:first-of-type": {
                borderLeft: "1px solid hsl(247, 98%, 10%)",
              },
              "td:last-of-type": {
                borderRight: "1px solid hsl(247, 98%, 10%)",
              },
            },
            "&.hover": {
              bg: "gridRowHighlight",
            },
            "button.moreInformation": {
              background: "hsl(230,5%,90%)",
              border: "1px solid hsl(230,5%, 85%)",
              fontWeight: "bold",
              fontFamily: "Arial black, Impact",
              "&:hover": {
                background: "hsl(230,5%,85%)",
              },
            },
            "&.locked": {
              color: "hsl(30,5%,40%)",
              "*": { color: "hsl(30,5%,70%)" },
              ".lockedIcon": { marginRight: "10px" },
              ".lockedIcon path": {
                color: "hsl(50deg 100% 27%)",
                border: "1px solid black",
              },
              cursor: "initial",
            },

            "td.bold": {
              fontWeight: "bold",
            },
          },
        },
      },

      nothingToShow: {
        fontSize: 3,
        marginY: 150,
      },
    },
    tableAccordion: {
      ".highlighted": {
        "button.toggleElement": {
          bg: "hsl(234,70%,70%)",
        },
      },
      "button.toggleElement": {
        variant: "buttons.accordion",
        bg: "primary",
        color: "background",
        fontSize: 2,
        p: 3,
        wordBreak: "keep-all",
        a: {
          color: "background",
        },
        ":focus": {
          outline: "none",
        },
        ":hover": {
          bg: "hsl(234,70%,80%)",
        },
        ".defaultTitleRender": {
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        },
      },

      ".content": {
        cursor: "pointer",
        textAlign: "left",
        p: 0,
        color: "primary" /*  darken('primary', 0.2) */,
        transition: "height 0.2s ",

        ".accordionCell": {
          strong: {
            marginRight: "10px",
          },

          "&.bold": {
            fontWeight: "bold",
            "*": {
              fontWeight: "bold",
            },
          },
        },
      },

      "article.locked": {
        "button.toggleElement": {
          background: "hsl(10,10%,80%)",
          cursor: "initial",
        },
      },
    },
    pagination: {
      gap: 1,
      justifyContent: "center",
      alignItems: "stretch",
      background: "hsl(1,0%,80%)",
      padding: 2,
      ".input": {},
    },
  },
  images: {
    imgInGrid: {
      minWidth: "initial",
      maxWidth: "initial",
    },
  },
  forms: {
    label: {
      color: "text",
      fontFamily: "body",
      fontSize: "2",
      fontWeight: "bold",
      alignItems: "center",
      width: "auto",
      textTransform: "none",
      userSelect: "none",
    },
    checkbox: {
      width: "32px",
      height: "32px",
      borderRadius: "default",
      "input:checked ~ &": {
        color: "primary",
      },
      "input:disabled ~ &": {
        color: "muted",
      },
      "input:focus ~ &": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
        bg: "transparent",
      },
    },
    radio: {
      width: "32px",
      height: "32px",
      "input:checked ~ &": {
        color: "primary",
      },
      "input:disabled ~ &": {
        color: "muted",
      },
      "input:focus ~ &": {
        color: "outlineColor",
        bg: "transparent",
      },
    },
    input: {
      fontFamily: "body",
      fontSize: 2,
      color: "text",
      backgroundColor: "white",
      border: "1px solid",
      borderColor: "muted",
      borderRadius: "default",
      padding: "12px",
      transition: "background-color 100ms ease-out, color 100ms ease-out",
      ":disabled": {
        color: "#666",
        borderColor: "#ccc",
        bg: "disabled",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      ":focus": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
      ":read-only": {
        color: "#666",
        borderColor: "#ccc",
        bg: "disabled",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      "::placeholder": {
        color: "#b0b0b0",
      },
    },
    'input[type="date"]': {
      variant: "input",
    },
    textarea: {
      variant: "forms.input",
    },
    select: {
      fontSize: 2,
      display: "inline-block",
      fontFamily: "body",
      borderColor: "muted",
      padding: "12px 32px 12px 12px",
      borderRadius: "default",
      backgroundColor: "#fff",
      transition: "background-color 100ms ease-out, color 100ms ease-out",
      ":disabled": {
        color: "#666",
        borderColor: "#ccc",
        bg: "disabled",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      ":focus": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
    },
    selectMultiple: {
      fontFamily: "body",
      fontSize: "2",
      height: "100%",
      backgroundColor: "#fff",
      padding: "4px",
      borderRadius: "default",
      border: "1px solid",
      borderColor: "muted",
      transition: "background-color 100ms ease-out, color 100ms ease-out",
      option: {
        padding: "4px",
      },
      "+ svg": {
        display: "none",
      },
      ":disabled": {
        color: "#666",
        borderColor: "#ccc",
        bg: "disabled",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      ":focus": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
      ":focus-visible": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
    },
    switch: {
      ":disabled": {
        color: "#666",
        borderColor: "#ccc",
        bg: "disabled",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      "input:focus ~ &": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
    },
  },
  buttons: {
    primary: {
      bg: "primary",
      fontFamily: "body",
      color: "white",
      pt: "12px",
      pb: "12px",
      pl: "4",
      pr: "4",
      width: ["100%", "auto", "auto"],
      borderRadius: "default",
      fontWeight: "normal",
      textTransform: "uppercase",
      userSelect: "none",
      transition: "background-color 300ms ease-out, color 300ms ease-out",
      wordBreak: "keep-all",
      cursor: "pointer",
      ":hover": (theme) => ({
        bg: darken(getColor(theme, "primary") as string, 0.12),
      }),
      ":focus": (theme) => ({
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
        bg: darken(getColor(theme, "primary") as string, 0.12),
      }),
      ":disabled": (theme) => {
        const desaturated = desaturate(
          getColor(theme, "primary") as string,
          0.5
        );
        return {
          cursor: "not-allowed",
          pointerEvents: "none",
          bg: lighten(desaturated(theme), 0.35),
        };
      },
    },
    "primary-sm": {
      variant: "buttons.primary",
      ...smallButton,
    },
    secondary: {
      variant: "buttons.primary",
      bg: "secondary",
      color: "white",
      ":hover": (theme) => ({
        bg: darken(getColor(theme, "secondary") as string, 0.12),
      }),
      ":focus": (theme) => ({
        bg: darken(getColor(theme, "secondary") as string, 0.12),
      }),
      ":disabled": (theme) => {
        const desaturated = desaturate(
          getColor(theme, "secondary") as string,
          0.5
        );
        return {
          cursor: "not-allowed",
          pointerEvents: "none",
          bg: lighten(desaturated(theme), 0.35),
        };
      },
    },
    danger: {
      variant: "buttons.primary",
      bg: "danger",
      color: "white",
      ":hover": (theme) => ({
        bg: darken(getColor(theme, "danger") as string, 0.12),
      }),
      ":focus": (theme) => ({
        bg: darken(getColor(theme, "danger") as string, 0.12),
      }),
      ":disabled": (theme) => {
        const desaturated = desaturate(
          getColor(theme, "danger") as string,
          0.5
        );
        return {
          cursor: "not-allowed",
          pointerEvents: "none",
          bg: lighten(desaturated(theme), 0.35),
        };
      },
    },
    warning: {
      variant: "buttons.primary",
      bg: "warning",
      color: "text",
      ":hover": (theme) => ({
        bg: lighten(getColor(theme, "warning") as string, 0.15),
      }),
      ":focus": (theme) => ({
        bg: lighten(getColor(theme, "warning") as string, 0.15),
      }),
      ":disabled": (theme) => {
        const desaturated = desaturate(
          getColor(theme, "warning") as string,
          0.5
        );
        return {
          cursor: "not-allowed",
          pointerEvents: "none",
          bg: lighten(desaturated(theme), 0.35),
        };
      },
    },
    close: {
      color: "text",
      cursor: "pointer",
      ml: "auto",
      mr: "2",
      borderRadius: "default",
      ":focus": {
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
      ":hover": (theme) => ({
        color: lighten(getColor(theme, "text") as string, 0.15),
      }),
    },
    accordion: {
      h2: {
        margin: 0,
        fontSize: "1.2em",
      },
      fontSize: "1em",
      color: "darkBlue",
      fontFamily: "heading",
      fontWeight: "bold",
      bg: "lightBlue",
      cursor: "pointer",
      m: "0",
      p: "1rem 2rem 1rem 2rem",
      textDecoration: "none",
      width: ["100%", "100%", "100%"],
      textAlign: "left",
      borderRadius: "default",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderLeft: "1px solid",
      borderRight: "1px solid",
      borderTop: "1px solid",
      borderBottom: "none",
      textTransform: "none",
      border: "1px solid",
      borderColor: darken("lightBlue", 0.05),
      transition: "background-color 300ms ease-out, color 300ms ease-out",
      ":focus": (theme) => ({
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
        bg: darken(getColor(theme, "lightBlue") as string, 0.05),
      }),
      ":hover": (theme) => ({
        bg: darken(getColor(theme, "lightBlue") as string, 0.05),
      }),
    },
    tableAccordion: {
      variant: "buttons.accordion",
      bg: "primary",
      color: "background",
      fontSize: 2,
      p: 3,
      wordBreak: "keep-all",
      a: {
        color: "background",
      },
    },
    tableHeader: {
      variant: "buttons.tableAccordion",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      border: "none",
      svg: {
        ml: 2,
      },
      borderColor: "#aaa",
    },
    outline: {
      variant: "primary",
      cursor: "pointer",
      color: "primary",
      border: "1px solid",
      borderColor: "primary",
      borderRadius: "default",
      bg: "white",
      ":hover": () => ({
        bg: "#e9e9e9",
      }),
      textTransform: "uppercase",
    },
    "outline-sm": {
      variant: "buttons.outline",
      ...smallButton,
    },
    link: {
      variant: "primary",
      bg: "transparent",
      width: "auto",
      color: "primary",
      border: "none",
      textDecoration: "underline",
      px: 2,
      py: 1,
      textTransform: "none",
      "&: hover": (theme) => {
        return {
          color: darken(getColor(theme, "primary") as string, 0.3),
          background: "transparent",
        };
      },
    },
    "link-sm": {
      variant: "buttons.link",
      padding: "3px 6px",
    },
    "link-md": {
      variant: "link",
      padding: "3px 6px",
    },
  },
  text: {
    default: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      fontSize: 2,
    },
    heading: {
      marginBottom: "4",
    },
    title: {
      color: "darkBlue",
      letterSpacing: "heading",
    },
  },
  alerts: {
    primary: {
      border: "1px solid",
      borderLeft: "12px solid",
      fontWeight: "body",
      p: "3",
      alignItems: "center",
      borderRadius: "default",
      mb: "4",
      "& div": {
        maxHeight: "290px",
        overflowY: "auto",
        p: "2",
        flexBasis: "100%",
        "& h3": {
          wordBreak: "break-word",
          width: "95%",
          fontWeight: "body",
        },
      },
    },
    sysMessage: {
      variant: "alerts.primary",
      color: "#856405",
      bg: "sysMessageNotificationBg",
      borderColor: "#ffeeba",
    },
    sysException: {
      variant: "alerts.primary",
      color: "#721c24",
      bg: "sysExceptionNotificationBg",
      borderColor: "#f5c6cb",
    },
    exception: {
      variant: "alerts.primary",
      color: "#721c24",
      bg: "sysExceptionNotificationBg",
      borderColor: "#f5c6cb",
    },
  },
  styles: {
    root: {
      // uses the theme values provided above
      fontFamily: "body",
      fontWeight: "body",
      boxSizing: "border-box",
    },
    h1: {
      color: "darkBlue",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "darkBlue",
      textDecoration: "underline",
      transition: "color 200ms ease-out",
      ":focus": {
        p: "1",
        outlineColor: "outlineColor",
        outlineWidth: "3px",
        outlineStyle: "solid",
      },
    },
    ul: {
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    li: {},
    table: {
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
    hr: {
      border: "none",
      borderStyle: "solid",
      borderWidth: "0px",
      borderTopWidth: "1px",
      borderColor: "muted",
    },
    spinner: {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10000,
    },
    spinnerModal: {
      textAlign: "center",
      ":focus": {
        outlineColor: "none",
        outlineWidth: "0",
        outlineStyle: "none",
      },
    },
    progress: {
      color: "accent",
      backgroundColor: "#dfdfdf",
      borderRadius: "default",
      height: "6px",
    },
  },
};

export default Burocrat;
