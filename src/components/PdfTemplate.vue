<template>
    <br>
    <label for="PDF File Name" class="block text-sm font-medium text-gray-700">{{ pdfName }}</label>
    
    <Popover class="relative shadow-sm rounded-md mt-1" data-headlessui-state="">
        <PopoverButton @click="colorClick(1)" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex items-center focus:outline-none" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
        <!-- v-model="inputName" @input="updataInput($event)" -->
        <input v-model="stored.pdf_file_name" ref="pdfInput"  id="PDF File Name" name="PDF File Name" type="text" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md pr-8" value="{{Form Name}}{{Response Number}}.pdf {{Form Name}}">
        <PopoverColor @colorBtnClick="colorBtnClick" :colorArray="colorArray" />
    </Popover>
    
    <br>
    <label for="m0dvkwlx" class="block text-sm font-medium text-gray-700">{{pdfTemplate}}</label>

    <Popover class="relative mt-1">
        <PopoverButton @click="colorClick(2)" class="cursor-pointer absolute right-1 top-2 flex items-start focus:outline-none ml-4" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
        <textarea v-model="stored.pdf_template" ref="pdfTextarea" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
        <PopoverColor @colorBtnClick="colorBtnClick2" :colorArray="colorArray2" />
    </Popover>
</template>

<script setup>
import PopoverColor from './PopoverColor.vue';
import { useFormStore } from '@/stores/form';
import { fm_colors } from '@/assets/sharedConstants';
import { ref,watch,onMounted } from 'vue';
import { translateLocale } from '@/assets/language';
import { Popover, PopoverButton } from '@headlessui/vue';

const pdfInput = ref(null)
const pdfTextarea = ref(null)
const colorArray = ref([]);
const colorArray2 = ref([]);
const formStore = useFormStore();
const stored = formStore.serverData;

const pdfName = ref('')
const pdfTemplate = ref('')

function setLocalizing(){
    pdfName.value = translate('PDF File Name')
    pdfTemplate.value = translate('PDF Template')
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
onMounted(()=>{
    setLocalizing()
})

function colorClick(tag){
    let list = formStore.allFormList;
    let curClrArray = colorArray.value;
    if (tag == 1){
    }else{
        list = formStore.emailBodyFormList;
        curClrArray = colorArray2.value;
    }
    const colors = fm_colors;
    curClrArray.splice(0);
    for(var i=0; i<list.length; i++){
        const item = list[i];
        const curColor = colors[i%colors.length];
        curClrArray.push({color:curColor, title:item.title, id:item.id});
    }
}

function colorBtnClick(index){
    const title2 = colorArray.value[index]?.title
    if (title2){
        let insertValue = `{{${title2}}}`
        if (stored.pdf_file_name.slice(-1).trim() !== '') {//如果最后一个字符串不是空格
            insertValue = ' ' + insertValue
        }
        stored.pdf_file_name = stored.pdf_file_name + insertValue
    }
}
function colorBtnClick2(index){
    const title2 = colorArray2.value[index]?.title;
    if (title2){
        let insertValue = `{{${title2}}}`
        if (stored.pdf_template.slice(-1).trim() !== ''){//如果最后一个字符串是空格
            insertValue = ' ' + insertValue
        }
        stored.pdf_template = stored.pdf_template + insertValue
    }
}

</script>