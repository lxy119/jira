import { useEffect,useState } from "react"
export const isFalsy=(value:unknown)=>value===0?false:!value

//在一个函数里改变传入的对象本身是不好的
export const cleanObject=(object:Object)=>{
    //Object.assign({},object)
    const result={...object}
    Object.keys(result).forEach(
        key=>{
            //@ts-ignore
            const value=result[key]
            if(isFalsy(value)){
                //@ts-ignore
                delete result[key]
            }
        })
        return result
} 
 // eslint-disable-next-line
export const useMount=(callback:()=>void)=>{
useEffect(() => {
   callback()
},[])
}
export const useDebounce=<V>(value:V,delay?:number)=>{
    const [debounceValue,setDebounceValue]=useState(value)
    useEffect(()=>{
        //每次在value或delay变化以后设置一个定时器
        const timeout=setTimeout(()=>{setDebounceValue(value)},delay)
        //每次在上一个useEffect处理完以后再运行
        return ()=>{clearTimeout(timeout)}
    },[value,delay])
    return debounceValue
}