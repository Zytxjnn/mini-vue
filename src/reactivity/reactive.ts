import {track, trigger} from "./effect";

export function reactive(obj) {
    return new Proxy(obj,{
        get(target: any, key: string | symbol, receiver: any): any{
            // 依赖收集
            track(target,key)
            return Reflect.get(target,key);
        },
        set(target: any, key: string | symbol, value: any, receiver: any): boolean {
            // 触发依赖
           const res = Reflect.set(target,key,value)
            trigger(target,key)
            return res
        }
    })
}