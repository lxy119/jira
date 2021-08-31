import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import {Spectaculars} from "../../types/spectaculars";
import { useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from "@emotion/styled";
import { Card } from "antd";

export const SpectacularsColumn=({spectacularsItem}:{spectacularsItem: Spectaculars})=>{
    
    // 获取对应项目id的所有任务属性
    const {data:allTasks} = useTasks(useTasksSearchParams())

    
    // 将所有任务属性分配到对应任务栏里面通过id值，将返回的数组渲染 
    const tasks=allTasks?.filter(task=>task.kanbanId===spectacularsItem.id)

    return <Container>
        <h3>{spectacularsItem?.name}</h3>
      <TaskContainer>
      {
           tasks?.map(task=><Card style={{marginBottom:'0.5rem',}} key={task.id}>
               <div>{task.name}</div>
           <TaskTypeIcon id={task.typeId}/>
           </Card>)
       }
      </TaskContainer>
    </Container>
}
// 任务属性Icon组件
const TaskTypeIcon=({id}:{id:number})=>{
    const {data:taskTypes} = useTaskTypes()
    const name=taskTypes?.find((taskType)=>taskType.id===id)?.name
    if(!name){
        return null
    }
    return <img src={name==='task'?taskIcon:bugIcon}  alt='icon'/>;
}
//设置看板任务栏容器
const Container =styled.div`
min-width: 27rem;
border-radius: 6px;
background-color: rgb(176,196,222);
display: flex;
flex-direction: column;
padding: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`
const TaskContainer=styled.div`
overflow: scroll;
flex: 1;//等于flex:1 1 0%

::-webkit-scrollbar{
    display: none;
}//内容超出会出现滚动条，没有超出不显示滚动条
`