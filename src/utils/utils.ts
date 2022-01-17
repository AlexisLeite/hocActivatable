import React from "react";

export function ucFirst(origin: string) {
  return origin.substring(0, 1).toUpperCase() + origin.substr(1);
}

export function noNaN(number: number, defaultReturn = 0) {
  if (Number.isNaN(number)) return defaultReturn;
  return number;
}

export function clog(parameters: string, ...elements: unknown[]) {
  const result = parameters.match(/(\w+)\/(.*)/);
  const color = result === null ? "white" : result[1];
  const title = result === null ? "NoTitle" : result[2];
  console.log(`%c${title}`, `color: ${color}`, ...elements);
}

export function calcHeight(
  el: HTMLElement | null,
  {
    removePadding,
    addMargin,
  }: {
    removePadding: boolean;
    addMargin: boolean;
  } = { removePadding: true, addMargin: true }
) {
  if (typeof window === "undefined" || !el) return 0;

  const style = window.getComputedStyle(el);

  const margin = addMargin
    ? noNaN(parseFloat(style.marginTop)) + noNaN(parseFloat(style.marginBottom))
    : 0;
  const padding = removePadding
    ? noNaN(parseFloat(style.paddingTop)) +
      noNaN(parseFloat(style.paddingBottom))
    : 0;

  const height = noNaN(el.offsetHeight);

  return height - padding + margin;
}

export function useTraceUpdate(props: Record<string, unknown>) {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce<Record<string, unknown>>(
      (ps, [k, v]) => {
        const newPs = ps;
        if (prev.current[k] !== v) {
          newPs[k] = [prev.current[k], v];
        }
        return newPs;
      },
      {}
    );
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
}

import xml2js, { ParserOptions } from "xml2js";
import { parseBooleans, parseNumbers } from "xml2js/lib/processors";

export const isEmptyObj = <T>(obj: T): boolean => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const arrayOrArray = <T>(arrayOrObject: T | T[]): T[] => {
  if (arrayOrObject) {
    if (Array.isArray(arrayOrObject)) {
      return arrayOrObject;
    }
    return [arrayOrObject];
  }
  return [];
};

// get JS object from string
export const jsonDecode = (string: string): Record<string, string> => {
  if (!string || typeof string !== "string") return {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return eval(`(${string})`);
};

// get boolean value from string values
export const parseBool = (val: string | null): boolean => {
  if (typeof val === "string") {
    if (/^(?:true|T|t|1|1,00)$/i.test(val)) return true;
    if (/^(?:false|F|f|0|0,00|null)$/i.test(val)) return false;
  }
  return false;
};

// parse str as JSON
export const parseObj = (str: string): Record<string, unknown> => {
  return JSON.parse(
    str.replace(/([{,])(\s*)([A-Za-z0-9_-]+?)\s*:/g, '$1"$3":')
  ) as Record<string, unknown>;
};

export const asyncGetJSObjfromXML = async <T>(xml: string): Promise<T> => {
  const parser = new xml2js.Parser({
    trim: true,
    normalize: true,
    explicitRoot: false,
    mergeAttrs: true,
    explicitArray: false,
    charkey: "label",
    attrValueProcessors: [parseBooleans, parseNumbers],
  } as ParserOptions);

  const result = await new Promise<T>((resolve, reject) => {
    parser.parseString(xml, (err: Record<string, unknown>, innerResult: T) => {
      if (err) reject(err);
      else {
        resolve(innerResult);
      }
    });
  });

  return result;
};

export function fakeWait(ms: number, result?: unknown) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms);
  });
}

export function makeFormData(data: Record<string, string | number | boolean>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    let newValue: string;
    switch (typeof value) {
      case "number":
      case "boolean":
        newValue = value.toString();
        break;
      default:
        newValue = value;
        break;
    }
    formData.append(key, newValue);
  });

  return formData;
}
