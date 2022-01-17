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
    admin: {
      upsertion: {
        maxWidth: "admin",
        h1: {
          my: 4,
          borderBottom: "1px solid",
        },
        form: {
          fieldset: {
            border: "1px solid",
            borderColor: "#bbb",
            font: "inherit",
            legend: {
              fontSize: "text.h2",
            },
            "& > div": {
              //The flex
              gap: 3,
              ".ImageContainer": {},
              ".Container": {
                flexGrow: 1,
                flexBasis: "100%",
                "& label": {
                  h3: {
                    margin: 0,
                    marginBottom: 1,
                  },

                  "&.label-flex": {
                    display: "flex",
                    alignItems: "end",
                  },
                },

                textarea: {
                  height: "15vh",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default BaseTheme;
