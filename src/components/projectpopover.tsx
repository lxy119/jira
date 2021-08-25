import React from "react";
import { Divider, List, Popover, Typography} from "antd";
import {useProject} from "../utils/project";
import styled from "@emotion/styled";
// import {ButtonNoPadding} from "./lib";


export const ProjectPopover=(props:{projectButton:JSX.Element})=>{
    const {data:projects}=useProject()

    const content=<ContentContainer>
        <Typography.Text type={"secondary"}>收藏項目</Typography.Text>
        <List>
            {projects?.map(project=><List.Item key={project.id}>
                <List.Item.Meta title={project.name} />
            </List.Item>)}
            <Divider/>
            {props.projectButton}
        </List>
    </ContentContainer>
    return <Popover content={content} placement={"bottom"}>
        <span>項目</span>
    </Popover>
}
const ContentContainer=styled.div`
min-width:30rem;
`