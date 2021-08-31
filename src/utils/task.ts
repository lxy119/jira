import {useHttp} from "./http";
import {useQuery} from "react-query";
import {cleanObject} from "./index";
import {Task} from "../types/task";

export  const useTasks=(param?:Partial<Task>)=>{
    const client=useHttp()

    return useQuery<Task[]>(['tasks',cleanObject(param)],()=>client('tasks',{data:param}))
}