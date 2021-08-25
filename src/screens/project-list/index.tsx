import React from 'react'
import {Button, Typography} from "antd";

import { SearchPanel } from "./search-panel"
import {List} from "./list"
import {useDebounce, useDocumentTitle} from '../../utils'
// import * as qs from 'qs'
import styled from "@emotion/styled";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/user";
import { useProjectSearchParams } from './util';
import {Row} from "../../components/lib";
// import {Helmet} from "react-helmet";

// const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=(props:{setProjectModalOpen:(isOpen:boolean)=>void})=>{

    //基本类型可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
    // const [keys]=useState<('name'|'personId')[]>(['name','personId'])
    const [param,setParam]=useProjectSearchParams()
    const {isLoading,error,data:list,retry}=useProject(useDebounce(param,200))
    const  {data:users}=useUsers()
    useDocumentTitle('项目管理列表',false)
    return <Container >

        {/*<Helmet>*/}
        {/*    <title>项目列表</title>*/}
        {/*</Helmet>*/}
        <Row between={true}>
            <h1>项目列表</h1>
            <Button onClick={()=>props.setProjectModalOpen(true)}>創建項目</Button>
        </Row>
    <SearchPanel param={param} users={users||[]} setParam={setParam}/>
        { error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
    <List refresh={retry} dataSource={list||[]} users={users||[]} loading={isLoading} setProjectModalOpen={props.setProjectModalOpen}/>
    </Container>
}

ProjectListScreen.whyDidyouRender=false

// class Test extends React.Component<any, any>{
//     static whyDidYouRender=true
// }
const Container=styled.div`
padding: 3.2rem;
`
