import { createRouter, createWebHashHistory } from "vue-router";
import { useFormStore } from "@/stores/form";
import Dashboard from "@/views/Dashboard.vue";
import MainPage from "@/views/MainPage.vue";
import SmsPage from "@/views/SmsPage.vue";
import SlackPage from "@/views/SlackPage.vue";
import DiscordPage from "@/views/DiscordPage.vue";
import ChatPage from "@/views/ChatPage.vue";
import WebhookPage from "@/views/WebhookPage.vue";
import PushPage from "@/views/PushPage.vue";
import LimitFormPage from "@/views/LimitFormPage.vue";
import FormSettings from "@/views/FormSettings.vue";
import AIStudioPage from "@/views/AIStudioPage.vue";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            component:Dashboard
        },
        {
            path:"/create",
            component:MainPage
        },
        {
            path:"/edit/:id",//带参数
            component:MainPage
        },
        {path:"/sms", component:SmsPage},
        {path:"/sms/:id", component:SmsPage},
        {path:"/slack", component:SlackPage},
        {path:"/slack/:id", component:SlackPage},
        {path:"/discord",component:DiscordPage},
        {path:"/discord/:id", component:DiscordPage},
        {path:"/chat", component:ChatPage},
        {path:"/chat/:id", component:ChatPage},
        {path:"/webhook", component:WebhookPage},
        {path:"/webhook/:id", component:WebhookPage},
        {path:"/push", component:PushPage},
        {path:"/limiter", component:LimitFormPage},
        {path:"/ai", component:AIStudioPage},
        {path:"/settings", component:FormSettings}
    ]
})
// 导航守卫、路由守卫、路由拦截
router.beforeEach((to, from, next) =>{
    // console.log(to.path);
    // console.log(from.path);
    const formStore = useFormStore()
    if (from.path.startsWith('/edit') || from.path.startsWith('/create')){
        //QuillEditor控件比较奇怪，必须要在这里清理一下，不然新增的时候还会显示上一次编辑的内容，因为resetServerData里面的函数不起作用
        formStore.serverData.email_body = ''
        // console.log('clear email body')
    }
    next();
})
export default router