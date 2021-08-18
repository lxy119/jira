import React, { FormEvent } from "react";
import {useAuth} from ".././context/auth-context";

export const Login=()=>{

    const {user,login}=useAuth()

    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const username=(event.currentTarget.elements[0] as HTMLInputElement).value
        const password=(event.currentTarget.elements[1] as HTMLInputElement).value
        login({username,password})
    }

    return <form onSubmit={handleSubmit}>
        {
            user?<div>登录成功，用户名:{user?.name}
                token:{user.token}
            </div>:null
        }
        <label htmlFor="username">用户名:</label>
        <input type="text" name='username' id='username'/>
        <label htmlFor="password">密码:</label>
        <input type="password" name='password' id='password'/>
        <button type='submit'>登录</button>
    </form>
}
