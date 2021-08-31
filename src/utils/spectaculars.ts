import {useHttp} from "./http";
import {useQuery} from "react-query";
import {cleanObject} from "./index";
import {Spectaculars} from "../types/spectaculars";

export  const useSpectaculars=(param?:Partial<Spectaculars>)=>{
    const client=useHttp()

    return useQuery<Spectaculars[]>(['kanbans',cleanObject(param)],()=>client('kanbans',{data:param}))
}