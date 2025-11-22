<template>
    <div class="mt-6 col-span-6 px-6">
        
        <div class="flex items-center justify-between">
            <div>
                <p class="text-base font-semibold text-gray-900">{{ resendTitle }}</p>
                <p class="text-sm leading-5 text-gray-500">{{ resendDesc }}</p>
            </div>
            <a @click.prevent="backButtonClick" title="go to the home screen" class="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{backStr}}</a>
        </div>
        <div v-if="!requestDataing" class="mt-6 text-sm text-gray-900">
            <ul class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li v-for="item in resendData.list" :key="item.id"
                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div class="flex w-0 flex-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 flex-shrink-0 text-gray-400"> <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"> </path></svg>
                        <div class="ml-4 flex min-w-0 flex-1 gap-2"><span class="truncate font-medium">{{ responseStr }} #{{ item.number }}</span><span class="flex-shrink-0 text-gray-400">{{formatDate(item.timestamp)}}</span></div>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                        <a target="_blank" :href="`${resendData.form.pub_url}?edit2=${item.id}`" class="font-medium text-indigo-600 hover:text-indigo-500" :title="`View response #${item.number}`" rel="noreferrer">{{ viewStr }}</a>
                        <button @click="resendButtonClick(item)" class="ml-3 font-medium text-indigo-600 hover:text-indigo-500 text-indigo-600" :title="`Resend notification to response #${item.number}`">{{ resendStr }}</button>
                    </div>
                </li>
            </ul>

            <div class="mt-6">
                <button @click="getNextPage" title="Load more responses from the Google Form" class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">{{ loadMore }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="-mr-1 size-5 text-gray-400"> <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        <ResendLoading :loadText="resendLoadText"/>
        <ResendToast ref="resendToast" />
    </div>
</template>

<script setup>
import ResendToast from './ResendToast.vue';
import ResendLoading from './ResendLoading.vue';
import { ref,onMounted } from 'vue';
import { translateLocale } from '@/assets/language';
import { useFormStore } from '@/stores/form';

const formStore = useFormStore()
const emit = defineEmits(['backHomeClick']);
const resendToast = ref(null)
const resendLoadText = ref('')

const requestDataing = ref(true)
const originList = ref(null)
const pageSize = 20; // 每次获取20条

const resendData = ref({list:[],form:{}})
// const data = {number:245,timestamp:"Thu Dec 19 15:56:20 GMT+08:00 2024",id:"2_ABaOnudQBE_gdbZnqrc1unRVJiHb9UmgkfslC346VM3x3fnaQ9bQpDw265BL-InbfJVM3Ik"}
// resendData.list.push(data)
// resendData.form.pub_url = "https://docs.google.com/forms/d/e/1FAIpQLSfLxdhhzqp7rjdksLaIYfKs8JNua6DDntMumKa7rQk56bbCAg/viewform"

const resendTitle = ref('')
const resendDesc = ref('')
const backStr = ref('')
const responseStr = ref()
const viewStr = ref('')
const resendStr = ref('')
const loadMore = ref('')
const loadingRes = ref('')
const noRes = ref('')
const noMoreRes = ref('')
const resendIng = ref('')

function setLocalizing(){
    resendTitle.value = translate('Resend Notifications')
    resendDesc.value = translate('Manually send notifications to the recipients of the select form responses.')
    backStr.value = translate('Back')
    responseStr.value = translate('Response')
    viewStr.value = translate('View')
    resendStr.value = translate('Resend')
    loadMore.value = translate('Load More')
    loadingRes.value = translate('Loading form responses...')
    noRes.value = translate('Sorry, there no responses to resend in your Google Form')
    noMoreRes.value = translate('Sorry, there are no more responses to resend in your Google Form')
    resendIng.value = translate('Resending notification to response')
}
onMounted(() => {
    setLocalizing()
    startLoadToast(loadingRes.value)
    try{
        fetchData()
    }catch(e){
        console.error(e)
    }
});
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function fetchData(){
    google.script.run.withSuccessHandler((res) => {
        originList.value = JSON.parse(res.list)
        resendData.value.form = res.form
        if (originList.value.length == 0){
            endLoadShowToast(noRes.value)
            requestDataing.value = true
        }else{
            endLoadShowToast()
            getNextPage()
        }
    })
    .withFailureHandler((error) => {
        endLoadShowToast(error.message)
    })
    .getResendList();
}
function endLoadShowToast(message){
    requestDataing.value = false
    endLoadToast(message)
}
function getNextPage(){
    if (originList.value.length === 0) {
        endLoadShowToast(noMoreRes.value)
        return;
    }
    const dataChunk = originList.value.splice(0, pageSize);
    resendData.value.list.push(...dataChunk);
}
function resendButtonClick(item) {
    startLoadToast(resendIng.value+" #" + item.number + "...")
    google.script.run.withSuccessHandler((res) => {
        endLoadToast(res)
    })
    .withFailureHandler((error) => {
        endLoadToast(error.message)
    })
    .resendNotifications(item.id);
}
function startLoadToast(content){
    resendToast.value.stopToast()
    resendLoadText.value = content
}
function endLoadToast(content){
    resendLoadText.value = ''
    if(content){
        resendToast.value.show(content)
    }
    // resendToast.value.show("Email sent to volt.hkg.sales@gmail.com<br>Email sent to volt.hkg.sales@gmail.com, yukyyq2004@163.com, 240734169@qq.com, 240734169@qq.com<br>Quota left: 369")
}

function backButtonClick(){
    emit('backHomeClick');
}
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = {year: 'numeric', month: 'short',day: 'numeric',hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: true};
  return date.toLocaleString('en-US', options);
}
</script>
