<template>
     <LimitExceed v-if="isShowLimitExceed" @backButtonClick="isShowLimitExceed = false"/>
    <div v-show="!isShowLimitExceed">
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"></path></svg></span><p class="max-w-2xl truncate">Form Settings</p></div></div> -->
       
        <div class="px-6 py-6"><div class="bg-white">
            <p class="text-base font-semibold text-gray-900">{{ disabledEmailTitle }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ disabledEmailDesc }} {{ formStore.activeEmail }}.</p>
            <div class="mt-4 mb-8 border-t border-gray-200"></div>
            <ul class="-mt-2 divide-y divide-gray-100">
                <li class="flex items-center gap-4 py-4">
                    <div ref="toggleButton" class="toggle time-switch" id="toggle"><div class="knob"></div></div>
                    <p class="text-gray-700 text-sm px-2">{{ disableTip }}</p>
                </li>
                <!-- <li class="flex items-center justify-between gap-x-6 py-5"><div class="min-w-0"><div class="flex items-center gap-x-2"><div class="text-rose-400 bg-rose-400/10 flex-none rounded-full p-1"><div class="size-2 rounded-full bg-current"></div></div><p class="text-base font-semibold tracking-tight leading-6 text-gray-900">Disable email notifications</p></div><div class="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500"><p class="whitespace-nowrap">Stop sending notifications from the account of {{ formStore.activeEmail }}</p></div></div><div class="flex flex-none items-center gap-x-4"><button @click="disableNotiClick" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">Disable Notifications</button></div></li> -->
                <!-- <li class="flex items-center justify-between gap-x-6 py-5"><div class="min-w-0"><div class="flex items-center gap-x-2"><div class="text-green-400 bg-green-400/10 flex-none rounded-full p-1"><div class="size-2 rounded-full bg-current"></div></div><p class="text-base font-semibold tracking-tight leading-6 text-gray-900">Restart email notifications</p></div><div class="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500"><p class="whitespace-nowrap">If you are not receiving notifications, restart triggers for {{ formStore.activeEmail }}</p></div></div><div class="flex flex-none items-center gap-x-4"><button @click="restartNotiClick" class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">Restart Notifications</button></div></li> -->
            </ul>
            <div class="mt-4 border-t border-gray-200 "><div class="flex items-center mt-6"><div class="flex justify-items-start"><a @click.prevent="backDashboard" href="/" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">{{ returnHome }}</a></div></div></div>
        </div></div>

        <loading v-if="isShowLoading" active :width="55" :height="55"/>
        <ResendToast ref="resendToast"/>
        <FMDialogError ref="fmDialogError"/>
    </div>

</template>
<script setup>
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/form';
import loading from 'vue-loading-overlay';
import FMDialogError from '@/components/FMDialogError.vue';
import LimitExceed from '@/components/LimitExceed.vue';
import ResendToast from '@/components/ResendToast.vue';
import { translateLocale } from '@/assets/language';

const formStore = useFormStore()
const router = useRouter()
const toggleButton = ref(null);
const isShowLoading = ref(false)
const fmDialogError = ref(null)
const isShowLimitExceed = ref(false)
const resendToast = ref(null)

const disabledEmailTitle = ref('')
const disabledEmailDesc = ref('')
const disableTip = ref('')
const returnHome = ref('')

function setLocalizing(){
    disabledEmailTitle.value = translate('Disable email notifications')
    disabledEmailDesc.value = translate('Stop sending notifications from the account of')
    disableTip.value = translate('When the switch is turned off, each notification in the list will be disabled.')
    returnHome.value = translate('Return to dashboard')
}
onMounted(() => {
    setLocalizing()
    if (formStore.isHasTrigger){
        toggleButton.value.classList.add('on');
    }
    toggleButton.value.addEventListener('click', function () {
        this.classList.toggle('on');
        const isSwitch = this.classList.contains('on')
        console.log(isSwitch)
        startLoadToast(isSwitch)
    });
});
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function backDashboard(){
    router.push({path:'/'})
}
function startLoadToast(isSwitch){
    resendToast.value.stopToast()
    isShowLoading.value = true
    if (isSwitch){
        google.script.run.withSuccessHandler(() => {
            handerSuccess(isSwitch)
        })
        .withFailureHandler((error) => {
            handerFailed(error.message)
        })
        .openFormEmailNotifications();
    }else{
        google.script.run.withSuccessHandler(() => {
            handerSuccess(isSwitch)
        })
        .withFailureHandler((error) => {
            handerFailed(error.message)
        })
        .closeFormEmailNotifications();
    }
}
function handerFailed(errMsg){
    toggleButton.value.classList.toggle('on')
    isShowLoading.value = false
    if (errMsg.includes('This script has too many triggers.')){
        isShowLimitExceed.value = true
    }else{
        fmDialogError.value.openModal(errMsg)
    }
}
function handerSuccess(isSwitch){
    formStore.isHasTrigger = isSwitch
    isShowLoading.value = false
    let content = "Notifications disabled for "+formStore.activeEmail
    if (isSwitch){
        content = "The triggers are recreated for "+formStore.activeEmail
    }
    resendToast.value.show(content)
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