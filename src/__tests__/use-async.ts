import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";
//测试hook
const defaultState: ReturnType<typeof useAsync> = {
    stat: "idle",
    data: null,
    error: null,

    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,

    run: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
    retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: "loading",
    isIdle: false,
    isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: "success",
    isIdle: false,
    isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
    let resolve: any, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    //执行用于要测试的hook
    const { result } = renderHook(() => useAsync());
    expect(result.current).toEqual(defaultState);

    let p: Promise<any>;
    //run函数是异步的，act用于执行异步完了获取执行过后的值
    act(() => {
        p = result.current.run(promise);
    });
    expect(result.current).toEqual(loadingState);
    const resolvedValue = { mockedValue: "resolved" };
    await act(async () => {
        resolve(resolvedValue);
        await p;
    });
    expect(result.current).toEqual({
        ...successState,
        data: resolvedValue,
    });
});
