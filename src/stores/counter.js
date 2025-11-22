// 导入一个方法 defineStore
import { defineStore } from "pinia";
import { ref,computed } from "vue";
// import axios from "axios";

// 调用defineStore方法，传2个参数，第一个参数是一个独立无二的标识
// counter是一个store的独一无二的关键key
// useCounterStore也有规范，必须用use开头,后面是一个模块的名称
export const useCounterStore = defineStore('counter', () =>{
    // 定义数据
    const count = ref(0)
    // 定义修改数据的方法 (同步或异步都可以)
    
    const increment = () => {
        console.log('..increment...')
        count.value++
    }

    //同步
    // function increment(){
    //     count.value++
    // }
    // 异步
    const API_URL = 'http://geek.itheima.net/v1_0/channels'
    const list = ref([])
    const getList = async() => {
        // const res = await axios.get(API_URL)
        // // console.log(res.data.data.channels)
        // list.value = res.data.data.channels
    }

    // pinia中的getters直接使用computed函数进行模拟
    const doubleCount = computed(() => count.value * 2)
    // 以对象的方式返回，供组件使用
    return {count, doubleCount, increment, list, getList}
})