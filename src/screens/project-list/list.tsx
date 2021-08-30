import React from 'react'
//react-router 和react-router-dom的关系，类似于react和react-dom/react-native/react-vr
import {Link} from "react-router-dom";
import {Dropdown, Menu, Modal, Table, TableProps} from "antd";
import dayjs from "dayjs";


import { User } from './search-panel'
import {Pin} from "../../components/pin";
import {useDeleteProject, useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";
import {useProjectModal, useProjectsQueryKey} from "./util";

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
}

export const List=({users,...props}:ListProps)=>{

    const {mutate}=useEditProject(useProjectsQueryKey())
    const columns=[{
        title: <Pin checked={true} disabled={true}/>,
        render(project: Project){
            return <Pin checked={project.pin}
                        onCheckedChange={(pin) => mutate({id: project.id,pin})}/>
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
        render(project:Project) {
            return <More project={project} />;
        }
        }
    ]
    return  <Table pagination={false} columns={columns}   rowKey={"id"} {...props}/>

}

const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal();
    const editProject = (id: number) => () => startEdit(id);
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: "确定删除这个项目吗?",
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteProject({id});
            },
        })
    }
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item onClick={editProject(Number(project.id))} key={"edit"}>
                        编辑
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => confirmDeleteProject(Number(project.id))}
                        key={"delete"}
                    >
                        删除
                    </Menu.Item>
                </Menu>
            }
        >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
        </Dropdown>
    );
}