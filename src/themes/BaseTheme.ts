import { Theme } from "theme-ui";

/* 
This theme is for structural purposes only.
*/

const BaseTheme: Theme = {
  layout: {
    responsiveTable: {
      overflow: "auto",
      marginX: "auto",
      transform: "translateZ(10px)",
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",
      alignItems: "center",
      ".tableLoading": {
        zIndex: 500,
        transition: "background 1000ms",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",

        "&.tableLoading-appear-done": {
          background: "hsla(0,0%,100%,0.5)",
        },
      },

      "& > div": {
        background: "white",
        maxWidth: "100%",
        overflow: "auto",
        table: {
          display: "block",
          borderCollapse: "separate",
          borderSpacing: 0,
          background: "none",

          ".stickyColumn": {
            position: "sticky",
            left: 0,
            zIndex: 99,
          },

          thead: {
            position: "sticky",
            top: 0,
            zIndex: 100,

            th: {
              height: "100%",
              padding: 0,
              "& > div > button, & > div > div": {
                padding: 3,
                background: "none",
                border: "none",
                color: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              },
              svg: {
                ml: 2,
                transform: "translateY(2px)",
              },
              button: {
                cursor: "pointer",
                width: "100%",
              },

              ".headButton": {
                fontWeight: "normal",
                textTransform: "uppercase",
              },
            },
            "th.tableHeaderFilter": {
              bg: "background",
              padding: 1,
            },
          },
        },

        tbody: {
          ".stickyColumn": {
            background: "white",
          },
          tr: {
            "button.moreInformation": {
              width: "100%",
              font: "inherit",
              color: "primary",
              cursor: "pointer",
              div: {
                width: "100%",
              },
            },
            "&.additionalInformation": {
              "&.locked *": {
                color: "text",
              },
              padding: "10px",
              strong: {
                marginRight: "10px",
              },
            },
            td: {
              padding: 2,
              wordBreak: "break-all",
            },
          },
        },
      },
    },
    tableAccordion: {
      overflow: "auto",
      height: "100%",

      ".content": {
        overflow: "hidden",
      },
    },
    administrationList: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
    },
    administrationAside: {
      overflow: "auto",

      ".adminPanel": {
        ".content": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        },

        h3: {
          my: 3,
          mt: 4,
          borderBottom: "1px solid",
        },

        "&:first-of-type": {
          h3: {
            marginTop: 0,
          },
        },

        ".additionalFilter": {
          gap: 3,

          "& > div": {
            width: "100%",
          },
        },
      },

      "&>div": {
        paddingX: 3,
        display: ["none", null, null, null, "block"],
      },

      "&.floatingMenu": {
        position: ["fixed", null, null, null, "relative"],
        right: [3, null, null, null, "0"],
        top: ["100px", null, null, null, "0"],
        bottom: ["100px", null, null, null, "0"],
        "&>div": {
          bg: "background",
          display: "block",
          py: [3, null, null, null, 0],
          border: ["1px solid", null, null, null, "none"],
          borderColor: "text",
        },
      },
    },
    administrationPage: {
      maxHeight: "100vh",
      maxWidth: "max-content",
      height: "100vh",
      display: "flex",
      justifyContent: "stretch",
      flexDirection: "column",
      overflow: "auto",

      "&>.notifications": {
        "&>.notification": {
          "&:first-of-type": {
            marginTop: 3,
          },
          "&:last-of-type": {
            marginBottom: 0,
            mx: 3,
          },
        },
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3,
        gap: 3,

        button: {
          flexBasis: "49px",
          flexShrink: 0,
          display: ["block", null, null, null, "none"],
          variant: "buttons.primary",
          padding: 2,
          height: "auto",
          marginRight: 2,
          svg: {
            width: "30px",
            height: "30px",
          },
        },
        "&>div>h1": {
          my: 3,
          marginBottom: 0,
        },

        "&>div > .description": {
          marginY: 3,
          marginTop: 1,
        },
      },

      "& > .content": {
        flexGrow: 1,
        flexShrink: 1,
        overflow: "hidden",
        display: "grid",
        flexDirection: "column-reverse",
        gridTemplateColumns: ["1fr", null, null, null, "1fr 380px"],

        main: {
          overflow: "hidden",
          paddingLeft: 3,
          paddingRight: [3, null, null, null, 0],
        },

        aside: {
          variant: "layout.administrationAside",
        },

        ".contentExplorer": {
          alignItems: "stretch",
          border: "1px solid",
          borderColor: "lightBorder",

          table: {
            minWidth: "100%",
          },
        },
      },

      "& > .spacer": {
        height: "80px",
      },
    },
    pagination: {
      gap: 1,
      justifyContent: "center",
      alignItems: "stretch",
      background: "hsl(1,0%,80%)",
      ".input": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: 3,
        border: "1px solid",
        borderColor: "lightBorder",
        paddingY: 1,
        paddingX: 2,
        background: "white",
        input: {
          font: "inherit",
          background: "none",
          border: "none",
          width: "30px",
          padding: 0,
          textAlign: "center",
        },
        span: {
          font: "inherit",
          display: "block",
          width: "30px",
        },
      },
      button: {
        height: "auto",
        background: "none",
        cursor: "pointer",

        svg: {
          size: "22px",
        },
      },
    },
    imageContainer: {
      bg: "primary",
      p: 3,
      display: "flex",
      flexBasis: "184px",
      alignItems: ["center", null, "stretch"],
      flexDirection: "column",
      gap: 2,

      img: {
        width: "150px",
        height: "150px",
      },

      ".imagesModal": {
        ".spinner": {
          textAlign: "center",
        },
        ".error": {
          color: "darkred",
          mb: 0,
        },
      },

      '[role="grid"]': {
        '[role="row"]': {
          display: "grid",
          gap: 3,
          mb: 3,
          "& div:active": {
            outline: "3px solid",
            outlineColor: "outlineColor",
          },
          "& div:focus": {
            outline: "3px solid",
            outlineColor: "outlineColor",
          },
        },
        div: {
          display: "inline-block",
          background: "none",
          border: "none",

          img: {
            display: "block",
            width: "150px",
            height: "150px",
          },
        },
      },
    },
    admin: {
      upsertion: {
        px: [2, null, null, 0],
        maxWidth: "admin",
        header: {
          position: "sticky",
          bg: "background",

          top: 0,
          borderBottom: "1px solid",
          my: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: ["center", null, null, "end"],
          flexDirection: ["column", null, null, "row"],
          pb: 1,
          h1: {
            my: 0,
            pb: 1,
          },
          nav: {
            width: ["100%", null, "auto"],
            display: "flex",
            alignItems: "stretch",
            flexDirection: ["column", null, "row"],
            gap: 1,
          },
        },
        fieldset: {
          variant: "layout.form",
          background: "white",
          left: 0,
          font: "inherit",
          p: 3,

          legend: {
            variant: "buttons.accordion",
            left: "-17px",
            width: "calc(100% + 34px)",
            position: "relative",
            border: "1px solid",
            px: 3,
            py: 2,
            h2: {
              margin: 0,
            },
          },
          "& > div": {
            //The flex
            gap: 3,
            flexDirection: ["column", null, "row"],
          },
          ".ImageContainer": {
            variant: "layout.imageContainer",
          },
          ".Container": {
            flexGrow: 1,
            flexBasis: "100%",
            "h3,h4": {
              marginTop: 3,
              marginBottom: 2,
            },

            ".label-flex": {
              display: "flex",
              alignItems: "center",
              marginBottom: 0,
            },

            "& label": {
              display: "block",
              marginBottom: 3,
              h3: {
                marginTop: 0,
              },
              h4: {
                margin: 0,
              },
            },

            textarea: {
              height: "15vh",
            },

            ".environments": {
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              gap: 2,
              padding: 0,
              marginTop: 0,
              mb: 2,

              button: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                px: 3,
                py: 2,
                gap: 2,
                cursor: "pointer",
              },
            },
          },

          ".Container.SimulationData": {
            gridTemplateColumns: [
              "1r",
              null,
              null,
              "1fr 1fr",
              "1fr 1fr 1fr 1fr",
            ],
          },
        },
      },
    },
  },
};

export default BaseTheme;
