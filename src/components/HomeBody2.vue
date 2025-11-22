<template>
    <!-- <div>{{ formStore.conditionFields }}</div> -->
    <div id="page-2">
        <div class="px-6 py-6">
            <!-- Email Recipients -->
            <p class="text-base font-semibold text-gray-900">{{ emailReci }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ emailReciDesc }}</p>
            <br>
            <div class="grid gap-x-4 grid-cols-3">
                <!-- TO Recipients -->
                <Recipient :currentTitle="toReci" :reciTag="'TO'" :dataArray="stored.to_recipients_array"  @addItem="addRecipient" @removeItem="removeRecipient"/>
                <!-- CC Recipients -->
                <Recipient :currentTitle="ccReci" :reciTag="'CC'" :dataArray="stored.cc_recipients_array"  @addItem="addRecipient" @removeItem="removeRecipient"/>
                <!-- BCC Recipients -->
                <Recipient :currentTitle="bccReci" :reciTag="'BCC'" :dataArray="stored.bcc_recipients_array"  @addItem="addRecipient" @removeItem="removeRecipient"/>
            </div>
            <br>
            <!-- Form Respondent -->
            <p class="text-base font-semibold text-gray-900">{{ respondent }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ respondentDesc }}</p>
            <br>
            <div class="flex items-center"><input v-model="stored.is_notify_respondent" id="m0531dwl" name="Notify Form Respondent" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="true" checked><label for="m0531dwl" class="ml-2 block text-sm text-gray-600">{{ notiRespondent }}</label></div>
            <div v-show="stored.is_notify_respondent">
                <br>
                <div class="flex justify-between items-end hidden"><label for="m05338v5" class="block text-sm font-medium text-gray-700"></label></div><div class="rounded-md shadow-sm">
                    <!-- @change="handleRespondentChange($event)" -->
                    <select v-model="stored.nofity_respondent_field" id="m05338v5" name="Email Field" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                        <option :value="item.id" v-for="(item,index) of nofityRespondents" :key="index">{{ item.title }}</option>
                    </select>
                </div>
            </div>
             <!-- line -->
            <br>
            <div class="border-t border-gray-200"></div>
            <br>
            <p class="text-base font-semibold text-gray-900">{{ condNoti }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ condNotiDesc }}</p>
            <br>
            <div class="flex items-center"><input @change="selectConditionNofi" v-model="stored.is_send_condition_notification" id="m05338v6" name="useLogic" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="true" checked><label for="m05338v6" class="ml-2 block text-sm text-gray-600">{{ sendCondNoti }}</label></div>
            <br v-show="!showPremium">
            <p v-if="showPremium" v-show="stored.is_send_condition_notification"class="mt-5 text-gray-600 text-sm">Sorry, the <b>conditional notifications</b> feature is only available to <a @click.prevent="premiumClick" href="" target="_blank" class="underline text-gray-700 font-semibold" rel="noreferrer">premium</a> users.</p>
            <div v-else-if="stored.is_send_condition_notification">
            <!-- <div v-show="stored.is_send_condition_notification"> -->
                <div v-for="(item,index) in stored.send_condition_array" :key="item.id">
                    <Condition :ifArray="item.ifArray" :orAndArray="item.orAndArray" :notifyArray="item.notifyArray" @addConditionSet="addConditionSetClick" @deleteConditionSet="delConditionSetClick(index)" @cloneConditionSet="cloneConditionSetClick(index)" :isShowAddButon="index+1 === stored.send_condition_array.length ? 1:0" :isShowDelButon="index === 0 ? 0:1" />
                </div>
                <!-- If none of the condition sets match the form answers: start -->
                <div class="rounded-lg bg-gray-50/50 shadow-sm ring-1 ring-gray-800/10 mb-8">
                    <div class="mt-4 border-t border-gray-900/5 px-6 py-6">
                        <div class="grid gap-x-2 grid-cols-9">
                            <div class="col-span-full text-gray-700 font-medium text-sm mb-4">{{ ifNone }}</div>
                            <!-- Nofify -->
                            <div class="col-span-1 mt-2"><div class="text-gray-700 font-medium text-sm text-right mr-2">{{notify}}</div></div>
                            <div class="col-span-8"> <ConditionNotify2 /> </div>
                        </div>
                    </div>
                </div>
                 <!-- If none of the condition sets match the form answers: end -->
            </div>
            <br v-show="showPremium">
            <!-- footer two button -->
            <div class="flex justify-between">
                <a @click.prevent="previousButtonClick" title="Go to the previous screen" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{previousStr}}</a>
                <button @click="continueButtonClick" type="button" class="ml-6 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">{{continueStr}}</button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { computed, ref,watch,onMounted } from 'vue';
import Condition from './Condition.vue';
import Recipient from './Recipient.vue';
import ConditionNotify2 from './ConditionNotify2.vue';
import { useFormStore } from '@/stores/form';
import { translateLocale } from '@/assets/language';

const emit = defineEmits(['previousPage', 'pageContinue']);
const formStore = useFormStore();
const stored = formStore.serverData;
const showPremium = ref(false)


const nofityRespondents = computed(() => [{id:0,title:selectEmailField}, ...formStore.textFormList]);

const emailReci = ref('')
const emailReciDesc = ref('')
const toReci = ref('')
const ccReci = ref('')
const bccReci = ref('')
const respondent = ref('')
const respondentDesc = ref('')
const notiRespondent = ref('')
const selectEmailField = ref('')
const condNoti = ref('')
const condNotiDesc = ref('')
const sendCondNoti = ref('')

const notify = ref('')
const ifNone = ref('')
const previousStr = ref('')
const continueStr = ref('')

function setLocalizing(){
    emailReci.value = translate('Email Recipients')
    emailReciDesc.value = translate('Specify one or more email addresses that your notifications are sent to.')
    toReci.value = translate('TO Recipients')
    ccReci.value = translate('CC Recipients')
    bccReci.value = translate('BCC Recipients')
    respondent.value = translate('Form Respondent')
    respondentDesc.value = translate('Would you like to send an email notification to the person who submitted the form?')
    notiRespondent.value = translate('Notify Form Respondent')
    selectEmailField.value = translate('Select email field...')
    condNoti.value = translate('Conditional Notifications')
    condNotiDesc.value = translate('You can send notifications to different recipients based on the answers submitted in the form.')
    sendCondNoti.value = translate('Send conditional notifications')
    notify.value = translate('Notify')
    ifNone.value = translate('If none of the condition sets match the form answers:')
    previousStr.value = translate('Previous')
    continueStr.value = translate('Continue')
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
onMounted(()=>{
    setLocalizing()
    if(stored.is_send_condition_notification){
        if(getShowPurchase()){
            showPremium.value = true
        }
    }
})
//点击以后，是否显示Premium功能
const selectConditionNofi = (event) => {
    if (!getShowPurchase()){
        return
    }
    //执行下面的代码才会显示premium相关的UI
    if(event.target.checked){
        showPremium.value = true
    }else{
        showPremium.value = false
    }
}
function getShowPurchase(){
    let showPurchase = false
    if (formStore.userPro==0 && !formStore.userTrial){
        showPurchase = true
    }
    return showPurchase
}
function premiumClick(){
    google.script.run.withSuccessHandler(() => {
    })
    .withFailureHandler((error) => {
    })
    .openPurchaseDialog();
}
// function handleRespondentChange(event){
//     const item = nofityRespondents.value[event.target.selectedIndex];
//     dataStore.setKeyValue("notiRespondent_selectEmail", item);
//     console.log(stored.nofity_respondent_field)
// }
// watch(()=>stored.send_condition_array, (newValue)=>{
//     let newJson = JSON.parse(JSON.stringify(newValue[0]));
//     newJson.ifArray[0].colorArray = null;
//     newJson.ifArray[0].optionConditions = null;
//     newJson.ifArray[0].optionValues = null;
// }, {deep:true});
// watch(()=>stored.to_recipients_array, ()=>{
//     console.log('xx')
// })

function addRecipient(item, reciTag){
    let curRecipients = stored.to_recipients_array;
    if(reciTag.startsWith("CC")){
        curRecipients = stored.cc_recipients_array;
    }else  if(reciTag.startsWith("BCC")){
        curRecipients = stored.bcc_recipients_array;
    }
    const isDuplicate = curRecipients.some(old => {
        if (item?.id) {
            return old.id === item.id;
        }
        return old.title === item?.title;
    });
    if (!isDuplicate && item){
        curRecipients.push(item);
    }
}
function removeRecipient(index, reciTag){
    let curRecipients = stored.to_recipients_array;
    if(reciTag.startsWith("CC")){
        curRecipients = stored.cc_recipients_array;
    }else  if(reciTag.startsWith("BCC")){
        curRecipients = stored.bcc_recipients_array;
    }
    curRecipients.splice(index, 1);
}

function addConditionSetClick(){
    formStore.addConditionSetClick();
}
function delConditionSetClick(index){
    if (stored.send_condition_array.length == 1){
        return;
    }
    stored.send_condition_array.splice(index,1);
}

function previousButtonClick(){
    emit('previousPage');
}
function continueButtonClick(){
    emit('pageContinue');
}
// 此功能比较复杂，后期在做，现在先把按钮屏蔽
function cloneConditionSetClick(index){
    // console.log(index);
    // const elementToCopy = send_condition_array.value[index];
    // console.log(elementToCopy);
    // elementToCopy.id = new Date().getTime();
    // if (index === length - 1) {
    //     send_condition_array.push(elementToCopy);
    // } else {
    //     send_condition_array.splice(index + 1, 0, elementToCopy);
    // }
}
</script>
