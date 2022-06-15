class ReactiveEffect{
    private readonly _fn;

    constructor(fn){
        this._fn = fn;
    }

    run(){
        activeEffect = this;
        this._fn();
    }
}

export function effect(fn) {
    const _effect = new ReactiveEffect(fn);

    _effect.run();
}

const targetMap = new Map();
let activeEffect;

// 收集依赖
export function track(target,key){
    let depsMap = targetMap.get(target);

    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key,dep)
    }

    dep.add(activeEffect);
}


export function trigger(target,key){
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);

    for (const effect of deps) {
        effect.run();
    }
}
