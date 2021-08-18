import React, { FormEvent } from "react";
import {useAuth} from "../context/auth-context";

export const Register=()=>{

    const {user,register}=useAuth()

    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const username=(event.currentTarget.elements[0] as HTMLInputElement).value
        const password=(event.currentTarget.elements[1] as HTMLInputElement).value
        register({username,password})
    }

    return <form onSubmit={handleSubmit}>

        <label htmlFor="username">用户名:</label>
        <input type="text" name='username' id='username'/>
        <label htmlFor="password">密码:</label>
        <input type="password" name='password' id='password'/>
        <button type='submit'>注册</button>
    </form>
}
