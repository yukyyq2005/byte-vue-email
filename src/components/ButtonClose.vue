<template>
    <div class="btnbg rounded bg-gray-100 text-sm text-gray-500 flex items-center">
        <!-- <span class="pl-2">啊</span> -->
         <!-- <slot></slot> -->
        <span class="pl-2 text-ellipsis whitespace-nowrap overflow-hidden">{{ btnContent }}</span>
        <span class="svg-container" @click="closeAction">
            <svg fill="#8A919F" height="14"  width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
        </span>
    </div>
</template>


<script setup>
defineProps({
    btnContent:String
});
const emit = defineEmits(['closeButtonAction']);
function closeAction(){
    emit('closeButtonAction');
}
</script>


<style scoped>
.btnbg{
    height: 25px;
    line-height: 25px;
    text-align: center;
    /* display: inline-block; */
}
.svg-container:hover svg{
    fill:black
}
.svg-container{
    padding: 2px 6px;
    cursor: pointer;
    position: relative;
    top: -2px;
}
svg{
    display: inline-block;
}

</style>