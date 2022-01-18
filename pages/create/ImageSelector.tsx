/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from "@theme-ui/match-media";
import React, { ReactElement } from "react";
import { Button, Heading, Spinner } from "theme-ui";
import Confirm from "../../src/components/common/dialogs/Confirm";
import Modal from "../../src/components/common/dialogs/Modal";

interface IImageSelector {
  onChange: (ev: string) => void;
  onBlur: () => void;
  value: string;
  name: string;
  fetcher: () => Promise<IImageDefinition[] | null>;
  fakeImages?: boolean;
}

export interface IImageDefinition {
  description: string;
  path: string;
  name: string;
}

/* BUTTONS */
const confirmLabel = "Seleccionar";
const cancelLabel = "Cancelar";

/* IMAGE PICKER */
const currentSelectedLabel = "Imágen seleccionada acutalmente: ";
const errorLabel = "Error al cargar las imágenes luego de 3 intentos.";
const resetImageLabel = "Resetear imagen";
const changeImageLabel = "Cambiar imagen";

const defaultImage =
  "http://localhost:8080/Apia/images/uploaded/-736769579.JPEG";

const ImageSelector = React.forwardRef((props: IImageSelector, ref) => {
  const [showModal, toggleModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<IImageDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [failsFetching, setFailsFetching] = React.useState(0);
  const [error, setError] = React.useState<null | string>(null);

  const breakpoint = useBreakpointIndex({ defaultIndex: 3 });
  const columns = breakpoint >= 3 ? 4 : 2;

  React.useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const result = await props.fetcher();
      setLoading(false);

      if (result) setImages(result);
      else setFailsFetching(failsFetching + 1);
    }
    if (showModal && images.length === 0 && !loading && failsFetching < 3) {
      fetchImages();
    } else if (failsFetching >= 3) {
      setError(errorLabel);
    }
  }, [showModal, images, loading]);

  React.useEffect(() => {
    if (!props.value) props.onChange(defaultImage);
  }, []);

  const selectedRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (showModal) selectedRef.current?.focus();
  }, [selectedIndex, showModal]);

  const getRows = () => {
    const rows: IImageDefinition[][] = new Array(
      Math.ceil(images.length / columns)
    );
    images.forEach((image, index) => {
      const rowIndex = Math.floor(index / columns);
      if (!rows[rowIndex]) rows[rowIndex] = new Array();
      rows[rowIndex].push(image);
    });
    return rows;
  };

  return (
    <div className="ImageContainer">
      <button
        aria-label={changeImageLabel}
        type="button"
        onClick={(ev) => {
          ev.preventDefault();
          toggleModal(true);
        }}
      >
        <img
          role="presentation"
          src={props.value ?? defaultImage}
          ref={ref as React.Ref<HTMLImageElement>}
        />
        <span
          sx={{
            width: "1px",
            height: "1px",
            overflow: "hidden",
            margin: "1px",
            display: "block",
          }}
          aria-live="polite"
        >
          {currentSelectedLabel} {props.value}
        </span>
      </button>
      <label>
        <Button
          variant="secondary"
          type="button"
          id="ResetImage"
          aria-label={resetImageLabel}
        >
          {resetImageLabel}
        </Button>
      </label>
      {showModal && (
        <div className={showModal ? "openModal" : "closedModal"}>
          <Modal
            size="flex"
            id="ImagesPicker"
            title={changeImageLabel}
            className="imagesModal"
            open={true}
            onClose={() => toggleModal(false)}
          >
            <Confirm
              confirmText={confirmLabel}
              cancelText={cancelLabel}
              onConfirmOk={() => {
                console.log("Select");
              }}
              onConfirmCancel={() => {
                console.log("Cancel");
              }}
            >
              {error ? (
                <Heading className="error" as="h3">
                  {error}
                </Heading>
              ) : (
                <>
                  {loading && (
                    <div className="spinner">
                      <Spinner />
                    </div>
                  )}
                  {!loading && (
                    <div role="grid" aria-labelledby="Modal-ImagesPicker-title">
                      <div role="rowgroup">
                        {getRows().map((row, currentRow) => {
                          return (
                            <div
                              role="row"
                              sx={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                              }}
                            >
                              {row.map((image, currentColumn) => {
                                const imageIndex =
                                  currentRow * columns + currentColumn;
                                return (
                                  <div
                                    role="cell"
                                    aria-label={image.description}
                                    key={image.name}
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setSelectedIndex(imageIndex);
                                    }}
                                    {...(imageIndex === selectedIndex
                                      ? {
                                          tabIndex: 0,
                                          onKeyDown: (ev) => {
                                            const sumY =
                                              [
                                                "",
                                                "ArrowUp",
                                                "",
                                                "ArrowDown",
                                              ].indexOf(ev.key) - 2;
                                            const sumX =
                                              [
                                                "",
                                                "ArrowLeft",
                                                "",
                                                "ArrowRight",
                                              ].indexOf(ev.key) - 2;

                                            const totalRows = Math.ceil(
                                              images.length / columns
                                            );

                                            if (sumY >= -1) {
                                              ev.preventDefault();
                                              let newRow = currentRow + sumY;
                                              if (newRow < 0)
                                                newRow = totalRows - 1;
                                              if (newRow >= totalRows)
                                                newRow = 0;
                                              let newIndex =
                                                newRow * columns +
                                                currentColumn;
                                              if (newIndex >= images.length) {
                                                if (sumY < 0)
                                                  newIndex =
                                                    (totalRows - 2) * columns +
                                                    currentColumn;
                                                else
                                                  newIndex =
                                                    newIndex % totalRows;
                                              }
                                              setSelectedIndex(newIndex);
                                            } else if (sumX >= -1) {
                                              ev.preventDefault();
                                              let newColumn =
                                                currentColumn + sumX;
                                              if (newColumn < 0)
                                                newColumn = columns - 1;
                                              if (newColumn >= columns)
                                                newColumn = 0;
                                              let newIndex =
                                                currentRow * columns +
                                                newColumn;
                                              if (newIndex >= images.length) {
                                                if (sumX < 0)
                                                  newIndex = images.length - 1;
                                                else
                                                  newIndex =
                                                    currentRow * columns;
                                              }
                                              setSelectedIndex(newIndex);
                                            } else if (ev.key === "Enter") {
                                              ev.preventDefault();
                                              props.onChange(
                                                props.fakeImages
                                                  ? "https://placekitten.com/350/350"
                                                  : image.path
                                              );
                                              toggleModal(false);
                                            }
                                          },
                                          ref: selectedRef,
                                        }
                                      : {
                                          tabIndex: -1,
                                        })}
                                  >
                                    <img
                                      src={
                                        props.fakeImages === true
                                          ? "https://placekitten.com/350/350"
                                          : image.path
                                      }
                                      alt={image.description}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </Confirm>
          </Modal>
        </div>
      )}
    </div>
  );
});

export default ImageSelector;
