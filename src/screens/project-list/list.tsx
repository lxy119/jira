import React from 'react'
//react-router 和react-router-dom的关系，类似于react和react-dom/react-native/react-vr
import {Link} from "react-router-dom";
import {Table, TableProps} from "antd";
import dayjs from "dayjs";


import { User } from './search-panel'

export interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
    created:number
}

interface ListProps extends TableProps<Project>{
    users:User[]
}

export const List=({users,...props}:ListProps)=>{

    const columns=[{
        title:'名称',
        sorter:(a:any,b:any)=>a.name.localeCompare(b.name),
        render(project: any) {
            return <Link to={String(project.id)}>{project.name}</Link>
        }
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
    return  <Table pagination={false} columns={columns}   rowKey={"id"} {...props}/>

}