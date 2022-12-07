import { useEffect, useRef, useState } from "react";

// const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);
const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
//
// export const debounce = (func, delay)=>{
//     let timeout;
//     return (...param)=>{
//         if(timeout){
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(()=>{
//             func(...param)
//         }, delay)
//     }
// }

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化之后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <A>(initialArray: A[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: A) => {
      setValue([...value, item]);
    },
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 组件卸载时执行
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // TODO bug
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载返回 false，反之，返回 true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
