<template>
    <FMDialogError ref="fmDialogError"/>
    <ResendToast ref="resendToast"/>
    <LimitExceed v-if="isShowLimitExceed" @backButtonClick="isShowLimitExceed = false"/>
    <div v-show="!isShowLimitExceed">
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"></path></svg></span><p class="max-w-2xl truncate">Discord</p></div></div> -->
        <div class="px-6 py-6"><div class="bg-white">
            <!-- 中间控件 begin -->
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6"><p class="text-base font-semibold text-gray-900">{{ discordNofi }}</p><p class="text-sm leading-5 text-gray-500">{{ discordDesc }}</p></div>
                
                <div class="col-span-4"><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ workflowName }}</label></div><div class="mt-1"><input v-model="stored.notification_name" name="Rule Name" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div>
                <div class="col-span-4"><div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ webhookUrl }}</label></div><div class="mt-1"><input v-model="stored.pdf_file_name" name="url" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" value=""></div></div>
                <div class="col-span-5">
                    <label for="m3jq3msr" class="block text-sm font-medium text-gray-700">{{ messageBody }}</label>
                    <Popover class="relative mt-1">
                        <PopoverButton @click="colorClick(2)" class="cursor-pointer absolute right-1 top-2 flex items-start focus:outline-none ml-4" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <textarea v-model="stored.pdf_template" ref="myTextarea" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
                        <PopoverColor @colorBtnClick="colorBtnClick2" :colorArray="colorArray2" />
                    </Popover>
                </div>
            </div>
            <!-- 中间控件 end -->
            <!-- 底部按钮 begin -->
            <div class="col-span-full">
                <div class="mt-8 border-t border-gray-200 "><div class="flex items-center mt-6"><div class="flex justify-items-start">
                    <a @click.prevent="cancelClick" title="Discard all changes" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{ cancelStr }}</a>
                </div><div class="flex justify-end flex-grow">
                    <button  @click="saveButtonClickPre" title="Save" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" v-html="saveContinueStr"></button>
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
import { ref,onMounted,inject } from 'vue';
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
const myInput = ref(null)
const myTextarea = ref(null)
const resendToast = ref(null)

const discordNofi = ref('')
const discordDesc = ref('')
const workflowName = ref('')
const webhookUrl = ref('')
const messageBody = ref('')
const cancelStr = ref('')
const saveContinueStr = ref('')

function setLocalizing(){
    discordNofi.value = translate('Discord Notifications')
    discordDesc.value = translate('Automatically send a message to a Discord channel when a new form is submitted.')
    workflowName.value = translate('Workflow Name')
    webhookUrl.value = translate('Webhook URL')
    messageBody.value = translate('Message Body')
    cancelStr.value = translate('Cancel')
    saveContinueStr.value = translate('Save &amp; Continue')
}
onMounted(()=>{
    setLocalizing()
    formStore.getFormList(route.params.id, route.query.export)
    if(!route.params.id && !route.query.export){//新增，一定要在下面，因为getFormList里面有赋值
        resetStoreData(stored)
    }
});
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
    if(!stored.pdf_file_name){
        resendToast.value.show('Please provide a webhook URL')
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