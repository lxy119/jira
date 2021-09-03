import React from 'react'
// import {Typography} from "antd";

import { SearchPanel } from "./search-panel"
import {List} from "./list"
import {useDebounce, useDocumentTitle} from '../../utils'
// import * as qs from 'qs'
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useProjectModal, useProjectSearchParams} from './util';
import {ButtonNoPadding, ErrorBox, Row, ScreenContainer} from "../../components/lib";
// import {Helmet} from "react-helmet";

// const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{

    //基本类型可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
    // const [keys]=useState<('name'|'personId')[]>(['name','personId'])
    const [param,setParam]=useProjectSearchParams()
    const {isLoading,error,data:list}=useProjects(useDebounce(param, 200))
    const  {data:users}=useUsers()
    const {open}=useProjectModal()

    useDocumentTitle('项目管理列表',false)
    return <ScreenContainer >

        {/*<Helmet>*/}
        {/*    <title>项目列表</title>*/}
        {/*</Helmet>*/}
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding type={"link"} onClick={open}>创建项目</ButtonNoPadding>
        </Row>
    <SearchPanel param={param} users={users||[]} setParam={setParam}/>
    <ErrorBox error={error}/>
    <List  dataSource={list||[]} users={users||[]} loading={isLoading} />
    </ScreenContainer>
}

ProjectListScreen.whyDidyouRender=false

// class Test extends React.Component<any, any>{
//     static whyDidYouRender=true
// }
const Container=styled.div`
padding: 3.2rem;
`
