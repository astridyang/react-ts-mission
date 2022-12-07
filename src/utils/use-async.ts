import { useCallback, useState } from "react";
import { useMountedRef } from "./index";
// todo 使用 useReducer 改写
interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  const config = { ...defaultConfig, ...initialConfig };
  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        error: null,
        status: "success",
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        error,
        status: "error",
      }),
    []
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          // catch 会消化异常，如果不主动抛出，外面是接受不到异常的
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );
  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
