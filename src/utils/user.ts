import {cleanObject} from "./index";
import {useHttp} from "./http";
import {User} from "../types/user";
import { useQuery } from "react-query";

export  const useUsers= (param?: Partial<User>)=>{
    const client=useHttp()

    return useQuery<User[]>(['users',cleanObject(param)],()=>client('users',{data:param}))
}


