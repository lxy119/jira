import {useLocation} from "react-router";
import {useProjectId} from "../../utils/project";

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

export const useTasksSearchParams=()=>({projectId:useProjectIdInUrl()})

export const useTasksQueryKey=()=>['tasks',useTasksSearchParams()]
