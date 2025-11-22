<template>
    <FMDialogError ref="fmDialogError"/>
    <ResendToast ref="resendToast"/>
    <LimitExceed v-if="isShowLimitExceed" @backButtonClick="isShowLimitExceed = false"/>
    <div v-show="!isShowLimitExceed" >
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg></span><p class="max-w-2xl truncate">Slack</p></div></div> -->
        <div class="px-6 py-6"><div class="bg-white">
            <!-- 中间控件 begin -->
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6"><p class="text-base font-semibold text-gray-900">{{ slackNofi }}</p><p class="text-sm leading-5 text-gray-500">{{ slackDesc }}</p></div>
                <div v-if="isShowSlackInfo" class="col-span-3"><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ workflowName }}</label></div><div class="mt-1"><input v-model="stored.notification_name" name="Rule Name" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div>
                <div v-if="isShowSlackInfo"  class="col-span-3">&nbsp;</div>
                <div v-if="isShowSlackInfo"  class="col-span-3"><div class="">
                    <div class="flex justify-between items-end"><label for="m5utzqtt" class="block text-sm font-medium text-gray-700">{{ slackChannel }}</label></div>
                    <div class="rounded-md shadow-sm mt-1">
                        <select v-model="stored.pdf_file_name"  id="m5utzqtt" name="channelId" class="yq-arrow block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                            <option v-for="(opt) in formStore.channelList" :value="opt.id">{{ opt.name }}</option>
                        </select>
                    </div>
                </div></div>
                <div v-if="isShowSlackInfo"  class="-mt-0.5 col-span-2"><button @click="refreshClick" type="button" title="Refresh Channel List from Slack" class="mt-6 inline-flex items-center bg-white py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="-ml-1.5 mr-1 h-4 w-4 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"></path></svg><span>{{refreshStr}}</span></button></div>
                <div v-if="isShowSlackInfo"  class="col-span-5">
                    <label for="m3jq3msr" class="block text-sm font-medium text-gray-700">{{ slackMsg }}</label>
                    <Popover class="relative mt-1">
                        <PopoverButton @click="colorClick(2)" class="cursor-pointer absolute right-1 top-2 flex items-start focus:outline-none ml-4" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <textarea v-model="stored.pdf_template" ref="myTextarea" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
                        <PopoverColor @colorBtnClick="colorBtnClick2" :colorArray="colorArray2" />
                    </Popover>
                </div>
                
                <div v-if="hasLinkButton" class="col-span-full">
                    <button @click.prevent="linkToSlack" href="" target="_blank" rel="noreferrer" title="Click here to link your Slack account" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="-ml-1 mr-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg>
                        <span v-if="!loading" >{{ linkSlack }}</span>
                        <svg v-else class="animate-spin absolute inset-0 m-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span v-if="loading" class="invisible">Continue</span>
                    </button>
                </div>
                <div v-if="connectingSlack" class="col-span-full"><div class="rounded-t-xl overflow-hidden p-10"><div class="flex justify-around"><span class="inline-flex"><div class="inline-flex items-center px-4 py-2 text-base leading-6 font-medium rounded-md text-gray-600 transition ease-in-out durationx-150 "><svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{{ linkingSlack }}</div></span></div></div></div>

                <!-- <div class="col-span-4"><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">Workflow Name</label></div><div class="mt-1"><input v-model="stored.notification_name" name="Rule Name" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div>
                <div class="col-span-4"><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">Webhook URL</label></div><div class="mt-1"><input v-model="stored.pdf_file_name" name="url" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div>
                <div class="col-span-5">
                    <label for="m3jq3msr" class="block text-sm font-medium text-gray-700">Message Body</label>
                    <Popover class="relative mt-1">
                        <PopoverButton @click="colorClick(2)" class="cursor-pointer absolute right-1 top-2 flex items-start focus:outline-none ml-4" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <textarea v-model="stored.pdf_template" ref="myTextarea" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
                        <PopoverColor @colorBtnClick="colorBtnClick2" :colorArray="colorArray2" />
                    </Popover>
                </div> -->
            </div>
            <!-- 中间控件 end -->
            <!-- 底部按钮 begin -->
            <div class="col-span-full">
                <div class="mt-8 border-t border-gray-200 "><div class="flex items-center mt-6"><div class="flex justify-items-start">
                    <a @click.prevent="cancelClick" title="Discard all changes" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{cancelStr}}</a>
                </div><div class="flex justify-end flex-grow">
                    <button v-if="isShowSlackInfo" @click="saveButtonClickPre" title="Save" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" v-html="saveContinueStr"></button>
                </div></div></div>
            </div>
            <!-- end -->
        </div></div>
    </div>
</template>

<script setup>
import FMDialogError from '@/components/FMDialogError.vue';
import LimitExceed from '@/components/LimitExceed.vue';
const isShowLimitExceed = ref(false)
import PopoverColor from '@/components/PopoverColor.vue';
import { fm_colors } from '@/assets/sharedConstants';
import { useFormStore } from '@/stores/form';
import { Popover, PopoverButton } from '@headlessui/vue';
import { useRoute, useRouter } from 'vue-router';
import { ref,onMounted,inject, onUnmounted } from 'vue';
import { handerDashArray } from '@/assets/sharedConstants';
import { httpPost } from '@/assets/http';
import { resetStoreData,editFinish } from '@/assets/funUtils';
import ResendToast from '@/components/ResendToast.vue';
import { translateLocale } from '@/assets/language';

const formStore = useFormStore();
const stored = formStore.serverData;
const colorArray = ref([]);
const colorArray2 = ref([]);
const router = useRouter()
const route = useRoute()
const fmDialogError = ref(null)
const startLoading = inject('startLoading-key');
const endLoading = inject('endLoading-key');
const showSucToast = inject('showSucToast-key')
const myTextarea = ref(null)
const loading = ref(false)
const hasLinkButton = ref(true)
const connectingSlack = ref(false)
const isShowSlackInfo = ref(false)
const isExit = ref(false)
const resendToast = ref(null)

const topSelectId = 'fe2f9cba-e490-40e4-88a7-c621bb304b8f'

const slackNofi = ref('')
const slackDesc = ref('')
const linkSlack = ref('')
const linkingSlack = ref('')
const workflowName = ref('')
const slackChannel = ref('')
const slackMsg = ref('')
const chooseSlackChannel = ref('')
const refreshStr = ref('')
const cancelStr = ref('')
const saveContinueStr = ref('')

function setLocalizing(){
    slackNofi.value = translate('Slack Notifications')
    slackDesc.value = translate('Send a message to a Slack channel when a Google Form is submitted.')
    linkSlack.value = translate('Link your Slack account')
    linkingSlack.value = translate('Connecting to Slack...')
    workflowName.value = translate('Workflow Name')
    slackChannel.value = translate('Slack Channel')
    slackMsg.value = translate('Slack Message')
    chooseSlackChannel.value = translate('Choose Slack Channel...')
    refreshStr.value = translate('Refresh')
    cancelStr.value = translate('Cancel')
    saveContinueStr.value = translate('Save &amp; Continue')
}
onMounted(()=>{
    setLocalizing()
    formStore.getFormList(route.params.id, route.query.export)
    if(!route.params.id && !route.query.export){//新增，一定要在下面，因为getFormList里面有赋值
        resetStoreData(stored)
        stored.pdf_file_name = topSelectId
    }else{
        if (formStore.channelList.length > 0){
            hasLinkButton.value = false
            isShowSlackInfo.value = true
        }else{
            hasLinkButton.value = false
            refreshClick()
        }
    }
});
onUnmounted(()=>{
    isExit.value = true
    // console.log('onUnmounted')
    clearTimeout(dismissTimeout);
})
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function colorClick(tag){
    let list = formStore.textFormList;
    let curClrArray = colorArray.value;
    if (tag == 1){
    }else{
        list = formStore.smsFormList;
        curClrArray = colorArray2.value;
    }
    const colors = fm_colors;
    curClrArray.splice(0);
    for(var i=0; i<list.length; i++){
        const item = list[i];
        if(tag==1 && item.id=='submitterEmailAddress'){
            continue
        }
        const curColor = colors[i%colors.length];
        curClrArray.push({color:curColor, title:item.title, id:item.id});
    }
}
function colorBtnClick2(index){
    const title2 = colorArray2.value[index]?.title;
    if (title2){
        let insertValue = `{{${title2}}}`
        if (stored.pdf_template.slice(-1).trim() !== '') {//如果最后一个字符串不是空格
            insertValue = ' ' + insertValue
        }
        stored.pdf_template = stored.pdf_template + insertValue
    }
}

function cancelClick(){
    router.push({path:'/'})
}
let dismissTimeout = null;
function timeOut(){
    clearTimeout(dismissTimeout);
    dismissTimeout = setTimeout(() => {
        clearTimeout(dismissTimeout);
        fetchAllChannel()
  }, 2000);
}
function linkToSlack(){
    loading.value = true
    google.script.run.withSuccessHandler((resStr) => {
        window.open(resStr, "_blank");
        hasLinkButton.value = false
        connectingSlack.value = true
        loading.value = false
        fetchAllChannel()
    })
    .withFailureHandler((error) => {
        hasLinkButton.value = true
        connectingSlack.value = false
        loading.value = false
        fmDialogError.value.openModal(error.message)
    })
    .startAuthFlow();
}
function refreshClick(){
    isShowSlackInfo.value = false
    connectingSlack.value = true
    fetchAllChannel(true)
}
function fetchAllChannel(hasToken){
    google.script.run.withSuccessHandler((res) => {
        if (res?.auth_url){
            window.open(res.auth_url, "_blank");
            timeOut()
            return
        }
        if (!res?.channels && !isExit.value){
            timeOut()
            return
        }
        connectingSlack.value = false
        isShowSlackInfo.value = true
        formStore.channelList = [{id:topSelectId,name:chooseSlackChannel.value}, ...res.channels]
    })
    .withFailureHandler((error) => {
        hasLinkButton.value = true
        connectingSlack.value = false
        loading.value = false
        fmDialogError.value.openModal(error.message)
    })
    .fetchSlackAllChannel(hasToken);
}

async function saveButtonClickPre() {
    const lastSegment = route.path.split('/').filter(Boolean).pop();
    const params = formStore.submitChanges(route.params.id);
    if (!params){
        console.log('没有要改变的数据')
        router.push({path:'/'})
        return;
    }
    if (!route.params.id){//新增
        params.ext1 = lastSegment
    }
    await saveButtonClick(params)
}

async function saveButtonClick(params){
    if(!stored.notification_name){
        resendToast.value.show('Please provide a name for your workflow')
        return
    }
    if (stored.pdf_file_name == topSelectId){
        resendToast.value.show('Please select a channel')
        return
    }
    if(!stored.pdf_template){
        resendToast.value.show('Please provide a message to send')
        return
    }
    startLoading()
    let url = 'email/info/add'
    if (route.params.id){
        url = 'email/info/edit'
    }
    const res = await httpPost(url, params);
    if(res.code === 1){
        endLoading()
        if (res.message.includes('This script has too many triggers.')){
            isShowLimitExceed.value = true
        }else{
            fmDialogError.value.openModal(res.message)
        }
        return
    }
    const data = res.data
    if (res.error_msg){
        endLoading()
        fmDialogError.value.openModal(res.error_msg)
        // fmToastTip(res.error_msg)
        return
    }
    else if (Array.isArray(data)){//新增数据以后，返回全部列表，用于刷新数据
        console.log('返回数组')
        handerDashArray(data)
    }else if (data && data.id){//编辑以后，返回当前数据
        editFinish(formStore, data)
    }
    endLoading()
    showSucToast()
    router.push({path:'/'})
}
</script>