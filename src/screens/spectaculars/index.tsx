import React from "react";
import {useDocumentTitle} from "../../utils";
import {useSpectaculars} from "../../utils/spectaculars";
import { useProjectInUrl, useSpectacularsSearchParams} from "./util";
import { SpectacularsColumn } from "./spectaculars-column";
import styled from "@emotion/styled";
export const Spectaculars=()=>{
    // 设置标题
    useDocumentTitle('看板列表')
    // 通过url获取当前项目的属性，再在后面设置项目的名字
    const {data:currentProject} =useProjectInUrl()
    // 通过传入项目id获取当前项目的看板属性
    const {data:spectaculars}=useSpectaculars(useSpectacularsSearchParams())
    return <div>
        <h1>{currentProject?.name}看板</h1>
        <ContainerColumn>
        {
            spectaculars?.map((spectacularsItem)=><SpectacularsColumn spectacularsItem={spectacularsItem} key={spectacularsItem.id} />)
        }
        </ContainerColumn>
    </div>
}

const ContainerColumn = styled.div`
display:flex;
overflow: hidden;
margin-right:2rem;
`