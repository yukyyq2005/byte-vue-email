<template>

    <div class="rounded-lg bg-gray-50/50 shadow-sm ring-1 ring-gray-800/10 mb-8 p-4">
        <!-- IF start-->
        <div class="grid gap-x-2 grid-cols-8 mt-2" v-for="(element1) in ifArray" :key="element1.id">
            <div class="col-span-1"><div class="text-gray-700 font-semibold text-right mt-2 mr-2">{{condIf}}</div></div>
            <!-- selece field... -->
            <div class="col-span-2"><div class="flex justify-between items-end hidden"><label for="m0diwgvq" class="block text-sm font-medium text-gray-700"></label></div><div class="rounded-md shadow-sm">
                <select @change="handleNotifyChange(element1, 1, $event)" v-model="element1.selectedField" name="field" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in formStore.conditionFields" :key="index" :value="opt.id">{{ opt.title }}</option>
                </select>
            </div></div>
            <!-- select condition... -->
            <div class="col-span-2"><div class="flex justify-between items-end hidden"><label for="m0diwgvr" class="block text-sm font-medium text-gray-700"></label></div><div class="rounded-md shadow-sm">
                <select @change="handleNotifyChange(element1, 2, $event)" v-model="element1.selectedCondition" name="compare" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in element1.optionConditions" :key="index" :value="opt">{{ opt }}</option>
                </select>
            </div></div>
            <div class="col-span-3 flex">

                <select v-if="element1.isShowSelectValue" v-model="element1.selectedValue" ame="compare" class="yq-arrow mr-2 mb-0.5 block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in element1.optionValues" :key="index" :value="opt.id">{{ opt.title }}</option>
                </select>

                <Popover v-if="!element1.isShowSelectValue" class="relative mr-2 block w-full border border-gray-300 py-1 px-0 text-sm rounded-md bg-white px-2">
                    <PopoverButton v-if="element1.isShowMoreBtn" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex mt-2 h-5 focus:outline-none z-50" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                    <div :class="['flex flex-wrap gap-1 items-center', { 'mr-5': element1.isShowMoreBtn }]">
                        <div v-show="element1.isShowArray" class="overflow-hidden" v-for="(item,index) in element1.list" :key="index">
                            <ButtonClose :btnContent="item.title" @closeButtonAction="deleteBtnAction(index, element1.list)" />
                        </div>
                        <input :disabled="!element1.isRequired" :placeholder="element1.isRequired ? (element1.showPlaceholder ? 'Enter value' : '') : 'value is not required'" v-model="element1.input" @blur="addConditions($event, element1)" @keydown.enter="addConditions($event, element1)" type="text" class="flex-1" style="color: inherit; background: 0px center; opacity: 1; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 15px; border: 0px; margin: 0px; outline: 0px; padding: 5px;">
                    </div>
                    <PopoverColor @colorBtnClick="(index)=>colorBtnClick(index,element1)" :colorArray="element1.colorArray" />
                </Popover>
                <!-- <div v-if="isShowDeleteButton" class="col-span-1 flex gap-x-1 content-center mt-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-gray-300 hover:text-gray-500 transition duration-200 cursor-pointer"><title>Remove condition from rule</title><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></div> -->
            </div>
        </div>
        <!-- IF end-->

        <!-- OR AND start -->
        <div class="grid gap-x-2 grid-cols-8 mt-2" v-for="(element2,index) in orAndArray" :key="element2.id">
            <!-- select... -->
            <div class="col-span-1">
                <div class="rounded-md shadow-sm"><select @change="handleNotifyChange(element2, 0, $event)" v-model="element2.link" name="mode" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md"><option value="">{{ condSelect }}</option><option value="OR">{{condOr}}</option><option value="AND">{{condAnd}}</option></select></div>
            </div>
            <!-- select field... -->
            <div class="col-span-2"><div class="rounded-md shadow-sm">
                <select @change="handleNotifyChange(element2, 1, $event)" v-model="element2.selectedField" name="field" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in formStore.conditionFields" :key="index" :value="opt.id">{{ opt.title }}</option>
                </select>
            </div></div>
            <!-- select condition... -->
            <div class="col-span-2"><div class="rounded-md shadow-sm">
                <select @change="handleNotifyChange(element2, 2, $event)" v-model="element2.selectedCondition" name="compare" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in element2.optionConditions" :key="index" :value="opt">{{ opt }}</option>
                </select>
            </div></div>
            <div class="col-span-3 flex">
                <!-- select value -->
                <select v-if="element2.isShowSelectValue" v-model="element2.selectedValue" name="compare" class="yq-arrow mr-2 mb-0.5 block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                    <option v-for="(opt,index) in element2.optionValues" :key="index" :value="opt.id">{{ opt.title }}</option>
                </select>
                <!-- input -->
                <Popover v-if="!element2.isShowSelectValue" class="relative mr-2 block w-full border border-gray-300 py-1 px-0 text-sm rounded-md bg-white px-2">
                    <PopoverButton v-if="element2.isShowMoreBtn" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex mt-2 h-5 focus:outline-none z-50" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                    <div :class="['flex flex-wrap gap-1 items-center', { 'mr-5': element2.isShowMoreBtn }]">
                        <div v-show="element2.isShowArray" class="overflow-hidden" v-for="(item,index) in element2.list" :key="index">
                            <ButtonClose :btnContent="item.title" @closeButtonAction="deleteBtnAction(index, element2.list)" />
                        </div>
                        <input :disabled="!element2.isRequired" :placeholder="element2.isRequired ? (element2.showPlaceholder ? 'Enter value' : '') : 'value is not required'" v-model="element2.input" @blur="addConditions($event, element2)" @keydown.enter="addConditions($event, element2)" type="text" class="flex-1" style="color: inherit; background: 0px center; opacity: 1; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 15px; border: 0px; margin: 0px; outline: 0px; padding: 5px;">
                    </div>
                    <PopoverColor @colorBtnClick="(index)=>colorBtnClick(index,element2)" :colorArray="element2.colorArray" />
                </Popover>
                <div @click="removeConditionButtonClick(index)" class="col-span-1 flex gap-x-1 content-center mt-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-gray-300 hover:text-gray-500 transition duration-200 cursor-pointer"><title>Remove condition from rule</title><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></div>
            </div>
        </div>
        <!-- OR AND end -->

         <!-- Notify start-->
        <div class="grid gap-x-2 grid-cols-8 mt-2.5">
            <ConditionNotify :notifyArray="notifyArray" />
        </div>
         <!-- Notify end -->
       
         <!-- two button -->
         <div class="mt-5 flex items-center">
            <div class="flex-1">
                <button @click="addConditionClick" title="Add new condition" type="button" class="inline-flex items-center shadow-sm px-2.5 py-1 border border-gray-300 text-xs leading-5 font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="-ml-1.5 mr-1 h-4 w-4 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg><span>{{ addCondition }}</span></button>
                <button @click="addConditionSetClick" v-if="isShowAddButon" title="Add new condition set" type="button" class="ml-3 inline-flex items-center shadow-sm px-2.5 py-1 border border-gray-300 text-xs leading-5 font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="-ml-1.5 mr-1 h-4 w-4 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg><span>{{ addConditionSet }}</span></button>
            </div>
            <!-- 删除按钮和复制按钮 -->
            <div class="flex gap-x-2.5">
                <svg @click="deleteConditionSetClick" v-if="isShowDelButon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition duration-200"><title>Delete this Condition Set</title><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>
                <!-- <svg @click="cloneConditionSetClick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="w-5 h-5 text-gray-400 hover:text-gray-800 cursor-pointer transition duration-200"><title>Clone this Condition Set</title><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg> -->
            </div>
         </div>
    </div>

</template>

<script setup>
import { watch,ref,onMounted } from 'vue';
import ButtonClose from './ButtonClose.vue';
import ConditionNotify from './ConditionNotify.vue';
import PopoverColor from './PopoverColor.vue';
import { FM_CONSTANTS, getCommonOption, stringToArray, isChoiceOption, handerCondition, handerField } from '@/assets/sharedConstants';
import { useFormStore } from '@/stores/form';
import { Popover, PopoverButton } from '@headlessui/vue';
import { translateLocale } from '@/assets/language';
const formStore = useFormStore()
// const isShowDeleteButton = ref(false)
// const orAndArray = ref([])
let idCounter = 1;

const emit = defineEmits(['addConditionSet', 'deleteConditionSet', 'cloneConditionSet']);
const props = defineProps({
    isShowAddButon: Number,
    isShowDelButon: Number,
    ifArray:Array,
    orAndArray:Array,
    notifyArray:Array
    // copyItem:Object
});
const newIfArray = props.ifArray;
const newOrAndArray = props.orAndArray;

const condSelect = ref('')
const condIf = ref('')
const condOr = ref('')
const condAnd = ref('')
const notify = ref('')
const addCondition = ref('')
const addConditionSet = ref('')

onMounted(()=>{
    setLocalizing()
})
function setLocalizing(){
    condSelect.value = translate('Select...')
    condIf.value = translate('IF')
    condOr.value = translate('OR')
    condAnd.value = translate('AND')
    notify.value = translate('Notify')
    addCondition.value = translate('Add Condition')
    addConditionSet.value = translate('Add Condition Set')
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function addConditionClick(){
    const object = {id:Date.now()+idCounter++, link:"OR", ...getCommonOption()}
    newOrAndArray.push(object);
}
function removeConditionButtonClick(index){
    newOrAndArray.splice(index, 1);
}

function addConditionSetClick(){
    emit('addConditionSet');
}
function deleteConditionSetClick(){
    emit('deleteConditionSet');
}
// function cloneConditionSetClick(){
//     emit('cloneConditionSet');
// }
watch(
  () => newIfArray.map(item => item.list?.length),
  (newLengths, oldLengths) => {
    newLengths.forEach((newLength, index) => {
      if (newLength !== oldLengths[index]) {
        // console.log('xxxxx');
        if (newIfArray[index].list.length > 0){
            newIfArray[index].showPlaceholder = false
        }else{
            newIfArray[index].showPlaceholder = true
        }
      }
    });
  }
);
watch(
  () => newOrAndArray.map(item => item.list?.length),
  (newLengths, oldLengths) => {
    newLengths.forEach((newLength, index) => {
      if (newLength !== oldLengths[index]) {
        if (newOrAndArray[index].list.length > 0){
            newOrAndArray[index].showPlaceholder = false
        }else{
            newOrAndArray[index].showPlaceholder = true
        }
        // console.log(`Item ${index} list length changed from ${oldLengths[index]} to ${newLength}`);
      }
    });
  }
);
// 切换选项
function handleNotifyChange(el, index, event){
    if (index == 0){
        return
    }
    // console.log(JSON.stringify(el))
    // el.list.splice(0, el.list.length);
    el.input = "";
    el.isRequired = true;//初始值
    el.showPlaceholder = true;//初始值
    el.isShowMoreBtn = false;//初始值
    el.isShowArray = false;//是否显示数组value
    el.isShowSelectValue = false//初始值
    const optionFields = formStore.conditionFields;
    // console.log(el.selectedField)
    const type = isChoiceOption(el.selectedField, optionFields);
    const valuesList = formStore.getColorListByFormId(el.selectedField);
    switch (index){
        case 1:{
            el.selectedCondition = FM_CONSTANTS.SELECT_CONDITION;
            el.optionConditions = FM_CONSTANTS.allOptionConditions;
            // console.log(list);
            handerField(type, el, valuesList);
            break;
        }
        case 2:{
            handerCondition(type, el, valuesList);
            break;
        }
        default:
        break;
    }
    if (type===FM_CONSTANTS.CHOICE && el.selectedCondition==="Equals"){
        el.isShowSelectValue = true
    }
}
// 删除按钮 
function deleteBtnAction(index, list){
    list.splice(index, 1);
    // if (el){
    //     el.content = arrayToString(list)
    // }else{
    //     historyInputValue = arrayToString(list)
    // }
}
function addConditions(event, el){
    let value = event.target.value.trim()
    if (el.selectedCondition === 'Any of' || el.selectedCondition === 'None of' ){
        if (value){
            const newItems = stringToArray(value)
            const uniqueItems = newItems.filter(item => !el.list.includes(item))
            for(let item of uniqueItems){
                if(!el.list.some(old => old.title === item)){
                    el.list.push({title:item})
                }
            }
        }
        el.input = ""
        return
    }
}
function colorBtnClick(index, el){
    // console.log('ddd')
    let item = el.colorArray[index];
    // console.log(item)
    if (item && !el.list.some(old => old.id === item.id)){
        el.list.push({title:item.title, id:item.id});
    }
}
// function arrayToString(array){
//     let string = ''
//     for (let i=0; i<array.length; i++){
//         const value = array[i]
//         if (i+1 == array.length){
//             string = string+value
//         }else{
//             string = string+value+','
//         }
//     }
//     return string
// }
</script>