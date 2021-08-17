import React from 'react'
import { useState,useEffect } from "react"

import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject,useMount,useDebounce } from '../../utils'
import * as qs from 'qs'

const baseUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    const [param,setParam]=useState({
        name:'',
        personId:''
    })
    const debounceParam=useDebounce(param,200)
    const [users,setUsers]=useState([])
    const [list,setList]=useState([])

    useEffect(()=>{
        fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[debounceParam])
    useMount(()=>{
        fetch(`${baseUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })
    return <>
    <SearchPanel param={param} users={users} setParam={setParam}/>
    <List list={list} users={users}/>
    </>
}