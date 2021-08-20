import React from "react";
import {Form, Input} from "antd";
import {useAuth} from ".././context/auth-context";
import {LongButton} from "./index";

export const Login=()=>{

    const {login}=useAuth()

    const handleSubmit=(values:{username:string,password:string})=>{
        login(values)
    }

    return (<Form onFinish={handleSubmit}>
        <Form.Item label={'账号'} name={'username'} rules={[{required:true,message: 'Please input your username!' }]}>
            <Input type="text" id={'username'} placeholder={'账号'}/>
        </Form.Item>
        <Form.Item label={'密码:'} name={'password'} rules={[{required:true,message: 'Please input your password!' }]}>
            <Input type="text" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item>
            <LongButton type={'primary'} htmlType={'submit'}>登录</LongButton>
        </Form.Item>
    </Form>)
}
