import { defineStore } from "pinia";
import { computed, ref,watch } from "vue";
import { FM_CONSTANTS, getCommonOption, isChoiceOption, handerField, handerCondition } from "@/assets/sharedConstants";
// import { httpGet, httpPost } from "@/assets/http";
import { translateLocale } from "@/assets/language";

export const useFormStore = defineStore('formstore', () =>{
    const localeSelect = ref('en')
    const serverData = ref(initialServerData())
    const originalData = {}
    
    const textFormList = computed(() => {
        const array = []
        for(const item of allFormList.value){
            if(item.type === 'TEXT' || item.type === 'PARAGRAPH_TEXT' || item.type === 'EMAIL'){
                array.push(item)
            }
        }
        return array
    });
    const emailBodyFormList = computed(() => {
        const aiList = getAIStudioList()
        return [...oriFormList.value, ...aiList, ...getInputMarkers(),{id:"allAnswers", title:"All Answers"},
        {id:"formUrl",title:"Form URL"},{id:"responseEditUrl",title:"Response Edit URL"},
        {id:"fullResponse",title:"Full Response"}]
    });
    const smsFormList = computed(() => {
        const aiList = getAIStudioList()
        return [...oriFormList.value, ...aiList, ...getInputMarkers()]
    });


    const conditionFields = computed(() => [{id:0, title:"Select field..."}, ...allFormList.value]);

    const oriFormList = ref([])
    const allFormList = ref([])
    const aiFormList = ref([])

    const formIdMap = ref({})
    const formSenderEmailArray = ref([])
    const userPro = ref(0)
    const userPayment = ref(0)//是否付款
    const userTrial = ref(false)
    const userDesc = ref("")
    const emailSubject = ref('{{Form Name}} - New Response Received')
    const emailContent = ref('<p>Your form {{Form Name}} has a new entry. Here are all the answers.</p><p>{{All Answers}}</p>')
    const isFirstEnterApp = ref(true)
    const dashArray = ref([])
    const activeEmail = ref("jaosb0173@gmail.com")//默认值，给开发环境用
    const fmAccessToken = ref('')
    const isHasTrigger = ref(false)
    const limiterData = ref({})
    const aiStudioData = ref({})
    const isEnterAiStudioPage = ref(false)
    let idCounter = 1;
    const exportRuleData = ref({})
    const channelList = ref([])

    async function getFormList(targetId, exportRule){

        resetServerData()//重置参数，不然页面会显示上一次的UI数据
        // 先重置，然后再加载表单数据，不能搞反了
        if(!targetId || exportRule){//新增
            if (!exportRule){
                //一定要放之类，不然非邮件类型导入的时候，会产生send_condition_array
                serverData.value.send_condition_array.splice(0);
                const el = addConditionSetClick();
                handerConditionElement(el)
                setDefalutValue()//新增才需要设置默认值
            }
            setEmailAddress()//这里一定要放这里，因为里面有设置email参数，此参数是服务器存储必填
            if (exportRule){
                parseExportRule(exportRuleData.value)
            }
            exportRuleData.value = {}//重置
            return
        }
        // const res = await httpGet('email/info/get?id='+targetId);
        // const data = res.data;
        const data = dashArray.value.find(item => item.id == targetId);
        // 将服务器数据解析到本地，需要把数组对应的json字符串解析成json数组对象
        parseServerData(data)
        setEmailAddress()
        if(import.meta.env.VITE_API_BASE_URL){
            console.log("服务器返回数据");
            console.log(JSON.parse(JSON.stringify(data)));

            console.log("服务器原始数据")
            console.log(JSON.parse(JSON.stringify(originalData.value)))

            console.log("服务器数据，解析到本地数据")
            console.log(JSON.parse(JSON.stringify(serverData.value)))
        }
        //处理条件通知的option选项的逻辑，因为前面的selectfield会影响到后面，所以要根据前面的选项来决定后面的选项
        if (serverData.value.send_condition_array.length > 0){
            for (const item of serverData.value.send_condition_array){
                for (const el of item.ifArray){
                    handerConditionElement(el)
                }
                for (const el of item.orAndArray){
                    handerConditionElement(el)
                }
            }
        }else if (!data.ext1){//这里是为了异常处理，一般情况不会调用
            console.log('服务器没有condition数据')
            serverData.value.send_condition_array.splice(0);
            const el = addConditionSetClick();
            handerConditionElement(el)
        }
        // return;
        // el.selectedField = '1';
        // el.selectedCondition = 'Equals';
        // el.selectedValue = "2";
        // el.valuesList = [{title:'aa'}];

        // addConditionSetClick();
        // let array0 = serverData.value.send_condition_array[0];
        // // console.log(array0);
        // let orAndArray = array0.orAndArray;
        // const object = {id:idCounter++, link:"OR", ...getCommonOption()};
        // // object.link = 'AND';
        // object.selectedField = '1';
        // object.selectedCondition = 'Equals';
        // object.selectedValue = "2";
        // object.valuesList = [{title:'aa'}];
        // array0.notifyArray = [{id:2,title:"ddd"}];
        // orAndArray.push(object);
        // handerConditionElement(el);
        // handerConditionElement(object);
        // el.selectedCondition = 'Greater than';
        // console.log(JSON.stringify(serverData.value.send_condition_array));
    }
    function parseExportRule(data){
        for (const key in data){
            const value = data[key]
            if (key === 'sender_email_address'){
                if (formSenderEmailArray.value.indexOf(value) !== -1){
                    serverData.value[key] = value
                }else{
                    continue//因为前面setEmailAddress有赋值，所以这里不用赋值也行
                }
            }else if (key === 'nofity_respondent_field'){
                var isFind = false
                for (const item of textFormList.value){
                    if (item.id == value){
                        isFind = true
                        break
                    }
                }
                if (isFind){
                    serverData.value[key] = value
                }else{
                    continue//因为上面有resetServerData数据，所以这里不用赋值也行
                }
            }
            serverData.value[key] = value
        }
        if (data['type']){
            serverData.value['ext1'] = data['type']
            if (data['type'] == 'sms'){
                serverData.value['sender_name'] = data['sid']
                serverData.value['email_subject'] = data['token']
                serverData.value['email_body'] = data['sender_phone']
                serverData.value['pdf_file_name'] = data['recipient_phone']
                serverData.value['pdf_template'] = data['body']
            }else{
                if (data['url']){
                    serverData.value['pdf_file_name'] = data['url']
                }
                if (data['body']){
                    serverData.value['pdf_template'] = data['body']
                }
            }
            delete serverData.value['sid']
            delete serverData.value['token']
            delete serverData.value['sender_phone']
            delete serverData.value['recipient_phone']
            delete serverData.value['url']
            delete serverData.value['body']
            delete serverData.value['type']
            delete serverData.value['sender_email_address']
        }
        if (serverData.value.send_condition_array.length > 0){
            for (const item of serverData.value.send_condition_array){
                for (const el of item.ifArray){
                    handerConditionElement(el)
                }
                for (const el of item.orAndArray){
                    handerConditionElement(el)
                }
            }
        }
    }
    function parseServerData(data){
        //先处理data的布尔型数据
        for(const key in data){
            if (key.startsWith('is_') && Number.isInteger(data[key])){
                if (data[key] == 1){
                    data[key] = true
                }else{
                    data[key] = false
                }
            }
        }
        // originalData.value = data;//原来用的这个方法，因为appscript会自动把null的字段删除掉，所以这样会有bug，导致判断编辑的时候，无法保存修改的内容
        originalData.value = {...serverData.value};//不能乱调换位置
        for (const key in originalData.value){
            if ((typeof originalData.value[key]) === 'object'){
                // console.log('是对象 ', key)
                originalData.value[key] = JSON.stringify(originalData.value[key])
            }
        }
        for (const key in data){
            const value = data[key]
            originalData.value[key] = value
            if (value){
                if (key.endsWith('_array')){
                    const jsonObj = JSON.parse(value)
                    if (jsonObj){
                        serverData.value[key] = jsonObj
                    } 
                }else{   
                    serverData.value[key] = value
                }
            }
        }
    }
    function initialServerData(){
        return {
            notification_name:'',
            sender_name:'',
            sender_email_address:'',
            reply_email_address_array:[],
            email_subject:'',
            email_body:'',
    
            to_recipients_array:[],
            cc_recipients_array:[],
            bcc_recipients_array:[],
            is_notify_respondent:false,
            nofity_respondent_field:0,
            is_send_condition_notification:true,
            send_condition_array:[],
            no_condition_match_notify_array:[],
    
            is_generate_pdf_file:false, 
            pdf_file_name:'',
            pdf_template:'',
            google_drive_url:''
        }
    }
    function resetServerData(){
        // console.log("resetData")
        for (const key in serverData.value) {
            let curValue = serverData.value[key]
            if(Array.isArray(curValue)){
                serverData.value[key] = [] 
            }else if((typeof curValue) === 'boolean'){
                serverData.value[key] = false
            }else if((typeof curValue) === 'string'){
                serverData.value[key] = ''
            }else if((typeof curValue) === 'number'){
                serverData.value[key] = 0
            }
        }
    }
    function handerConditionElement(el){
        // 判断数组是否有，没有的话，就默认第一个位置
        // console.log(el.selectedField)
        // console.log(conditionFields.value);
        el.isRequired = true;//初始值
        el.showPlaceholder = true;//初始值
        el.isShowMoreBtn = false;//初始值
        el.isShowArray = false;//是否显示数组value
        el.isShowSelectValue = false//初始值
        if(!conditionFields.value.some((old)=>old.id==el.selectedField)){
            el.selectedField = conditionFields.value[0].id;
            console.log("没有找到field, 默认第一个: "+el.selectedField);
        }
        //IF后面的select用 conditionFields.value，因为他是固定的
        const type = isChoiceOption(el.selectedField, conditionFields.value);
        if (type===FM_CONSTANTS.CHOICE && el.selectedCondition==="Equals"){
            el.isShowSelectValue = true
        }
        const valuesList = getColorListByFormId(el.selectedField);
        el.optionConditions = FM_CONSTANTS.allOptionConditions;//默认全部
        handerField(type, el, valuesList);
        // 判断数组是否有，没有的话，就默认第一个位置（一定要放handerField和handerCondition之间）
        if(!el.optionConditions.some((old)=>old==el.selectedCondition)){
            el.selectedCondition = FM_CONSTANTS.SELECT_CONDITION;
            console.log("没有找到condition, 默认第一个: "+el.selectedCondition);
        }
        handerCondition(type, el, valuesList);
    }
    function setDefalutValue(){
        serverData.value.email_subject = emailSubject.value
        serverData.value.email_body = emailContent.value
        serverData.value.to_recipients_array = [{title:activeEmail}]
        serverData.value.pdf_file_name = '{{Form Name}} {{Response Number}}'
        serverData.value.pdf_template = '{{All Answers}}'
    }
    function setEmailAddress(){
        const formEmail = activeEmail.value
        if (!serverData.value.sender_email_address){//新增的时候会到这里来
            if (formSenderEmailArray.value.length > 0){
                serverData.value.sender_email_address = formSenderEmailArray.value[0]
            }else{
                serverData.value.sender_email_address = formEmail
            }
        }
        serverData.value.email = formEmail
    }
    function submitChanges(Id){
        let printLog = import.meta.env.VITE_API_BASE_URL
        const changedData = {};
        if(!Id){//新增
            console.log(JSON.stringify(serverData.value))
            for (const key in serverData.value) {
                let curValue = serverData.value[key]
                //数组或字典都是object，本应用目前只用到了数组，把数组对象转为数组字符串存在服务器
                if ((typeof curValue) === 'object'){
                    curValue = JSON.stringify(curValue)
                }
                if (curValue){
                    changedData[key] = curValue;
                }
            }
            if(printLog){
                console.log("新增数据")
                console.log(changedData)
            }
            return changedData
        }
        changedData.id = originalData.value.id
        if(printLog){
            console.log('原始数据:')
            console.log(JSON.parse(JSON.stringify(originalData.value)))
            console.log('编辑过的数据')
            console.log(JSON.parse(JSON.stringify(serverData.value)))
        }
        for (const key in originalData.value) {
            let originaValue = originalData.value[key]
            if ((typeof originaValue) === 'object'){
                originaValue = JSON.stringify(originaValue)
            }
            let curValue = serverData.value[key]
            if ((typeof curValue) === 'object'){ //数组或字典都是object，本应用目前只用到了数组，把数组对象转为数组字符串存在服务器
                curValue = JSON.stringify(curValue)
            }
            if (originaValue !== curValue) {
                if (curValue!=null && curValue!=undefined){
                    changedData[key] = curValue;
                }else{
                    changedData[key] = originaValue;
                }
                // console.log(originaValue)
                // console.log(curValue)
                // console.log('不同的数据:', key, changedData[key])
            }
        }

        if(Object.keys(changedData).length > 1){
            if (printLog){
                console.log('编辑数据: ', changedData);
            }
            return changedData;
        }else{
            if(printLog){
                console.log("没有要改变的数据")
            }
        }
        return null;
    }
    function getColorListByFormId(id){
        // console.log(formIdMap.value)
        const idValues = formIdMap.value[id]
        // console.log(idValues)
        const array = []
        if(idValues){
            for (const value of idValues){
                array.push({id:value, title:value})
            }
        }
        return array
    }
    function addConditionSetClick(){
        const model = {id:Date.now()+idCounter++, ...getCommonOption()};
        serverData.value.send_condition_array.push({id:Date.now()+idCounter++, ifArray:[model], orAndArray:[], notifyArray:[]});
        return model;
    }
    function initFormTestData(){
        const totalFormList = [{id:1, type:"MULTIPLE_CHOICE", title:"单选"}, 
            {id:2, type:"FILE_UPLOAD", title:"文件上传"}, {id:3, type:"SCALE", title:"线性量变"}, {id:4, type:'TEXT', title:'简短回答'}]
        formIdMap.value = {1:["option 1", "option 2"]}
        allFormList.value = [...totalFormList, 
            {id:"formId", title:"Form Id"}, {id:"formName", title:"Form Name"}, {id:"responseNumber", title:"Response Number"},
            {id:"responseDate", title:"Response Date"}, {id:"responseID", title:"Response ID"}];
        aiFormList.value = [...totalFormList, {id:"allQuestions", title:"All Questions"},
                {id:"responseDate", title:"Response Date"}];
                
    }
    function setLocalizing(){
        if (userPro.value > 0) {
            if (userPro.value == 1) {
                userDesc.value = translate("Standard Edition")
            } else {
                userDesc.value = translate("Enterprise Edition")
            }
        } else {
            if (userTrial.value) {
                userDesc.value = translate("Trial Edition")
            } else {
                userDesc.value = translate("Free Edition (Trial Expired)")
            }
        }
        emailSubject.value = translate('{{Form Name}} - New Response Received')
        emailContent.value = translate('<p>Your form {{Form Name}} has a new entry. Here are all the answers.</p><p>{{All Answers}}</p>')
    }
    function translate(key){
        return translateLocale(key, localeSelect.value)
    }
    function setHttpData(res){
        // res.user.pro = 1
        // res.user.trial = false
        userPro.value = res?.user?.pro
        userPayment.value = res?.user?.user_payment || 0
        userTrial.value = res?.user?.trial
        setLocalizing()

        if(res.activeEmail){
            activeEmail.value = res.activeEmail
        }
        if(res.accessToken){
            fmAccessToken.value = res.accessToken
        }
        if (res.hasTrigger){
            isHasTrigger.value = res.hasTrigger
        }
        if (res.limiterData){
            limiterData.value = res.limiterData
        }
        if (res.aiStudioData){
            aiStudioData.value = res.aiStudioData
        }
        if (import.meta.env.VITE_API_BASE_URL){//develop
            // limiterData.value = {
            //     "is_enable_form_limiter": true,
            //     "week_end_time": "08:28",
            //     "week_start_time": "06:27"
            // }
            // userPro.value = false
            // userPayment.value = true
            initFormTestData()
            formSenderEmailArray.value = [activeEmail.value, 'test'+activeEmail.value]
        }else{

            formIdMap.value = res.formMap
            formSenderEmailArray.value = res.formSendersEmail
            oriFormList.value = res.formList
            allFormList.value = [...oriFormList.value, ...getInputMarkers()];
            aiFormList.value = [...oriFormList.value, {id:"allQuestions", title:"All Questions"},
                {id:"responseDate", title:"Response Date"}];
        }
        // console.log(conditionFields.value)
        // console.log(emailBodyFormList.value)
        // console.log(textFormList.value)
    }
    function getInputMarkers(){
        return [{id:"formId", title:"Form Id"}, {id:"formName", title:"Form Name"}, 
            {id:"responseNumber", title:"Response Number"}, {id:"responseDate", title:"Response Date"}, {id:"responseID", title:"Response ID"}]
    }
    function getAIStudioList(){
        let aiList = []
        if (aiStudioData.value.ai_provider?.toLowerCase() != "none"){
            if (aiStudioData.value.ai_api_key && aiStudioData.value.ai_model?.toLowerCase()!="Select model..."){
                if (aiStudioData.value.ai_markers){
                    try{
                        let aiMarkers = JSON.parse(aiStudioData.value.ai_markers)
                        for (const item of aiMarkers) {
                            aiList.push({id:item.id, title:item.name})
                        }
                    }catch(e){}
                }
            }
        }
        return aiList
    }
    // computed
    // watch(()=>serverData.value.send_condition_array, (newValue)=>{
    //     console.log("watch send_condition_array");
    //     let newJson = JSON.parse(JSON.stringify(newValue[0]));
    //     newJson.ifArray[0].colorArray = null;
    //     newJson.ifArray[0].optionConditions = null;
    //     newJson.ifArray[0].optionValues = null;
    //     console.log(JSON.stringify(newJson));
    // }, {deep:true});
  
    return {localeSelect, textFormList, allFormList, aiFormList, emailBodyFormList, smsFormList, activeEmail, formSenderEmailArray, 
        fmAccessToken, isHasTrigger, limiterData, aiStudioData, isEnterAiStudioPage, conditionFields, serverData, isFirstEnterApp, 
        dashArray, userPro, userPayment, userTrial, userDesc, exportRuleData, channelList, 
        getFormList, getColorListByFormId, addConditionSetClick, submitChanges, setHttpData, initialServerData, setLocalizing};
});
