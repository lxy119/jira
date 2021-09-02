import React, {  useCallback } from "react";
import {useDocumentTitle} from "../../utils";
import {useReorderSpectaculars, useSpectaculars} from "../../utils/spectaculars";
import { useProjectInUrl, useSpectacularsQueryKey, useSpectacularsSearchParams, useTasksQueryKey, useTasksSearchParams} from "./util";
import { SpectacularsColumn } from "./spectaculars-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useReorderTask, useTasks } from "utils/task";
import { ScreenContainer } from "components/lib";
import { Spin } from "antd";
import { CreateKanban } from "./create-spectaculars";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { Profiler } from "components/profiler";

export const Spectaculars=()=>{
    // 设置标题
    useDocumentTitle('看板列表')
    // 通过url获取当前项目的属性，再在后面设置项目的名字
    const {data:currentProject} =useProjectInUrl()
    // 通过传入项目id获取当前项目的看板属性
    const {data:spectaculars,isLoading:spectacularsIsLoading}=useSpectaculars(useSpectacularsSearchParams())
    const {isLoading:taskIsLoading}=useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading||spectacularsIsLoading
    const onDragEnd = useDragEnd();

    return <Profiler id={'看板页面'}>
        <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
          <h1>{currentProject?.name}看板</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnsContainer>
              <Drop
                type={"COLUMN"}
                direction={"horizontal"}
                droppableId={"kanban"}
              >
                <DropChild style={{ display: "flex" }}>
                  {spectaculars?.map((spectacularsItem, index) => (
                    <Drag
                      key={spectacularsItem.id}
                      draggableId={"kanban" + spectacularsItem.id}
                      index={index}
                    >
                      <SpectacularsColumn spectaculars={spectacularsItem} key={spectacularsItem.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
          <TaskModal />
        </ScreenContainer>
    </DragDropContext>
    </Profiler>
    }

export const useDragEnd = () => {
  const { data: spectaculars } = useSpectaculars(useSpectacularsSearchParams());
  const { mutate: reorderKanban } = useReorderSpectaculars(useSpectacularsQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = spectaculars?.[source.index].id;
        const toId = spectaculars?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if(fromKanbanId===toKanbanId){
          return
        }
        const fromTask = allTasks.filter((task) => task.kanbanId === fromKanbanId)[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id, 
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [spectaculars, reorderKanban, allTasks, reorderTask]
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
