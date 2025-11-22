<template>
    <div class="border border-gray-200 rounded-md">
        <ol class="overflow-hidden flex">
            <li @click="tabbarAction(1)" class="relative overflow-hidden flex-1 cursor-pointer select-none">
                <div class="border-b-4 border-indigo-600" v-if="currentPage==1">
                    <div class="px-6 py-5 flex items-center text-xs font-medium -mb-1" aria-current="step"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-indigo-600 rounded-full"><span class="text-indigo-600">01</span></span><span class="ml-4 text-sm font-medium text-indigo-600">{{ tab1Str }}</span></div>
                </div>
                <div class="group flex items-center" v-if="currentPage!=1">
                    <span class="px-6 py-5 flex items-center text-xs font-medium"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400"><span class="text-gray-500 group-hover:text-gray-900">01</span></span><span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{tab1Str}}</span></span></div><div class="absolute top-0 left-0 w-3 inset-0 block" aria-hidden="true">
                </div>
            </li>
            <li @click="tabbarAction(2)" class="relative overflow-hidden flex-1 cursor-pointer select-none">
                <div class="border-b-4 border-indigo-600" v-if="currentPage==2">
                    <div class="px-6 py-5 flex items-center text-xs font-medium -mb-1" aria-current="step"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-indigo-600 rounded-full"><span class="text-indigo-600">02</span></span><span class="ml-4 text-sm font-medium text-indigo-600">{{tab2Str}}</span></div>
                </div>
                <div class="group flex items-center" v-if="currentPage!=2">
                    <span class="px-6 py-5 flex items-center text-xs font-medium"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400"><span class="text-gray-500 group-hover:text-gray-900">02</span></span><span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{tab2Str}}</span></span></div><div class="absolute top-0 left-0 w-3 inset-0 block" aria-hidden="true"><svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none"><path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke"></path></svg>
                </div>
            </li>
            <li @click="tabbarAction(3)" class="relative overflow-hidden flex-1 cursor-pointer select-none">
                <div class="border-b-4 border-indigo-600" v-if="currentPage==3">
                    <div class="px-6 py-5 flex items-center text-xs font-medium -mb-1" aria-current="step"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-indigo-600 rounded-full"><span class="text-indigo-600">03</span></span><span class="ml-4 text-sm font-medium text-indigo-600">{{tab3Str}}</span></div>
                </div>
                <div class="group flex items-center" v-if="currentPage!=3">
                    <span class="px-6 py-5 flex items-center text-xs font-medium"><span class="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400"><span class="text-gray-500 group-hover:text-gray-900">03</span></span><span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{tab3Str}}</span></span></div><div class="absolute top-0 left-0 w-3 inset-0 block" aria-hidden="true"><svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none"><path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke"></path></svg>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup>
import { inject, ref,onMounted } from 'vue';
import { useFormStore } from '../stores/form';
import { translateLocale } from '@/assets/language';
const formStore = useFormStore();
const stored = formStore.serverData;
const emit = defineEmits(['updatePage']);
const fmToastTip = inject('fmToastTip-key')

const tab1Str = ref('')
const tab2Str = ref('')
const tab3Str = ref('')

onMounted(()=>{
    setLocalizing()
})
function setLocalizing(){
    tab1Str.value = translate("Message")
    tab2Str.value = translate("Recipients")
    tab3Str.value = translate("PDF")
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function tabbarAction(index){
    if(!stored.notification_name){
        fmToastTip('Please provide a name for your notification')
        return
    }
    if(!stored.sender_name){
        fmToastTip("Please enter the email Sender's name")
        return
    }
    if(!stored.email_subject){
        fmToastTip('Please enter the email subject line')
        return
    }
    emit('updatePage', index);
}
defineProps({
    currentPage: Number
});
</script>