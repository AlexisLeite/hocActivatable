// @ts-nocheck
// clone HTMLElement attributes from target to source
export const copyAttributes = (
  target: HTMLElement,
  source: HTMLElement,
  idx: number,
): HTMLElement => {
  Array.prototype.slice.call(source.attributes).forEach((attr) => {
    if (attr.nodeName === 'id') {
      // because we use id to create react key, needs to be unique
      target.setAttribute(attr.nodeName, `${attr.nodeValue}_${idx}`);
    } else {
      target.setAttribute(attr.nodeName, attr.nodeValue);
    }
  });
  return target;
};
// decimal number for grid field positioning
export const getGridPositionIndex = (
  pos: number,
  colOrderDecimal: number,
  page = 0,
): number => {
  return Number.parseFloat(
    `${pos}.${page}99${
      colOrderDecimal <= 9 ? `0${colOrderDecimal}` : colOrderDecimal
    }`,
  );
};

interface GridHeaderData {
  colTitle: string | null;
  title: string | null;
  fieldType: string | null;
  id: string | null;
}

type GridHeader = Array<GridHeaderData>;

export const getDataGridCmpHeaderData = (
  gridHeaderArr: HTMLCollection,
  gridBodyArr: HTMLCollection,
): GridHeader => {
  const gridHeaderDataArray: GridHeaderData[] = [];
  Array.prototype.slice
    .call(gridHeaderArr)
    .forEach((headerCol: HTMLElement, index: number) => {
      gridHeaderDataArray.push({
        colTitle: headerCol.getAttribute('colTitle'),
        title: headerCol.getAttribute('title'),
        fieldType: gridBodyArr[index + 1].getAttribute('fieldType'),
        id: gridBodyArr[index + 1].getAttribute('id'),
      });
    });
  return gridHeaderDataArray;
};
