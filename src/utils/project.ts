// import {useCallback, useEffect} from "react";
// import {cleanObject} from "./index";
// import {useAsync} from "./use-async";
import {QueryKey, useMutation, useQuery} from "react-query";

import {useHttp} from "./http";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";
import {cleanObject} from "./index";
import {Project} from "../types/project";


export  const useProjects= (param?: Partial<Project>)=>{
    const client=useHttp()

    return useQuery<Project[]>(['projects',cleanObject(param)],()=>client('projects',{data:param}))
}

export const useEditProject=(queryKey:QueryKey)=>{
    const client =useHttp()

    return useMutation((params:Partial<Project>)=>client(
        `projects/${params.id}`,
        {method:'PATCH',data:params}),
        useEditConfig(queryKey)
    )
}

export const useAddProject=(queryKey:QueryKey)=>{
    // const {run,...asyncResult}=useAsync()
    const client =useHttp()
    // const mutate=(params:Partial<Project>)=>{
    //     return run(client(`projects/${params.id}`,
    //         {
    //             data:params,
    //             method:'POST'
    //         }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
}

export const useProjectId=(id?:number)=>{
    const  client=useHttp()
    return useQuery<Project>(['project',{id}],()=>client(`projects/${id}`),{enabled:Boolean(id)})
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};