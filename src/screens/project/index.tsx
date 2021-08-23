import React from 'react'
import {Routes,Route,Navigate} from "react-router";
import {Link} from "react-router-dom";
import {TaskGroup} from "../task-group";
import {Spectaculars} from "../spectaculars";


export const ProjectScreen=()=>{
    console.log(window.location)
    return <div>
        <Link to={'spectaculars'}>看板</Link>
        <Link to={'taskGroup'}>任务组</Link>
        <Routes>
            <Route path={'/spectaculars'} element={<Spectaculars/>}/>
            <Route path={'/taskGroup'} element={<TaskGroup/>}/>
        <Navigate to={window.location.pathname+'/spectaculars'}/>
        </Routes>
    </div>
}