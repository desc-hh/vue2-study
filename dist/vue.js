(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observe(data){

        //1.判断
        if(typeof data!='object'||data==null){
            return data
        }
        // 对象
        return new Observe(data)

    }
    class Observe{
        constructor(value){
            this.walk(value); //便利
        }
        walk(data){
            let keys=Object.keys(data);
            for(let i=0;i<keys.length;i++){
                //对每个属性进行劫持
                let key=keys[i];
                let value=data[key];
                definRtactive(data,key,value);
            }
        }
    }
    //对data里的属性进行劫持
    function definRtactive(data,key,value) {
        observe(value); //递归深度劫持
        Object.defineProperty(data,key,{
            get(){
                console.log('%cindex.js line:29 获取', 'color: #007acc;');
                return value
            },
            set(newValue){
                console.log('%cindex.js line:33 修改', 'color: #007acc;');
                if(newValue==value)return value
                observe(newValue); //深度劫持,将修改过的数据再次进行劫持
                value=newValue;
            }
        });
    }

    function initState(vm){
        let opts=vm.$options;
        // console.log('%cinitState.js line:3 opts', 'color: #007acc;', opts);
        //对数据初始化处理
        if(opts.data){
            initData(vm);
        }


        function initData(vm){
            //判断data 是对象/函
            let data=vm.$options.data;
            data=vm._data=typeof data==='function'?data.call(vm):data; 
            //数据劫持 -- vue2数据响应式原理
            observe(data); //
            //data{} 对象   数组
        }
    }

    function initMixin(Vue){
        Vue.prototype._init=function(options){
            
            let vm=this;
            vm.$options=options;
            // 初始化状态
            initState(vm);
        };
    }

    function Vue(options){
        //初始化
        this._init(options);

    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
