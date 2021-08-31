import React, {ReactNode} from "react";
import * as auth from '../auth-provider'
import {http} from "../utils/http";
import {useMount} from "../utils";
import {useAsync} from "../utils/use-async";
import {FullPageErrorFallback, FullPageLoading} from "../components/lib";
import {useQueryClient} from "react-query";
import {User} from "../types/user";

interface AuthForm {
    username:string
    password:string
}

const bootstrapUser=async ()=>{
    let user=null
    const token=auth.getToken()
    if (token){
        const data =await http('me',{token})
        user=data.user
    }
    return user
}
const AuthContext=React.createContext<{
    user:User|null
    register:(form:AuthForm)=>Promise<void>
    login:(form:AuthForm)=>Promise<void>
    logout:()=>Promise<void>
}|undefined>(undefined)
AuthContext.displayName='AuthContext'
//point free
export const AuthProvider=({children}:{children:ReactNode})=>{
    const {data:user,error,isLoading,isError,isIdle,run,setData:setUser}=useAsync<User|null>()
   const queryClient =useQueryClient()
    const login=(form:AuthForm)=>auth.login(form).then(setUser)
    const register=(form:AuthForm)=>auth.register(form).then(setUser)
    const logout=()=>auth.logout().then(()=> {
        setUser(null)
        queryClient.clear()
    })
    useMount(()=>{
        run(bootstrapUser())
    })
    if (isIdle||isLoading){
        return <FullPageLoading/>
    }
    if (isError){
        return <FullPageErrorFallback error={error}/>
    }
    return <AuthContext.Provider children={children} value={{user,login,logout,register}}/>
}

export const useAuth=()=>{
    const context=React.useContext(AuthContext)
    if (!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}