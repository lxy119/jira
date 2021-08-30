import { useMemo } from "react"
import {useSetUrlSearchParam, useUrlQueryParam} from "utils/url"
import {useProjectId} from "../../utils/project";

export const useProjectSearchParams=()=>{
    const [param,setParam]=useUrlQueryParam(['name','personId'])

    return [useMemo(() => ({...param,personId:Number(param.personId)||undefined}),[param]),
    setParam] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams();
    return ["projects", params];
};


export  const useProjectModal=()=>{
    const [{projectCreate},setProjectModalOpen]=useUrlQueryParam(['projectCreate'])


    const [{editingProjectId},setEditingProjectId]=useUrlQueryParam(['editingProjectId'])
    const setUrlParams = useSetUrlSearchParam();

    const {data:editingProject,isLoading}=useProjectId(Number(editingProjectId))
    const startEdit=(id:number)=>setEditingProjectId({editingProjectId: id})

    const open=()=>setProjectModalOpen({projectCreate:true})
    const close=()=>setUrlParams({editingProjectId:'',projectCreate:''})
    return {
        projectModalOpen:projectCreate === 'true'||Boolean(editingProjectId),
        open,
        close,
        editingProject,
        startEdit,
        isLoading
    } as const

}