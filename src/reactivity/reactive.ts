import {track, trigger} from "./effect";

export function reactive(obj){
    return new Proxy(obj,{
        get(target: any, key: string | symbol): any {
            const res = Reflect.get(target,key);

            // TODO 依赖收集
            track(target,key)
            return res;
        },
        set(target: any, key: string | symbol, value: any): boolean {
            const res = Reflect.set(target,key,value);
            // TODO 依赖触发
            trigger(target,key)
            return res;
        }
    })
}
