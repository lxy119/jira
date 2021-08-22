import { useEffect,useState } from "react"
// export const isFalsy=(value:unknown)=>value===0?false:!value

export const isVoid=(value:unknown)=>value===undefined||value===null||value===''
//在一个函数里改变传入的对象本身是不好的
export const cleanObject=(object: { [key:string]:unknown })=>{
    //Object.assign({},object)
    const result={...object}
    Object.keys(result).forEach(
        key=>{
            const value=result[key]
            if(isVoid(value)){
                delete result[key]
            }
        })
        return result
} 
 // eslint-disable-next-line
export const useMount=(callback:()=>void)=>{
useEffect(() => {
   // TODO 依赖项里面加上callback会造成无限循环，这个和useCallback以及useMemo有关系
   callback()
//    eslint-disable-next-line react-hooks/exhaustive-deps
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

export const  useDocumentTitle=(title:string,keepUnmount:boolean=true)=>{
    const preTitle=document.title
    useEffect(()=>{
        document.title=title
    },[title])

    useEffect(()=>{
        return ()=>{
            if (!keepUnmount){
                document.title=preTitle
            }
        }
    },[])
}