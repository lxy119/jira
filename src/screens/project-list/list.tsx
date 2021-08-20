import React from 'react'
import { User } from './search-panel'
import {Table} from "antd";
import dayjs from "dayjs";

interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
    created:number
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
        title: '部门',
        dataIndex: 'organization',
    },{
        title:'负责人',
        render(project:any){
            return <span >
                {users.find((user:User)=>project.personId===user.id)?.name||'未知'}
            </span>
        }
    },{
        title: '创建时间',
        render(project:any){
            return <span>
                {project.created? dayjs(project.created).format('YYYY-MM-DD'):'无'}
            </span>
        }
    }
    ]
    return  <Table pagination={false} columns={columns} dataSource={list} />

}