import { useCallback, useEffect, useReducer, useMemo } from 'react';

import { ResponseType } from '@/utils/request';

type AnyArgs = any[];

type AsyncFn<T = any> = (...args: AnyArgs) => Promise<T>;

export interface ServiceType<T = any> {
  (...args: AnyArgs): Promise<ResponseType<T>>;
}

/**
 返回结果定义:
 data         service 返回的data数据
 response     service 返回的数据，主要用于一些需要判断code或者分页信息的接口
 error        service 抛出的异常
 loading      service 是否正在执行
 run          手动触发 service 执行，参数会传递给 service，debounce 模式返回值为 Promise<null>
 params       当次执行的 service 的参数数组。例如：run(1, 2, 3)，则 params 等于 [1, 2, 3]
 **/
export interface ResultType<T = any> {
  data: T;
  response: ResponseType<T>;
  error?: unknown;
  loading: boolean;
  run: AsyncFn<T>;
  params: AnyArgs;
}

/**
 请求配置定义:
 manual              是否手动触发，默认 false，即在初始化时自动执行 service
 ready               只有当 ready 为 true 时，才会发起请求
 initialData         默认的 data
 cacheKey            请求的唯一标识，设置了会缓存成功请求的data, params, 如果请求失败则不会缓存
 refreshDeps         当 manual = false 时，自动触发 service 重新执行的依赖
 onSuccess           请求成功的返回，params 为执行 service 的数组
 onError             请求报错时触发
 defaultParams       当 manual = false时，自动执行 run 的时候，默认带上的参数
 debounceInterval    防抖间隔，设置后请求进入防抖模式
 **/
export interface OptionType<T = any> {
  manual: boolean;
  initialData: T;
  cacheKey: string;
  ready: boolean;
  refreshDeps: AnyArgs;
  onSuccess: (data: T, params: AnyArgs) => void;
  onError: (error: unknown, params: AnyArgs) => void;
  defaultParams: AnyArgs;
  debounceInterval: number;
}

export interface ResultRActionType {
  type: 'runService' | 'onSuccess' | 'onError';
  payload: Partial<ResultType>;
}

const initialState: ResultType = {
  data: void 0,
  response: {
    data: void 0,
    code: '0',
    msg: '',
  },
  loading: false,
  run: () => Promise.resolve(void 0),
  params: [],
};

const reducer = (state: ResultType, action: ResultRActionType): ResultType => {
  const { type, payload } = action;

  switch (type) {
    case 'runService':
      return {
        ...state,
        loading: true,
        error: void 0,
        params: payload.params!,
      };
    case 'onSuccess':
      return {
        ...state,
        loading: false,
        error: void 0,
        params: payload.params!,
        data: payload.data,
        response: payload.response!,
      };
    case 'onError':
      return {
        ...state,
        loading: false,
        error: payload.error,
        params: payload.params!,
      };
    default:
      return initialState;
  }
};

// 返回异步函数的简易防抖
const debounceAsync = (fn: AsyncFn, interval: number) => {
  if (!interval) return fn;

  let timer: any = null;

  return async function (this: any, ...args: AnyArgs) {
    clearTimeout(timer);
    const that = this;
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, interval);
  };
};

// 缓存请求
const requestCache: {
  [cacheKey: string]: Omit<ResultType, 'run' | 'error' | 'loading'>;
} = {};

// 传入service使用
export default function useRequest<T = any>(
  service: ServiceType<T>,
  option?: Partial<OptionType<T>>
): ResultType<T> {
  const {
    manual = false,
    initialData,
    cacheKey,
    ready = true,
    refreshDeps = [],
    onSuccess,
    onError,
    defaultParams = [],
    debounceInterval = 0,
  } = option || {};

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data: initialData,
  });

  const runService = useCallback(
    async (...args: AnyArgs) => {
      try {
        // 如果设置了缓存且有，那么直接使用缓存的数据
        if (cacheKey && requestCache[cacheKey]) {
          const { data, response, params } = requestCache[cacheKey];

          dispatch({
            type: 'onSuccess',
            payload: {
              params,
              data,
              response,
            },
          });

          onSuccess && onSuccess(data, params);

          return;
        }

        dispatch({
          type: 'runService',
          payload: {
            params: args,
          },
        });

        const response = await service(...args);

        dispatch({
          type: 'onSuccess',
          payload: {
            params: args,
            data: response.data,
            response,
          },
        });

        onSuccess && onSuccess(response.data, args);

        if (cacheKey) {
          requestCache[cacheKey] = {
            data: response.data,
            response,
            params: args,
          };
        }
      } catch (e) {
        dispatch({
          type: 'onError',
          payload: {
            params: args,
            error: e,
          },
        });

        // 如果未传入onError，则自动message提示
        onError ? onError(e, args) : console.warn((e as any)?.message);
      }
    },
    [cacheKey, onSuccess, onError]
  );

  const run = useMemo(() => {
    return debounceAsync(runService, debounceInterval);
  }, [runService, debounceInterval]);

  // 处理自动触发请求
  useEffect(() => {
    if (manual || !ready) return;

    runService(...defaultParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refreshDeps.concat(ready));

  return {
    ...state,
    run,
  };
}
