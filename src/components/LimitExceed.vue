<template>
    <div class="flex items-center justify-between">
        <div>
            <p class="text-base font-semibold text-gray-900">Limit exceeded</p>
            <p class="text-sm leading-5 text-gray-500">You have reached the maximum number of simultaneous forms with "Form Notifications".</p>
            <p class="text-sm leading-5 text-gray-500">You can disable an unused "Form Notifications" for one of the forms below.</p>
        </div>
        <a @click.prevent="backButtonClick" title="go to the home screen" class="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">Back</a>
    </div>
    <p v-if="!requestDataing" class="mt-6 text-sm text-gray-900">
        <ul class="divide-y divide-gray-100 rounded-md border border-gray-200">
            <li v-for="item in list" :key="item.formId"
                class="flex items-center justify-between py-2.5 pl-4 pr-5 text-sm leading-6">
                <div class="flex w-0 flex-1 items-center">
                    <div class="flex min-w-0 flex-1 gap-2"><span class="truncate font-medium">{{ item.name }}</span></div>
                </div>
                <div class="ml-4 flex-shrink-0 flex items-center gap-4">
                    <a target="_blank" :href="`https://docs.google.com/forms/d/${item.formId}/edit`" class="font-medium text-indigo-600 hover:text-indigo-500" :title="`View ${item.name}`" rel="noreferrer">View</a>
                    <div :class="['toggle', item.isOff ? '' : 'on']" @click="toggleClick(item)"><div class="knob"></div></div>
                </div>
            </li>
        </ul>
    </p>
    <loading v-if="isShowLoading" active :width="55" :height="55"/>
    <ResendToast ref="resendToast" />
    <FMDialogError ref="fmDialogError"/>
</template>

<script setup>
import ResendToast from './ResendToast.vue';
import FMDialogError from './FMDialogError.vue';
const resendToast = ref(null)
import loading from 'vue-loading-overlay';
const isShowLoading = ref(false)
import { ref,onMounted } from 'vue';
const requestDataing = ref(false)
const fmDialogError = ref(null)
const list = ref([])
const emit = defineEmits(['backButtonClick']);
// list.value.push({formId:"1tPXi3_Ktp45f9SLKK5yWl3LDbachy1nWNLhQ1XGt-k0",name:"表单名称表单名称表单名称表单名称表单名称表单名称表单名称表单名称表单名称"})

onMounted(() => {
    isShowLoading.value = true
    google.script.run.withSuccessHandler((res) => {
        isShowLoading.value = false
        list.value = res
    })
    .withFailureHandler((error) => {
        handerFailed(error.message)
    })
    .getAllEmailTrigger();
});

function backButtonClick(){    
    emit('backButtonClick');
}
function toggleClick(item){
    item.isOff = !item.isOff; 
    isShowLoading.value = true
    resendToast.value.stopToast()
    const isSwitch = !item.isOff

    if (isSwitch){
        google.script.run.withSuccessHandler(() => {
            handerSuccess()
        })
        .withFailureHandler((error) => {
            item.isOff = !item.isOff; 
            handerFailed(error.message)
        })
        .openFormEmailNotifications(item.formId);
    }else{
        google.script.run.withSuccessHandler(() => {
            handerSuccess()
        })
        .withFailureHandler((error) => {
            item.isOff = !item.isOff; 
            handerFailed(error.message)
        })
        .closeFormEmailNotifications(item.formId);
    }
}
function handerFailed(errMsg){
    isShowLoading.value = false
    fmDialogError.value.openModal(errMsg)
}
function handerSuccess(){
    isShowLoading.value = false
    resendToast.value.show("Operation successful")
}
</script>

<style  scoped>
.toggle {
    width: 44px;
    height: 24px;
    background-color: #ddd;
    border-radius: 22px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
}
.toggle .knob {
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
}
.toggle.on {
    background-color: #6640b2;
}
.toggle.on .knob {
    transform: translateX(20px);
}
.toggle.no-ani .knob {
    transition: none;
}
</style>