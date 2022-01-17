import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { merge } from "lodash-es";
import store from "../store";
import { setNotification } from "../store/notificationsSlice";
import { clog, asyncGetJSObjfromXML } from "./utils";
import { dispatchNotification } from "../hooks/useNotifications";
import Config from "../components/config";
import { TAlertImportance, TApiaSystemMessageObj } from "../types";

export interface IUseApiaRequestsConfig {
  alertsImportance?: TAlertImportance;
  windowIndex?: number;
  debug?: boolean;
  colors?: Colors;
}

type Colors = {
  exception?: string;
  alert?: string;
  message?: string;
};

const defaultConfig: IUseApiaRequestsConfig = {
  debug: Config.ENV === "dev",
  alertsImportance: "main",
  windowIndex: -1,
  colors: {
    exception: "red",
    alert: "yellow",
    message: "lightgreen",
  },
};

function getColor(
  color: keyof Colors,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  colors: Colors = defaultConfig.colors!
) {
  return colors[color] as string;
}

const handleWrongResponse = (
  error: Error,
  outerBehaveConfig: IUseApiaRequestsConfig = defaultConfig
) => {
  const behaveConfig = merge(defaultConfig, outerBehaveConfig);
  let errorMessage: string;
  if (typeof error !== "string") {
    if (error.message) errorMessage = error.message;
    else errorMessage = error.toString();
  } else errorMessage = error;

  store.dispatch(
    setNotification({
      type: "exception",
      message: "Something went wrong",
      open: true,
      importance: /* alertsImportance */ "global",
      windowIndex: behaveConfig.windowIndex,
    })
  );
  clog(`red/${errorMessage}`, { error });
};

const parseSuccessfulResponse = async <
  LoadType extends Record<string, unknown>
>(
  response: string,
  outerBehaveConfig: IUseApiaRequestsConfig = defaultConfig
) => {
  const behaveConfig = merge(defaultConfig, outerBehaveConfig);
  const parsedObj: TApiaSystemMessageObj<LoadType> | void =
    await asyncGetJSObjfromXML<LoadType>(response).catch((e: unknown) => {
      handleWrongResponse(new Error(e as string), behaveConfig);
    });

  if (parsedObj) {
    const {
      actions,
      code,
      onClose,
      exceptions,
      sysExceptions,
      sysMessages,
      load,
      ...rest
    } = parsedObj; // Session handling
    if (code === "-1" && exceptions) {
      console.log("Session error");
      const message = Array.isArray(exceptions.exception)
        ? exceptions.exception.reduce((acc, current) => {
            return `${acc}<br>${current.text}`;
          }, "")
        : exceptions.exception.text; /* 
      store.dispatch(
        updateSessionState({
          isLog: false,
          message,
        })
      ); */
    }

    // It is here only because of ESLint not used alert
    if (actions) {
      /* if (debug) and if not because it's not being handled */ clog(
        `${getColor("alert", behaveConfig.colors)}/parseSuccessfulResponse`,
        { actions, noHandled: true }
      );
    }
    if (code) {
      clog(
        `${getColor("alert", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          code,
          noHandled: true,
        }
      );
    }
    if (onClose) {
      clog(
        `${getColor("alert", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          onClose,
          noHandled: true,
        }
      );
    }
    if (Object.values(rest).length > 0) {
      clog(
        `${getColor("alert", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          rest,
          noHandled: true,
        }
      );
    }
    if (exceptions && behaveConfig.debug) {
      clog(
        `${getColor("exception", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          exceptions,
        }
      );
    }
    if (sysExceptions && behaveConfig.debug) {
      clog(
        `${getColor("exception", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          sysExceptions,
        }
      );
    }
    if (sysMessages && behaveConfig.debug) {
      clog(
        `${getColor("alert", behaveConfig.colors)}/parseSuccessfulResponse`,
        {
          sysMessages,
        }
      );
    }

    if (exceptions || sysExceptions || sysMessages) {
      try {
        dispatchNotification(
          {
            exceptions,
            sysExceptions,
            sysMessages,
          },
          {
            importance: behaveConfig.alertsImportance,
            windowIndex: behaveConfig.windowIndex,
          }
        );
      } catch (e: unknown) {
        handleWrongResponse(new Error(e as string), behaveConfig);
      }
    }

    if (load) return load;
    return rest as LoadType;
  }

  return null;
};

async function handleResponse<LoadType extends Record<string, unknown>>(
  result: AxiosResponse<string> | void,
  outerBehaveConfig: IUseApiaRequestsConfig = defaultConfig
): Promise<AxiosResponse<LoadType | null> | null> {
  const behaveConfig = merge(defaultConfig, outerBehaveConfig);
  if (behaveConfig.debug)
    clog(`${getColor("message", behaveConfig.colors)}/handleResponse config`, {
      behaveConfig,
    });
  try {
    if (behaveConfig.debug)
      clog(`${getColor("message", behaveConfig.colors)}/ApiaApi`, { result });

    if (!result) {
      if (behaveConfig.debug)
        clog(
          `${getColor(
            "alert",
            behaveConfig.colors
          )}/useApiaRequests wrong response`
        );
    } else {
      const parsedResponse = await parseSuccessfulResponse<LoadType>(
        result.data ?? "",
        behaveConfig
      );

      if (behaveConfig.debug)
        clog(
          `${getColor(
            "message",
            behaveConfig.colors
          )}/post returned request body`,
          { body: parsedResponse }
        );

      return { ...result, data: parsedResponse };
    }
  } catch (e: unknown) {
    handleWrongResponse(new Error(e as string), behaveConfig);
    return null;
  }

  handleWrongResponse(new Error("Unexpected server response"), behaveConfig);
  return null;
}

async function post<
  LoadType extends Record<string, unknown> = Record<string, unknown>,
  T = unknown,
  D = unknown
>(
  url: string,
  data?: D | undefined,
  axiosConfig?: AxiosRequestConfig<D> | undefined,
  outerBehaveConfig: IUseApiaRequestsConfig = defaultConfig
): Promise<AxiosResponse<LoadType | null> | null> {
  const behaveConfig = merge(defaultConfig, outerBehaveConfig);
  if (behaveConfig.debug)
    clog(`${getColor("message", behaveConfig.colors)}/ApiaApi.post`, {
      url,
      data,
    });
  const response = await axios
    .post<T, AxiosResponse<string>, D>(url, data, axiosConfig)
    .catch((e: unknown) => {
      handleWrongResponse(new Error(e as string), behaveConfig);
    });

  const result = handleResponse<LoadType>(response, behaveConfig);
  return result;
}

async function get<
  LoadType extends Record<string, unknown> = Record<string, unknown>,
  T = unknown,
  D = unknown
>(
  url: string,
  axiosConfig?: AxiosRequestConfig<D> | undefined,
  outerBehaveConfig: IUseApiaRequestsConfig = defaultConfig
): Promise<AxiosResponse<LoadType | null> | null> {
  const behaveConfig = merge(defaultConfig, outerBehaveConfig);
  if (behaveConfig.debug)
    clog(`${getColor("message", behaveConfig.colors)}/ApiaApi.get`, {
      url,
    });
  const response = await axios
    .get<T, AxiosResponse<string>, D>(url, axiosConfig)
    .catch((e: unknown) => {
      handleWrongResponse(new Error(e as string), behaveConfig);
    });
  const result = await handleResponse<LoadType>(response, behaveConfig);
  return result;
}

const ApiaApi = {
  get,
  post,
};

export default ApiaApi;
