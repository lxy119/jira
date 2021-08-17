import React, { FormEvent } from "react";

const baseUrl=process.env.REACT_APP_API_URL
export const Login=()=>{

    const login=(param:{username:string,password:string})=>{
    fetch(`${baseUrl}/login`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(param)}).then(async response=>{
        if(response.ok){
            console.log(response);
        }
    })
    }

    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const username=(event.currentTarget.elements[0] as HTMLInputElement).value
    const password=(event.currentTarget.elements[1] as HTMLInputElement).value
    login({username,password})
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="username">用户名:</label>
        <input type="text" name='username' id='username'/>
        <label htmlFor="password">密码:</label>
        <input type="password" name='password' id='password'/>
        <button type='submit'>提交</button>
    </form>
}
