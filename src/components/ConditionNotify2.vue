<template>

    <Popover class="relative shadow-sm rounded-md">
        <PopoverButton @click="colorClick()" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex mt-2 h-5 focus:outline-none z-50" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
        <div class="block w-full border border-gray-300 py-0.5 px-0 text-sm rounded-md bg-white css-ywad9z-container">
                    
            <div class="flex flex-wrap mr-7 items-center overflow-hidden">
                <div class="ml-1 overflow-hidden" v-for="(item,index) in stored.no_condition_match_notify_array" :key="index">
                    <ButtonClose :btnContent="item.title" @closeButtonAction="closeAction(index)" />
                </div>
                <input class="flex-1" v-model="inputValue" @input="checkComma" @blur="addConditions" @keydown.enter="addConditions" :placeholder="emailPlaceholder" type="text" style="color: inherit; background: 0px center; opacity: 1; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 20px; border: 0px; margin: 0px; outline: 0px; padding: 5px;">
            </div>

        </div>
        <PopoverColor @colorBtnClick="colorBtnClick" :colorArray="colorArray" />
    </Popover>
    
</template>


<script setup>
import { ref,watch, inject,onMounted } from 'vue';
import ButtonClose from './ButtonClose.vue';
import PopoverColor from './PopoverColor.vue';
import { fm_colors } from '@/assets/sharedConstants';
import validator from 'validator';
import { useFormStore } from '@/stores/form';
import { stringToArray } from '@/assets/sharedConstants';
import { Popover, PopoverButton } from '@headlessui/vue';
import { translateLocale } from '@/assets/language';
const invalidEmailTip = inject('checkEmail-key');
const formStore = useFormStore();
const stored = formStore.serverData;
const colorArray = ref([])
const inputValue = ref('');


const emailPlaceholder = ref('')

onMounted(()=>{
    emailPlaceholder.value = translateLocale("Enter email address(es) here...", formStore.localeSelect)
})
watch(stored.no_condition_match_notify_array, () => {
    emailPlaceholder.value = stored.no_condition_match_notify_array.length > 0 ? '' : translateLocale("Enter email address(es) here...", formStore.localeSelect);
});

function colorClick(){
    colorArray.value.splice(0, colorArray.value.length);
    const colors = fm_colors;
    const list = formStore.textFormList;
    for(var i=0; i<list.length; i++){
        const item = list[i];
        const curColor = colors[i%colors.length];
        colorArray.value.push({color:curColor, title:item.title, id:item.id});
    }
}

function closeAction(index){
  stored.no_condition_match_notify_array.splice(index,1);
}
function colorBtnClick(index){
    const item = colorArray.value[index]
    if (item && !stored.no_condition_match_notify_array.some(old => old.id === item.id)){
        stored.no_condition_match_notify_array.push({title:item.title, id:item.id})
    }
}
const checkComma = () => {
  if (inputValue.value.includes(',')){
    addConditions()
  }
};
function addConditions(){
    const newItems = stringToArray(inputValue.value)
    for(let value of newItems){
        if(value && !validator.isEmail(value)){
            invalidEmailTip(value);
        }else if (value && !stored.no_condition_match_notify_array.some(old => old.title === value)) {
            stored.no_condition_match_notify_array.push({title:value}); 
        }
    }
    inputValue.value = ''; 
}
</script>