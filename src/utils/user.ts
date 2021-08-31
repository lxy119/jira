import {cleanObject, useMount} from "./index";
import {useAsync} from "./use-async";
import {useHttp} from "./http";
import {User} from "../types/user";


export  const useUsers=(param?:Partial<User>)=>{
    const client=useHttp()
    const {run,...result}=useAsync<User[]>()
    useMount(()=>{
         run(client("users",{data:cleanObject(param||{})}))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    })
    return result
}