import React from 'react'
import { useState,useEffect } from "react"

import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject,useMount,useDebounce } from '../../utils'
import * as qs from 'qs'
import {useHttp} from "../../utils/http";

const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const debounceParam=useDebounce(param,200)
    const [users,setUsers]=useState([])
    const [list,setList]=useState([])
    const client=useHttp()
    useEffect(()=>{
        client("projects",{data:cleanObject(debounceParam)})
            .then(setList)

    },[debounceParam])
    useMount(()=>{
        client('users').then(setUsers)

    })
    return <>
    <SearchPanel param={param} users={users} setParam={setParam}/>
    <List list={list} users={users}/>
    </>
}