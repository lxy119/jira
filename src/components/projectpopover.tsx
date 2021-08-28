import React from "react";
import { Divider, List, Popover, Typography} from "antd";
import {useProject} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from "./lib";
import {useProjectModal} from "../utils";
// import {ButtonNoPadding} from "./lib";


export const ProjectPopover=()=>{
    const {data:projects}=useProject()
    const {open}=useProjectModal()

    const content=<ContentContainer>
        <Typography.Text type={"secondary"}>收藏項目</Typography.Text>
        <List>
            {projects?.map(project=><List.Item key={project.id}>
                <List.Item.Meta title={project.name} />
            </List.Item>)}
            <Divider/>
            <ButtonNoPadding onClick={open} type={"link"}>
                创建项目
            </ButtonNoPadding>
        </List>
    </ContentContainer>
    return <Popover content={content} placement={"bottom"}>
        <span>項目</span>
    </Popover>
}
const ContentContainer=styled.div`
min-width:30rem;
`