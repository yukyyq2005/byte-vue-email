<template>
    <FMDialogError ref="fmDialogError"/>
    <LimitExceed v-if="isShowLimitExceed" @backButtonClick="isShowLimitExceed = false"/>
    <div v-show="!isShowLimitExceed"  class="wrap">
        <HomeHeader @updatePage="updatePageAction" :currentPage="page" />
        <!-- <br> -->
        <HomeBody1 v-if="page == 1"      @pageContinue="updatePageAction(2)"/>
        <HomeBody2 v-else-if="page == 2" @previousPage="updatePageAction(1)" @pageContinue="updatePageAction(3)"/>
        <HomeBody3 v-else-if="page == 3" @previousPage="updatePageAction(2)" @saveButtonClick="saveButtonClick"/>
    </div>
</template>

<script setup>
import { ref,onMounted,inject } from 'vue';
import LimitExceed from '@/components/LimitExceed.vue';
const isShowLimitExceed = ref(false)
import FMDialogError from '@/components/FMDialogError.vue';
import HomeHeader from '@/components/HomeHeader.vue';
import HomeBody1 from '@/components/HomeBody1.vue';
import HomeBody2 from '@/components/HomeBody2.vue';
import HomeBody3 from '../components/HomeBody3.vue';
import { useFormStore } from '@/stores/form';
import { useRoute, useRouter } from 'vue-router';
import { httpPost } from '@/assets/http';
import { handerDashArray } from '@/assets/sharedConstants';
import { editFinish } from '@/assets/funUtils';

const startLoading = inject('startLoading-key');
const endLoading = inject('endLoading-key');
const showSucToast = inject('showSucToast-key')
const fmToastTip = inject('fmToastTip-key')
const formStore = useFormStore();
const route = useRoute()
const router = useRouter()
const page = ref(1);
const emit = defineEmits(['saveButtonClick']);
const fmDialogError = ref(null)


onMounted(()=>{
    formStore.getFormList(route.params.id, route.query.export)
});

function updatePageAction(index){
    page.value = index;
    window.scrollTo({ top: 0});
}
async function saveButtonClick(){
    const params = formStore.submitChanges(route.params.id);
    if (!params){
        console.log('没有要改变的数据')
        router.push({path:'/'})
        return;
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
        return
    }
    else if (Array.isArray(data)){//新增数据以后，返回全部列表，用于刷新数据
        formStore.isHasTrigger = res.hasTrigger
        // console.log('返回数组')
        handerDashArray(data)
    }else if (data && data.id){//编辑以后，返回当前数据
        editFinish(formStore, data)
    }
    endLoading()
    showSucToast()
    router.push({path:'/'})
}

</script>

<style>
.wrap {
    margin: 0px;
}

li {
    list-style: none;
}
</style>