import React from "react";
import {Form, Input} from "antd";
import {useAuth} from "context/auth-context";
import {LongButton} from "./index";
import {useAsync} from "../utils/use-async";

export const Login=({onError}:{onError:(error:Error)=>void})=>{

    const {login}=useAuth()
    const {run,isLoading}=useAsync(undefined,{throwOnError: true})
    const handleSubmit=async (values:{username:string,password:string})=>{
        try {
         await run(login(values))
        }catch (e) {
          onError(e)
        }
    }

    return (<Form onFinish={handleSubmit}>
        <Form.Item label={'账号'} name={'username'} rules={[{required:true,message: 'Please input your username!' }]}>
            <Input type="text" id={'username'} placeholder={'账号'}/>
        </Form.Item>
        <Form.Item label={'密码:'} name={'password'} rules={[{required:true,message: 'Please input your password!' }]}>
            <Input type="password" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item>
            <LongButton type={'primary'} htmlType={'submit'} loading={isLoading}>登录</LongButton>
        </Form.Item>
    </Form>)
}
