<template>
    <FMDialogError ref="fmDialogError"/>
    <ResendToast ref="resendToast"/>
    <LimitExceed2 v-if="isShowLimitExceed" @backButtonClick="isShowLimitExceed = false" :triggerList="triggerList"/>
    <!-- class="m-0.5 rounded shadow ring-1 ring-black ring-opacity-5" -->
    <div v-show="!isShowLimitExceed">
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path></svg></span><p class="max-w-2xl truncate">Form Limiter</p></div></div> -->
        <div class="px-6 py-6"><div class="bg-white">
            <p class="text-base font-semibold text-gray-900">{{ limitTitle }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ limitDesc }}</p>
            <div class="mt-8 flex items-center justify-between"><div class="flex items-center"><input v-model="stored.is_enable_form_limiter" id="m4qpj6ek" name="isEnabled" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="true"><label for="m4qpj6ek" class="ml-2 block text-sm text-gray-600">{{ enableLimit }}</label></div></div>
            
            <div v-show="stored.is_enable_form_limiter">
                <div class="my-8 border-t border-gray-200"></div>
                <div class="flex flex-row items-center justify-start space-x-4"><div class="font-medium text-sm text-gray-600">{{ closeAfter }}</div><div class="flex justify-between items-end hidden"><label class="block text-sm font-medium text-gray-700"></label></div><div class=""><input  v-model="stored.limiter_number" name="Count" type="number" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" pattern="[0-9]+" min="1" :placeholder="numRes" value=""></div><div class="font-medium text-sm text-gray-600">{{ resRecei }}</div></div>
                <div class="my-8 border-t border-gray-200"></div>
                <div class="flex items-center justify-start space-x-6"><div class="mt-4 font-medium text-sm text-gray-600">{{ openFormAt }}</div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ openDate }}</label></div><div class="mt-1"><input v-model="stored.limiter_start_date" name="ODate" type="date" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ openTime }}</label></div><div class="mt-1"><input v-model="stored.limiter_start_time" name="OTime" type="time" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div></div>
                <div class="my-6 flex flex-row items-center justify-start space-x-6"><div class="mt-4 font-medium text-sm text-gray-600">{{ closeFormAt }}</div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ endDate }}</label></div><div class="mt-1"><input v-model="stored.limiter_end_date" name="CDate" type="date" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ endTime }}</label></div><div class="mt-1"><input v-model="stored.limiter_end_time" name="CTime" type="time" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div></div>
                <div class="my-8 border-t border-gray-200"></div>
                <!-- 星期几 -->
                <div class="flex items-center justify-start space-x-4"><div class="font-medium text-sm text-gray-600">{{ openFormOn }}</div><div class="flex items-center">
                    <input v-model="stored.sun"  id="m4qptmtn" name="Sun" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtn" class="ml-2 block text-sm text-gray-600">{{sunStr}}</label></div><div class="flex items-center">
                    <input v-model="stored.mon" id="m4qptmto" name="Mon" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmto" class="ml-2 block text-sm text-gray-600">{{ monStr }}</label></div><div class="flex items-center">
                    <input v-model="stored.tue" id="m4qptmtp" name="Tue" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtp" class="ml-2 block text-sm text-gray-600">{{ tueStr }}</label></div><div class="flex items-center">
                    <input v-model="stored.wed" id="m4qptmtq" name="Wed" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtq" class="ml-2 block text-sm text-gray-600">{{ wedStr }}</label></div><div class="flex items-center">
                    <input v-model="stored.thu" id="m4qptmtr" name="Thu" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtr" class="ml-2 block text-sm text-gray-600">{{ thuStr }}</label></div><div class="flex items-center">
                    <input v-model="stored.fri" id="m4qptmts" name="Fri" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmts" class="ml-2 block text-sm text-gray-600">{{ friStr }}</label></div><div class="flex items-center">
                    <input v-model="stored.sat" id="m4qptmtt" name="Sat" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtt" class="ml-2 block text-sm text-gray-600">{{ satStr }}</label>
                </div></div>
                <!-- 时间之间 -->
                <div class="my-8 flex flex-row items-center justify-start space-x-4"><div class="mt-4 font-medium text-sm text-gray-600">{{ betweenStr }} </div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ openTime }}</label></div><div class="mt-1"><input v-model="stored.week_start_time" name="ROTime" type="time" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div><div class="mt-4 font-medium text-sm text-gray-600">{{ andStr }}</div><div><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ endTime }}</label></div><div class="mt-1"><input v-model="stored.week_end_time" name="RCTime" type="time" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div><div class="mt-4 font-medium text-sm text-gray-600">{{ recurringStr }}</div></div>
                <div class="my-8 border-t border-gray-200"></div>
                <div class="mt-6">
                    <label for="m4qptmtu" class="block text-sm font-medium text-gray-700">{{ closeMsg }}</label>
                    <div class="mt-1">
                        <textarea v-model="stored.limiter_close_message" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
                    </div>
                </div>
                <!-- All times are in your local timezone <b>({{computedTimeZone}})</b>.<br> -->
                <p class="text-sm leading-5 text-gray-500 mt-2">{{ closeTip }}</p>
                <div class="my-8 border-t border-gray-200"></div>
                <div class="flex items-center justify-between"><div class="flex items-center"><input v-model="stored.limiter_is_notify_me_when_open" id="m4qptmtv" name="notifyOnOpen" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtv" class="ml-2 block text-sm text-gray-600">{{ openNoti }}</label></div></div>
                <div class="mt-6 flex items-center justify-between"><div class="flex items-center"><input  v-model="stored.limiter_is_notify_me_when_close" id="m4qptmtw" name="notifyOnClose" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m4qptmtw" class="ml-2 block text-sm text-gray-600">{{ closeNoti }}</label></div></div>
            </div>

            <!-- 底部按钮 -->
            <div class="col-span-full">
                <div class="mt-8 border-t border-gray-200 ">
                    <div class="flex items-center mt-6">
                        <div class="flex justify-items-start"><a @click.prevent="backDashboard" title="Discard all changes" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{ cancelStr }}</a></div>
                        <div class="flex justify-end flex-grow"><button @click="saveClick" title="Save" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" v-html="saveContinueStr"></button></div>
                    </div>
                </div>
            </div>
        </div></div>
    </div>
</template>
<script setup>
import FMDialogError from '@/components/FMDialogError.vue';
import ResendToast from '@/components/ResendToast.vue';
import { inject,ref,onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/form';
import LimitExceed2 from '@/components/LimitExceed2.vue';
import { translateLocale } from '@/assets/language';

const isShowLimitExceed = ref(false)
const formStore = useFormStore()
const router = useRouter()
const stored = ref({})
// let stored = formStore.limiterData;
const startLoading = inject('startLoading-key');
const endLoading = inject('endLoading-key');
const fmDialogError = ref(null)
const timeZone = ref(null)
const resendToast = ref(null)
const triggerList = ref([])
// triggerList.value.push({formId:"1tPXi3_Ktp45f9SLKK5yWl3LDbachy1nWNLhQ1XGt-k0",name:"表单名称表单名称表单名称表单名称表单名称表单名称表单名称表单名称表单名称"})
const showSucToast = inject('showSucToast-key')

const computedTimeZone = computed(() => {
  return stored.value.limiter_time_zone || timeZone.value;
});

const limitTitle = ref('')
const limitDesc = ref('')
const enableLimit = ref('')
const closeMsg = ref('')
const closeTip = ref('')
const openNoti = ref('')
const closeNoti = ref('')
const openFormAt = ref('')
const closeFormAt = ref('')
const openFormOn = ref('')
const openDate = ref('')
const openTime = ref('')
const endDate = ref('')
const endTime = ref('')
const sunStr = ref('')
const monStr = ref('')
const tueStr = ref('')
const wedStr = ref('')
const thuStr = ref('')
const friStr = ref('')
const satStr = ref('')
const cancelStr = ref('')
const saveContinueStr = ref('')
const betweenStr = ref('')
const andStr = ref("")
const recurringStr = ref('')
const closeAfter = ref('')
const resRecei = ref('')
const numRes = ref('')

function setLocalizing(){
    limitTitle.value = translate('Limit Google Form Responses')
    limitDesc.value = translate('Enable your Google Form at custom dates and times on a fixed or recurring schedule')
    enableLimit.value = translate('Enable Form Limiter')
    closeMsg.value = translate('Closed form message')
    closeTip.value = translate('The actual open and close time of the Google Form may vary ± 30 minutes from the specified time.')
    openNoti.value = translate('Notify me when the Google Form opens')
    closeNoti.value = translate('Notify me when the Google Form closes')
    openFormAt.value = translate('Open the Google Form at')
    closeFormAt.value = translate('Close the Google Form at')
    openFormOn.value = translate('Open the Google Form on')
    openDate.value = translate('Start Date')
    openTime.value = translate('Start Time')
    endDate.value = translate('End Date')
    endTime.value = translate('End Time')
    sunStr.value = translate('Sun')
    monStr.value = translate('Mon')
    tueStr.value = translate('Tue')
    wedStr.value = translate('Wed')
    thuStr.value = translate('Thu')
    friStr.value = translate('Fri')
    satStr.value = translate('Sat')
    betweenStr.value = translate('between these times')
    andStr.value = translate('and')
    recurringStr.value = translate('on a recurring schedule')
    closeAfter.value = translate('Close the Google Form after')
    resRecei.value = translate('responses have been received.')
    numRes.value = translate('Number of responses')
    cancelStr.value = translate('Cancel')
    saveContinueStr.value = translate('Save &amp; Continue')
}
onMounted(() => {
    setLocalizing()
    setSererDataToLocal()
    timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
});
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function setSererDataToLocal(){
    for (const key in formStore.limiterData) {
        stored.value[key] = formStore.limiterData[key]
    }
    const sstamp = formStore.limiterData.limiter_start_stamp
    if (sstamp){
        stored.value.limiter_start_date = formatTimestampToDate(sstamp)
        stored.value.limiter_start_time = formatTimestampToTime(sstamp)
    }else{
        stored.value.limiter_start_date = ''
        stored.value.limiter_start_time = ''
    }
    const estamp = formStore.limiterData.limiter_end_stamp
    if (estamp){
        stored.value.limiter_end_date = formatTimestampToDate(estamp)
        stored.value.limiter_end_time = formatTimestampToTime(estamp)
    }else{
        stored.value.limiter_end_date = ''
        stored.value.limiter_end_time = ''
    }
}
function formatTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function formatTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0'); // 补齐两位
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
function saveClick(){
    const startDate = stored.value.limiter_start_date
    const startTime = stored.value.limiter_start_time
    const endDate = stored.value.limiter_end_date
    const endTime = stored.value.limiter_end_time
    stored.value.limiter_time_zone = timeZone.value

    let limiter_start_stamp = null
    if (startDate) {
        limiter_start_stamp = startDate
        if (startTime) {
            limiter_start_stamp += ` ${startTime}`
        } else {
            limiter_start_stamp +=  " 00:00"
        }
        limiter_start_stamp = new Date(limiter_start_stamp).getTime();
        limiter_start_stamp = limiter_start_stamp/1000
    }
    let limiter_end_stamp = null
    if (endDate) {
        limiter_end_stamp = endDate
        if (endTime) {
            limiter_end_stamp += ` ${endTime}`
        } else {
            limiter_end_stamp += " 00:00"
        }
        limiter_end_stamp = new Date(limiter_end_stamp).getTime();
        limiter_end_stamp = limiter_end_stamp/1000
    }
    stored.value.limiter_start_stamp = limiter_start_stamp
    if (!stored.value.limiter_start_stamp){
        delete stored.value.limiter_start_stamp
    }
    stored.value.limiter_end_stamp = limiter_end_stamp
    if (!stored.value.limiter_end_stamp){
        delete stored.value.limiter_end_stamp
    }

    if (stored.value.sun || stored.value.mon || stored.value.tue || stored.value.wed || stored.value.thu || stored.value.fri || stored.value.sat) {
        if (stored.value.week_start_time && !stored.value.week_end_time) {
            stored.value.week_end_time = "23:59"
        }
        if (stored.value.week_end_time && !stored.value.week_start_time) {
            stored.value.week_start_time = "00:00"
        }
    }
    if (stored.value.week_start_time && stored.value.week_end_time && stored.value.is_enable_form_limiter){
        if (stored.value.week_end_time <= stored.value.week_start_time){
            resendToast.value.show('The recurring end time should be after the start time')
            return
        }
        if (!isTimeDifferenceGreaterThanOrEqualOneHour(stored.value.week_end_time, stored.value.week_start_time)){
            resendToast.value.show('The form closing time should be at least an hour from the start time')
            return
        }
    }

    startLoading()
    google.script.run.withSuccessHandler((resStr) => {
        endLoading()
        const resJson = JSON.parse(resStr)
        if (resJson.list && resJson.list.length > 0){
            isShowLimitExceed.value = true
            triggerList.value = resJson.list
            return
        }
        for (const key in resJson){
            formStore.limiterData[key] = resJson[key]
        }
        setSererDataToLocal()
        startSucToast()
    })
    .withFailureHandler((error) => {
        endLoading()
        fmDialogError.value.openModal(error.message)
    })
    .actionLimiter(stored.value);
}
function startSucToast(){
    showSucToast('Saved successfully')
    backDashboard()
}
function backDashboard(){
    router.push({path:'/'})
}
function isTimeDifferenceGreaterThanOrEqualOneHour(time1, time2) {
  function timeToMinutes(time) {
    var [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  }
  var minutes1 = timeToMinutes(time1);
  var minutes2 = timeToMinutes(time2);
  var difference = Math.abs(minutes1 - minutes2);
  return difference >= 60;
}

</script>