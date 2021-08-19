import React from 'react'
import { User } from './search-panel'
import {Table} from "antd";

interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
}

interface ListProps{
    list:Project[]
    users:User[]
}

export const List=({list,users}:ListProps)=>{

    const columns=[{
        title:'名称',
        dataIndex:'name',
        sorter:(a:any,b:any)=>a.name.localeCompare(b.name)
    },{
        title:'负责人',
        render(project:any){
            return <span >
                {users.find((user:User)=>project.personId===user.id)?.name||'未知'}
            </span>
        }
    }
    ]
    return  <Table pagination={false} columns={columns} dataSource={list} />

}