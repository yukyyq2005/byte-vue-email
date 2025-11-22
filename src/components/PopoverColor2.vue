<template>
    <PopoverPanel class="z-50 p-1 origin-top-right absolute rounded shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none mt-12 right-1 w-2/3">
        <div class="py-2 px-2 flex flex-wrap content content-around gap-2.5">
            <span @click="colorBtnClick(index)" v-for="(item,index) in colorArray" :title="item.title"
                :class="`hover:bg-${item.color}-200 hover:text-${item.color}-900 bg-${item.color}-100 text-${item.color}-800 text-xs font-medium inline-block items-center px-2 py-0.5 rounded cursor-pointer select-none truncate max-w-[14rem]`">
                {{ item.title }}
            </span>
        </div>
    </PopoverPanel>
</template>

<script setup>
import { PopoverPanel } from '@headlessui/vue';
const emit = defineEmits(['close', 'colorBtnClick']);

defineProps({
    colorArray:Array
})
function colorBtnClick(index){
    emit('colorBtnClick', index); 
}
// onMounted(()=>{
//     console.log('onMounted')
//     let div = document.querySelector(".email-body")
//     console.log(div)
//     if (div){
//       div.style.marginTop = '3.0rem'
//       div.style.marginRight = '0.3rem'
//       div.style.width = '67%'
//     }
//     document.addEventListener('click', handleClickOutside);
// })
</script>