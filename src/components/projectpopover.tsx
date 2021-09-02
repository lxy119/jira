import React from "react";
import { Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {useProjectModal} from "../screens/project-list/util";
// import {ButtonNoPadding} from "./lib";


export const ProjectPopover=()=>{
    const {data:projects,refetch}=useProjects()
    const {open}=useProjectModal()
    const pinnedProjects = projects?.filter((project) => project.pin);

    const content=<ContentContainer>
        <Typography.Text type={"secondary"}>收藏項目</Typography.Text>
        <List>
            {pinnedProjects?.map(project=><List.Item key={project.id}>
                <List.Item.Meta title={project.name} />
            </List.Item>)}
            <Divider/>
            <ButtonNoPadding onClick={open} type={"link"}>
                创建项目
            </ButtonNoPadding>
        </List>
    </ContentContainer>
    return <Popover onVisibleChange={()=>refetch()} content={content} placement={"bottom"}>
        <span>項目</span>
    </Popover>
}
const ContentContainer=styled.div`
min-width:30rem;
`