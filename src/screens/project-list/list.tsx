import React from 'react'
//react-router 和react-router-dom的关系，类似于react和react-dom/react-native/react-vr
import {Link} from "react-router-dom";
import {Dropdown, Menu, Table, TableProps} from "antd";
import dayjs from "dayjs";


import { User } from './search-panel'
import {Pin} from "../../components/pin";
import {useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";

export interface Project{
    id:string
    name:string
    personId:number
    pin:boolean
    organization:string
    created:number
}

interface ListProps extends TableProps<Project>{
    users:User[]
    refresh?:()=>void
  projectButton:JSX.Element
}

export const List=({users,...props}:ListProps)=>{

    const {mutate}=useEditProject()
    const columns=[{
        title: <Pin checked={true} disabled={true}/>,
        render(project: any){
            return <Pin checked={project.pin}
                        onCheckedChange={(pin) => mutate({id: project.id,pin}).then(props.refresh)}/>
        }
    },
    {
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
        render(project:Project){
            return <span>
                {users.find((user:User)=>project.personId===user.id)?.name||'未知'}
            </span>
        }
    },{
        title: '创建时间',
        render(project:Project){
            return <span>
                {project.created? dayjs(project.created).format('YYYY-MM-DD'):'无'}
            </span>
        }
    },{
        render() {
            return <Dropdown overlay={<Menu>
                <Menu.Item key={'edit'}>
                    {props.projectButton}
                </Menu.Item>
            </Menu>}>
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
            </Dropdown>
        }
        }
    ]
    return  <Table pagination={false} columns={columns}   rowKey={"id"} {...props}/>

}