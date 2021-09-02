import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery} from "react-query";
import {cleanObject} from "./index";
import {Spectaculars} from "../types/spectaculars";
import { useAddConfig, useDeleteConfig,useReorderKanbanConfig } from "./use-optimistic-options";

export  const useSpectaculars=(param?:Partial<Spectaculars>)=>{
    const client=useHttp()

    return useQuery<Spectaculars[]>(['kanbans',cleanObject(param)],()=>client('kanbans',{data:param}))
}

export const useAddSpectaculars = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Spectaculars>) =>
        client(`kanbans`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
  
  export const useDeleteSpectaculars = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`kanbans/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  
  export interface SortProps {
    // 要重新排序的 item
    fromId: number;
    // 目标 item
    referenceId: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
  }

  // 将拖拽后的看板任务记录到数据库中
  export const useReorderSpectaculars = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("kanbans/reorder", {
        data: params,
        method: "POST",
      });
    }, useReorderKanbanConfig(queryKey));
  };
  