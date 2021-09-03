import React from 'react'
//react-router 和react-router-dom的关系，类似于react和react-dom/react-native/react-vr
import {Link} from "react-router-dom";
import {Dropdown, Menu, Modal, Table, TableProps} from "antd";
import dayjs from "dayjs";


import {Pin} from "../../components/pin";
import {useDeleteProject, useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";
import {useProjectModal, useProjectsQueryKey} from "./util";
import {Project} from "../../types/project";
import {User} from "../../types/user";

interface ListProps extends TableProps<Project>{
    users:User[]
}

export const List=({users,...props}:ListProps)=>{

    const {mutate}=useEditProject(useProjectsQueryKey())
    const columns=[{
        title: <Pin checked={true} disabled={true}/>,
        key:'pin',
        render(project: Project){
            return <Pin checked={project.pin}
                        onCheckedChange={(pin) => mutate({id: project.id,pin})}/>
        }
    },
    {
        title:'名称',
        key:'name',
        sorter:(a:any,b:any)=>a.name.localeCompare(b.name),
        render(project: any) {
            return <Link to={String(project.id)} key={project.id}>{project.name}</Link>
        }
    },{
        title: '部门',
        dataIndex: 'organization',
    },{
        title:'负责人',
            key:'person',
        render(project:Project){
            return <span key={project.id}>
                {users.find((user:User)=>project.personId===user.id)?.name||'未知'}
            </span>
        }
    },{
        title: '创建时间',
            key: 'time',
        render(project:Project){
            return <span key={project.id}>
                {project.created? dayjs(project.created).format('YYYY-MM-DD'):'无'}
            </span>
        }
    },{
        key: 'edit',
        render(project:Project) {
            return <More project={project} key={project.id}/>;
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