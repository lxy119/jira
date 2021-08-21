import React from 'react'
import { useState } from "react"
import {Typography} from "antd";

import { SearchPanel } from "./search-panel"
import {List} from "./list"
import { useDebounce } from '../../utils'
// import * as qs from 'qs'
import styled from "@emotion/styled";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/user";

// const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    const [param,setParam]=useState({
        name:'',
        personId:''
    })

    const debounceParam=useDebounce(param,200)
    const {isLoading,error,data:list}=useProject(debounceParam)
    const  {data:users}=useUsers()

    return <Container>
        <h1>项目列表</h1>
    <SearchPanel param={param} users={users||[]} setParam={setParam}/>
        { error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
    <List dataSource={list||[]} users={users||[]} loading={isLoading}/>
    </Container>
}
const Container=styled.div`
padding: 3.2rem;
`
