import React from "react";
import {useAuth} from "../context/auth-context";
import { Form, Input} from "antd";
import {LongButton} from "./index";
import {useAsync} from "../utils/use-async";

export const Register=({onError}:{onError:(error:Error)=>void})=>{

    const {register}=useAuth()
    const {run,isLoading}=useAsync(undefined,{throwOnError: true})

    const handleSubmit=async ({c_password,...values}: {username:string,password:string,c_password:string})=>{
        if (c_password!==values.password){
            onError(new Error('两次输入密码不一致，请重新输入！'))
            return
        }
        try {
            await run(register(values))
       }catch (e) {
            onError(e)
       }
    }

    return  (<Form onFinish={handleSubmit}>
        <Form.Item  name={'username'} rules={[{required:true,message: 'Please input your username!' }]}>
            <Input type="text" id={'username'} placeholder={'账号'}/>
        </Form.Item>
        <Form.Item  name={'password'} rules={[{required:true,message: 'Please input your password!' }]}>
            <Input  type="password" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item  name={'c_password'} rules={[{required:true,message: 'Please confirm your password!' }]}>
            <Input  type="password" id={'c_password'} placeholder={'确认密码'}/>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>注册</LongButton>
        </Form.Item>
    </Form>)
}
