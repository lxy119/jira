import React from 'react'
import {Form, Input} from "antd";
import {Project} from "./list";
import { UserSelect } from 'components/user-select';

export interface User{
    id:number
    name:string
    email:string
    title:string
    organization:string
    token:string
}
interface SearchPanelProps{
    users:User[]
    param:Partial<Pick<Project, 'name'|'personId'>>
    setParam:(param:SearchPanelProps['param'])=>void
}

export const SearchPanel=({param,users,setParam}:SearchPanelProps)=>{

    return (<Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            <Input
                placeholder={'项目名'}
            type="text"
            value={param.name}
            onChange={event=>setParam({...param,name:event.target.value})}
            />
        </Form.Item>
        <Form.Item>
            <UserSelect 
            value={param.personId} 
            defaultOptionName={'負責人'}
            onChange={value=>setParam({...param,personId:value})}/>
        </Form.Item>
    </Form>)
}