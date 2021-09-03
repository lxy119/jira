import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import {Spectaculars} from "../../types/spectaculars";
import { useSpectacularsQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from "@emotion/styled";
import { Button, Card,Dropdown,Menu,Modal } from "antd";
import { CreateTask } from "./create-task";
import { useDeleteSpectaculars } from "utils/spectaculars";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { Task } from "types/task";
import { Mark } from "components/Mark";


export const SpectacularsColumn=React.forwardRef<
HTMLDivElement,
{ spectaculars: Spectaculars }
>(({ spectaculars, ...props }, ref)=>{
    
    // 获取对应项目id的所有任务
    const {data:allTasks} = useTasks(useTasksSearchParams())

    
    // 将所有任务属性分配到对应任务栏里面通过id值，将返回的数组渲染 
    const tasks=allTasks?.filter(task=>task.kanbanId===spectaculars.id)

    return <Container {...props} ref={ref}>
        <Row between={true}>
        <h3>{spectaculars?.name}</h3>
        <More spectaculars={spectaculars} key={spectaculars.id}/>
        </Row>
       
      <TasksContainer>
      <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(spectaculars.id)
          }>
          <DropChild style={{ minHeight: "1rem" }} >
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={"task" + task.id}
              >
                <div>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
       <CreateTask kanbanId={spectaculars.id}/>
      </TasksContainer>
    </Container>
})
// 任务属性Icon组件
const TaskTypeIcon=({id}:{id:number})=>{
    const {data:taskTypes} = useTaskTypes()
    const name=taskTypes?.find((taskType)=>taskType.id===id)?.name
    if(!name){
        return null
    }
    return <img src={name==='task'?taskIcon:bugIcon}  alt='icon'/>;
}


const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal();
    const { name: keyword } = useTasksSearchParams();
    return (
      <Card
        onClick={() => startEdit(task.id)}
        style={{ marginBottom: "0.5rem", cursor: "pointer" }}
        key={task.id}
      >
        <p>
          <Mark keyword={keyword} name={task.name} />
        </p>
        <TaskTypeIcon id={task.typeId} />
      </Card>
    );
  };
// 
const More = ({ spectaculars }: { spectaculars: Spectaculars }) => {
    const { mutateAsync } = useDeleteSpectaculars(useSpectacularsQueryKey());
    const startDelete = () => {
      Modal.confirm({
        okText: "确定",
        cancelText: "取消",
        title: "确定删除看板吗",
        onOk() {
          return mutateAsync({ id: spectaculars.id });
        },
      });
    };
    const overlay = (
        <Menu>
          <Menu.Item key={'delete'}>
            <Button type={"link"} onClick={startDelete}>
              删除
            </Button>
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={overlay}>
          <Button type={"link"}>...</Button>
        </Dropdown>
      );
}







//设置看板任务栏容器
 export const Container =styled.div`
min-width: 18rem;
border-radius: 6px;
background-color: rgb(176,196,222);
display: flex;
flex-direction: column;
padding: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`
const TasksContainer=styled.div`
overflow: scroll;
flex: 1;//等于flex:1 1 0%

::-webkit-scrollbar{
    display: none;
}//内容超出会出现滚动条，没有超出不显示滚动条
`


