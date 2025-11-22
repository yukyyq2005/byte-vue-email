<template>
    <div>
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg></span><p class="max-w-2xl truncate">AI Studio</p></div></div> -->
        <div class="px-6 py-8"><div class="bg-white">
            <div v-show="!isAddMarks">
                <p class="text-base font-semibold text-gray-900">{{ aiTitle }} ✨</p>
                <p class="text-sm leading-5 text-gray-500">{{ aiDesc }}</p>
                <div class="my-4 border-t border-gray-200"></div>
            </div>
            
            <div v-show="!isAddMarks" class="grid grid-cols-8 gap-x-4 gap-y-6">
                <div class="col-span-2">
                <div class="flex justify-between items-end"><label for="m5kok267" class="block text-sm font-medium text-gray-700">{{ aiProvider }}</label></div>
                <div class="rounded-md shadow-sm mt-1">
                    <select v-model="aiProviderSel" id="m03oekpf" name="AI_PROVIDER" class="yq-arrow block w-full  pl-3 pr-10 py-2 border-gray-300 text-sm rounded-md">
                        <option v-for="(name,index) in aiProviderList" :disabled="index===0">{{ name }}</option>
                    </select>
                </div>
                </div>
                <div v-if="isHasProvider" class="col-span-3">
                    <div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ apiKeyDesc }}</label></div>
                    <div class="mt-1"><input v-model="inputAPIKey" name="AI_KEY" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" placeholder="Provide API key for OpenAI" value=""></div>
                </div>
                <div v-if="isVerifyVisible" class="col-span-2 mt-6">
                    <button @click="verifyClick" title="Verify API Key" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Verify Key</button>
                </div>
                <!-- select model -->
                <div v-if="isKeySuccess" class="col-span-3">
                    <div class="flex justify-between items-end"><label for="m5kr7j87" class="block text-sm font-medium text-gray-700">Model</label></div>
                    <div class="rounded-md shadow-sm mt-1">
                        <select v-model="selectModel" id="m03oekpf" name="AI_PROVIDER" class="yq-arrow block w-full  pl-3 pr-10 py-2 border-gray-300 text-sm rounded-md">
                            <option v-for="(name,index) in selectModelList">{{ name }}</option>
                        </select>
                    </div>
                </div>
                <!-- AI Markers -->
                <div v-if="isShowMarkUI" class="col-span-full">
                    <span class="block text-sm font-medium text-gray-700">AI Markers</span>
                    <ul class="mt-1 divide-y divide-gray-100 rounded-md border border-gray-200">
                        <li  v-for="item in aiMarkersList" :key="item.id" class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div class="flex w-0 flex-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 flex-shrink-0 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg><div @click="editClick(item)" class="flex min-w-0 flex-1 truncate cursor-pointer"><p class="ml-2 font-medium tracking-tight text-gray-700 min-w-28 truncate" :title=item.name ><span v-pre>{{</span>{{ item.name }}<span v-pre>}}</span></p><p class="ml-3 text-gray-500 truncate" :title="item.content">{{ item.content }}</p></div></div><div class="ml-3 flex-shrink-0"><button class="font-medium text-indigo-500 hover:text-indigo-800 transition duration-200" :title="`Edit prompt for marker {{${item.name}}}`" @click="editClick(item)">{{editStr}}</button><button class="ml-3 font-medium text-indigo-500 hover:text-red-500 transition duration-200" :title="`Delete marker {{${item.name}}}`" @click="deleteClick(item)" >{{delStr}}</button></div>
                        </li>
                    </ul>
                </div>
                <!-- Add Markers -->
                <div v-if="isShowMarkUI" class="col-span-full">
                    <button @click="addMarkersClick" title="Add New AI Marker" type="button" class="inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-indigo-50/50"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="-ml-0.5 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg>{{ addNewMark }}</button>
                </div>
            </div>

            <div v-show="isAddMarks" class="grid grid-cols-8 gap-x-4 gap-y-6">
                <div class="col-span-4">
                    <div class="flex justify-between items-end"><label class="block text-sm font-medium text-gray-700">{{ aiMark }}</label></div>
                    <div class="mt-1"><input v-model="aiMakerName" name="" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" maxlength="50" :placeholder="namePlaceholder" value=""></div>
                    <p class="mt-2 text-xs text-gray-500">{{ markAi }}</p>
                </div>
                <div class="col-span-7">
                    <label for="m3jq3msr" class="block text-sm font-medium text-gray-700">{{ aiPrompt }}</label>
                    <Popover class="relative mt-1">
                        <PopoverButton @click="colorClick()" class="cursor-pointer absolute right-1 top-2 flex items-start focus:outline-none ml-4" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-6 w-6 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <textarea v-model="aiPromptContent" :placeholder="promptPlaceholder" ref="myTextarea" class="p-2 border border-gray-300 rounded-md shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs pr-12 font-mono" id="m0dvkwlx" name="PDF Template" rows="4" autocorrect="off" type="text"></textarea>
                        <PopoverColor @colorBtnClick="colorBtnClick" :colorArray="colorArray" />
                    </Popover>
                </div>
                <div class="col-span-full flex">
                    <button @click="saveMarkerClick" type="button" class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">{{ saveMarker }}</button>
                    <button @click="cancelMarkerClick" title="Discard changes" type="button" class="ml-2 rounded bg-white px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">{{ cancelStr }}</button>
                </div>
            </div>

            <!-- 底部按钮 -->
            <div v-show="!isAddMarks" class="col-span-full">
                <div class="mt-8 border-t border-gray-200 ">
                    <div class="flex items-center mt-6">
                        <div class="flex justify-items-start"><a @click.prevent="cancelClick" title="Discard all changes" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{ cancelStr }}</a></div>
                        <div class="flex justify-end flex-grow"><button @click="saveClick" title="Save" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" v-html="saveContinueStr"></button></div>
                    </div>
                </div>
            </div>
        </div></div>
    </div>
    <ResendLoading :loadText="resendLoadText"/>
    <ResendToast ref="resendToast" />
    <FMDialogError ref="fmDialogError"/>
</template>
<script setup>
import { Popover, PopoverButton } from '@headlessui/vue';
import PopoverColor from '@/components/PopoverColor.vue';
import { fm_colors } from '@/assets/sharedConstants';
import ResendLoading from '@/components/ResendLoading.vue';
import ResendToast from '@/components/ResendToast.vue';
import FMDialogError from '@/components/FMDialogError.vue';
import { ref, watch ,onMounted, inject} from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '@/stores/form';
import { translateLocale } from '@/assets/language';

const aiProviderSel = ref('None')
const inputAPIKey = ref('')
const selectModel = ref('Select model...')
const aiMarkersList = ref([])

const apiKeyDesc = ref('')
const aiProviderList = ref(['Select AI provider...','OpenAI','Gemini','None'])
const selectModelList = ref(['Select model...'])
const resendLoadText = ref('')
const resendToast = ref(null)
const isShowMarkUI = ref(false)
const isAddMarks = ref(false)
const colorArray = ref([]);
const aiMakerName = ref('')
const aiPromptContent = ref('')
const editId = ref('')
const formStore = useFormStore();
const router = useRouter()
const fmDialogError = ref(null)
const showSucToast = inject('showSucToast-key')

aiMarkersList.value.push({id:"1",name:"AI TLDR", content:"Create a short summary highlighting the key takeaways from the response to the following questions: {{All Questions}} Do not use more than 50 words"})
aiMarkersList.value.push({id:"2",name:"AI Summary", content:"Compose a comprehensive summary of the responses to the following questions and answers: {{All Questions}} Limit your summary to 100 words for brevity and clarity"})
aiMarkersList.value.push({id:"3",name:"AI Insights", content:"Suggest actionable insights and improvements from the answers provided to the following questions: {{All Questions}} Use a maximum of 5 bullet points, each preferably one sentence, and at most two sentences."})
aiMarkersList.value.push({id:"4",name:"AI Sentiment", content:"Assess and summarize the overall sentiment expressed in the responses to the following questions: {{All Questions}} Keep your summary informative, insightful, and succinct"})


const isVerifyVisible = ref(!!inputAPIKey.value); 
const isHasProvider = ref(false)
const isKeySuccess = ref(false)
const keySuccessValue = ref('')
setOriData()

const aiTitle = ref('')
const aiDesc = ref('')
const aiProvider = ref('')
const markAi = ref('')
const addNewMark = ref('')
const aiMark = ref('')
const aiPrompt= ref('')
const saveMarker = ref('')
const namePlaceholder = ref('')
const promptPlaceholder = ref('')
const editStr = ref('')
const delStr = ref('')
const cancelStr = ref('')
const saveContinueStr = ref('')

function setLocalizing(){
    aiTitle.value = translate('AI Studio - Prompt Builder')
    aiDesc.value = translate("Choose between OpenAI's GPT-3 or Google's Gemini Pro models to generate personalized form responses.")
    aiProvider.value = translate('AI Provider')
    markAi.value = translate('Please prefix the marker names with AI')
    addNewMark.value = translate('Add New Marker')
    aiMark.value = translate('AI Marker')
    aiPrompt.value = translate('AI Prompt')
    saveMarker.value = translate('Save Marker')
    namePlaceholder.value = translate('Enter marker name...')
    promptPlaceholder.value = translate('Enter AI prompt here...')
    editStr.value = translate('Edit')
    delStr.value = translate('Delete')
    cancelStr.value = translate('Cancel')
    saveContinueStr.value = translate('Save &amp; Continue')
}
watch(() => inputAPIKey.value, (newValue) => {
    isVerifyVisible.value = !!newValue;
    if (keySuccessValue.value){
        if (newValue == keySuccessValue.value) {
            isKeySuccess.value = true
        } else {
            isKeySuccess.value = false
        }
        isVerifyVisible.value = !isKeySuccess.value
    }
});
watch(() => selectModel.value, (newValue) => {
    if (newValue.toLowerCase().startsWith('select model')) {
        isShowMarkUI.value = false
    }else{
        isShowMarkUI.value = true
    }
});
watch(() => aiProviderSel.value,(newValue) => {
    //全部重置
    inputAPIKey.value = ''
    keySuccessValue.value = ''
    isKeySuccess.value = false
    if (newValue.toLowerCase() == "none") {
        isHasProvider.value = false
        isKeySuccess.value = false
        isShowMarkUI.value = false
    } else {
        apiKeyDesc.value = newValue+' API Key'
        isHasProvider.value = true
    }
    selectModel.value = 'Select model...'
});
function editClick(item){
    isAddMarks.value = true
    aiMakerName.value = item.name
    aiPromptContent.value = item.content
    editId.value = item.id
}
function deleteClick(item){
    for (let i = 0; i < aiMarkersList.value.length; i++) {
        if (aiMarkersList.value[i].id === item.id) {
            aiMarkersList.value.splice(i, 1);
            break;
        }
    }
}
function addMarkersClick(){
    isAddMarks.value = true
    editId.value = ''
}
function saveMarkerClick(){
    resendToast.value.stopToast()
    const content = aiPromptContent.value.trim()
    if (!content){
        resendToast.value.show("Please enter a prompt")
        return
    }
    let name = aiMakerName.value.trim()
    if (!name){
        resendToast.value.show("Please enter a marker name")
        return
    }
    if (!name.toLowerCase().startsWith('ai')){
        name = "AI "+name
    }
    isAddMarks.value = false
    if (editId.value){
        for (let i = 0; i < aiMarkersList.value.length; i++) {
            let element = aiMarkersList.value[i]
            if (element.id === editId.value) {
                element.name = aiMakerName.value
                element.content = aiPromptContent.value
                break;
            }
        }
    } else {
        let id = Date.now() + ""
        aiMarkersList.value.push({ id: id, name: name, content: content })
    }
    aiMakerName.value = ''
    aiPromptContent.value = ''
}
function cancelMarkerClick(){
    isAddMarks.value = false
    aiMakerName.value = ''
    aiPromptContent.value = ''
}
function colorClick(){
    let list = formStore.aiFormList;
    let curClrArray = colorArray.value;
    const colors = fm_colors;
    curClrArray.splice(0);
    for(var i=0; i<list.length; i++){
        const item = list[i];
        if(item.id=='submitterEmailAddress'){
            continue
        }
        const curColor = colors[i%colors.length];
        curClrArray.push({color:curColor, title:item.title, id:item.id});
    }
}
function colorBtnClick(index){
    const title2 = colorArray.value[index]?.title;
    if (title2){
        let insertValue = `{{${title2}}}`
        if (aiPromptContent.value.slice(-1).trim() !== '') {//如果最后一个字符串不是空格
            insertValue = ' ' + insertValue
        }
        aiPromptContent.value = aiPromptContent.value + insertValue
    }
}
function cancelClick(){
    router.push({path:'/'})
}
function setOriData(){
    let aiApiKey = formStore.aiStudioData.ai_api_key
    if (formStore.aiStudioData.ai_provider){
        aiProviderSel.value = formStore.aiStudioData.ai_provider
        if (aiProviderSel.value.toLowerCase() != "none") {
            isHasProvider.value = true
            if (aiApiKey) {
                keySuccessValue.value = aiApiKey
                isKeySuccess.value = true
                isVerifyVisible.value = !isKeySuccess.value
                apiKeyDesc.value = aiProviderSel.value + ' API Key'
            }
            if (!formStore.aiStudioData.ai_model.toLowerCase().startsWith('select model')) {
                isShowMarkUI.value = true
            }
        }
    }
    if (aiApiKey){
        inputAPIKey.value = aiApiKey
    }
    if (formStore.aiStudioData.ai_model){
        selectModel.value = formStore.aiStudioData.ai_model
    }
    if (formStore.aiStudioData.ai_model_list){
        const list = JSON.parse(formStore.aiStudioData.ai_model_list)
        if (list){
            selectModelList.value = ['Select model...', ...list]
        }
    }
    if (formStore.aiStudioData.ai_markers){
        aiMarkersList.value = JSON.parse(formStore.aiStudioData.ai_markers)
    }
}
onMounted(() => {
    setLocalizing()
    setOriData()
    if (formStore.isEnterAiStudioPage){
        return
    }
    formStore.isEnterAiStudioPage = true
    if (aiProviderSel.value.toLowerCase() != "none") {
        if (inputAPIKey.value && !selectModel.value.toLowerCase().startsWith('select model')) {
            resendLoadText.value = "Validating API key..."
            verifyAPiKeyValid(inputAPIKey.value, true)
        }
    }
});
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function saveClick(){
    let modelList = [...selectModelList.value]
    modelList = modelList.filter(item => item !== 'Select model...');
    let data = {ai_provider:aiProviderSel.value, ai_api_key:inputAPIKey.value, ai_model:selectModel.value, ai_model_list:JSON.stringify(modelList), ai_markers:JSON.stringify(aiMarkersList.value)}
    resendToast.value.stopToast()
    
    if (aiProviderSel.value.toLowerCase() != 'none'){
        if (!inputAPIKey.value){
            resendToast.value.show("Please enter the API key for "+aiProviderSel.value)
            return
        }
        if(!isKeySuccess.value){
            resendToast.value.show("Please click the 'Verify Key' button to validate the API Key first.")
            return
        }
    }
    if (isKeySuccess.value){
        if (selectModel.value.toLowerCase().startsWith('select model')){
            resendToast.value.show("Please choose a model for "+aiProviderSel.value)
            return
        }
        if (selectModelList.value.indexOf(selectModel.value) === -1){
            resendToast.value.show("Please choose a model for "+aiProviderSel.value)
            return
        }
    }
    resendLoadText.value = "Saving..."
    google.script.run.withSuccessHandler((res) => {
        resendLoadText.value = ''
        for (const key in res){
            formStore.aiStudioData[key] = res[key]
        }
        showSucToast('Saved successfully')
        cancelClick()
    })
    .withFailureHandler((error) => {
        resendLoadText.value = ''
        fmDialogError.value.openModal(error.message)
    })
    .addAIStudio(data);
}
function verifyClick(){
    const newAPIKey = inputAPIKey.value.trim()
    resendToast.value.stopToast()
    resendLoadText.value = "Working..."
    verifyAPiKeyValid(newAPIKey)
    // setTimeout(()=>{
    //     resendLoadText.value = ''
            
    //     let list = ["1","3"]
    //         resendToast.value.show(`Found ${list.length} models..`)
    //         selectModelList.value = ['Select model...', ...list]

    //         isKeySuccess.value = true
    //         isVerifyVisible.value = !isKeySuccess.value
    //         keySuccessValue.value = newAPIKey
    //         inputAPIKey.value = newAPIKey
          

    // },100)
}
function verifyAPiKeyValid(newAPIKey, check){
    google.script.run.withSuccessHandler((res) => {
        resendLoadText.value = ''
        if (res.list && res.list?.length){

            selectModelList.value = ['Select model...', ...res.list]
            if (check){
                resendToast.value.show("API key is valid.")
                return
            }
            resendToast.value.show(`Found ${res.list.length} models..`)

            isKeySuccess.value = true
            isVerifyVisible.value = !isKeySuccess.value
            keySuccessValue.value = newAPIKey
            inputAPIKey.value = newAPIKey
            return
        }
        if (check){
            isKeySuccess.value = false
            isVerifyVisible.value = !isKeySuccess.value
            keySuccessValue.value = ''
        }
        if (res?.error?.message){
            resendToast.value.show(res.error.message)
        }else{
            let url = ''
            if (aiProviderSel.value.toLowerCase() == 'gemini') {
                url = 'https://aistudio.google.com/app/apikey'
            } else if (aiProviderSel.value.toLowerCase() == 'openai') {
                url = 'https://platform.openai.com/account/api-keys'
            }
            if (url) {
                url = ' You can find your API key at ' + url + '.'
            }
            resendToast.value.show(`Incorrect API key provided: ${newAPIKey}.` + url)
        }
    })
    .withFailureHandler((error) => {
        resendLoadText.value = ''
        fmDialogError.value.openModal(error.message)
    })
    .verifyAIStudio(newAPIKey, aiProviderSel.value.toLowerCase());
}

</script>