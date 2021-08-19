import React from "react";
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import {LongButton} from "./index";

export const Register=()=>{

    const {register}=useAuth()

    const handleSubmit=(values: {username:string,password:string})=>{
        register(values)
    }

    return  (<Form onFinish={handleSubmit}>
        <Form.Item  name={'username'} rules={[{required:true,message: 'Please input your username!' }]}>
            <Input type="text" id={'username'} placeholder={'账号'}/>
        </Form.Item>
        <Form.Item  name={'password'} rules={[{required:true,message: 'Please input your password!' }]}>
            <Input  type="text" id={'password'} placeholder={'密码'}/>
        </Form.Item>
        <Form.Item>
            <LongButton type={'primary'} htmlType={'submit'}>注册</LongButton>
        </Form.Item>
    </Form>)
}