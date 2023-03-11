import babel from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"
export default{
    input:'./src/index.js', //打包入口文件
    output:{
        file:'dist/vue.js', //打包出口
        format:"umd", //将window上挂载Vue 可食用 new Vue（）
        name:"Vue",//和umd配套使用
        sourcemap:true //是否生成映射
    },
    Plugins:[
        babel({
            exclude:'node_modules/**'
        }), //降级--排依赖
        serve({
            port:3000,
            contentBase:'', //当前目录（基础）
            openPage:'/index.html'
        })
    ]
}