

export function initMixin(Vue){
    Vue.prototype._init=function(options){
        console.log('%cindex.js line:7 options', 'color: #007acc;', options);
    }
}
