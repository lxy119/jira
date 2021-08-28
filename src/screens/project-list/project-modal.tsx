import {Button, Drawer} from "antd";
import React from "react";
import {useProjectModal} from "../../utils";

export const ProjectModal=()=>{
    const {projectModalOpen,close}=useProjectModal()
    return <Drawer width={'100%'} visible={projectModalOpen} onClose={close}>
        <h1>ProjectModal</h1>
        <Button onClick={close}>關閉</Button>
    </Drawer>
}