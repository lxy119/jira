import React from 'react'
import { useState,useEffect } from "react"

import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject,useMount,useDebounce } from '../../utils'
// import * as qs from 'qs'
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {Typography} from "antd";

// const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const debounceParam=useDebounce(param,200)
    const [isLoading,setIsLoading]=useState(true)
    const [users,setUsers]=useState([])
    const [list,setList]=useState([])
    const [error,setError]=useState<null|Error>(null)
    const client=useHttp()
    useEffect(()=>{
        setIsLoading(true)
        client("projects",{data:cleanObject(debounceParam)})
            .then(setList)
            .catch((error)=> {
                setError(error)
                setList([])
            })
            .finally(()=>setIsLoading(false))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    },[debounceParam])
    useMount(()=>{
        client('users').then(setUsers)

    })
    return <Container>
        <h1>项目列表</h1>
    <SearchPanel param={param} users={users} setParam={setParam}/>
        { error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
    <List dataSource={list} users={users} loading={isLoading}/>
    </Container>
}
const Container=styled.div`
padding: 3.2rem;
`
