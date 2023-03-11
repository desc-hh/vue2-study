export function observe(data){

    //1.判断
    if(typeof data!='object'||data==null){
        return data
    }
    // 对象
    return new Observe(data)

}
class Observe{
    constructor(value){
        this.walk(value) //便利
    }
    walk(data){
        let keys=Object.keys(data)
        for(let i=0;i<keys.length;i++){
            //对每个属性进行劫持
            let key=keys[i]
            let value=data[key]
            definRtactive(data,key,value)
        }
    }
}
//对data里的属性进行劫持
function definRtactive(data,key,value) {
    observe(value) //递归深度劫持
    Object.defineProperty(data,key,{
        get(){
            console.log('%cindex.js line:29 获取', 'color: #007acc;');
            return value
        },
        set(newValue){
            console.log('%cindex.js line:33 修改', 'color: #007acc;');
            if(newValue==value)return value
            observe(newValue) //深度劫持,将修改过的数据再次进行劫持
            value=newValue
        }
    })
}