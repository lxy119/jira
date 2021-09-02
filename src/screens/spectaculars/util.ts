import {useLocation} from "react-router";
import { useUrlQueryParam } from "utils/url";
import {useProjectId} from "../../utils/project";
import { useCallback, useMemo } from "react";
import { useTask } from "utils/task";
//获取url的project的id值
export const useProjectIdInUrl=()=>{
    const {pathname}=useLocation()
    const id=pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}
//通过url的id值获取项目名

export const useProjectInUrl=()=>useProjectId(useProjectIdInUrl())

//将进入项目看板的id赋值给projectId 
export const useSpectacularsSearchParams=()=>({projectId:useProjectIdInUrl()})
// 
export const useSpectacularsQueryKey=()=>['kanbans',useSpectacularsSearchParams()]

export const useTasksSearchParams=()=>{
    const [param]=useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId=useProjectIdInUrl()
    return  useMemo(() =>  ({
        projectId,
        typeId:Number(param.typeId)||undefined,
        processorId:Number(param.processorId)||undefined,
        tagId:Number(param.tagId)||undefined,
        name:param.name
    }), [projectId,param])
}
export const useTasksQueryKey=()=>['tasks',useTasksSearchParams()]

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
      "editingTaskId",
    ]);
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
    const startEdit = useCallback(
      (id: number) => {
        setEditingTaskId({ editingTaskId: id });
      },
      [setEditingTaskId]
    );
    const close = useCallback(() => {
      setEditingTaskId({ editingTaskId: "" });
    }, [setEditingTaskId]);
    return {
      editingTaskId,
      editingTask,
      startEdit,
      close,
      isLoading,
    };
  };
  