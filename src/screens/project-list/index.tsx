import React from 'react'
import { useState } from "react"
import {Typography} from "antd";

import { SearchPanel } from "./search-panel"
import {List} from "./list"
import {useDebounce, useDocumentTitle} from '../../utils'
// import * as qs from 'qs'
import styled from "@emotion/styled";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/user";
// import {Helmet} from "react-helmet";

// const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    const [param,setParam]=useState({
        name:'',
        personId:''
    })

    const debounceParam=useDebounce(param,200)
    const {isLoading,error,data:list}=useProject(debounceParam)
    const  {data:users}=useUsers()
    useDocumentTitle('项目管理列表',false)
    return <Container>
        {/*<Helmet>*/}
        {/*    <title>项目列表</title>*/}
        {/*</Helmet>*/}
        <h1>项目列表</h1>
    <SearchPanel param={param} users={users||[]} setParam={setParam}/>
        { error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
    <List dataSource={list||[]} users={users||[]} loading={isLoading}/>
    </Container>
}
const Container=styled.div`
padding: 3.2rem;
`
