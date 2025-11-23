
<template>
    <FMDialogError ref="fmDialogError"/>
    <FMDialog ref="fmDialog" @dialogClickOk="dialogClickOk"/>
    <div v-if="multipleAccount" class="bg-red-50 p-6 rounded">
        <p>Multi-login, or being logged into multiple Google Accounts at once, isn't supported for Google Forms add-on.</p>
        <p>Please <a target="_blank" href="https://accounts.google.com/logout" class="text-blue-600 underline hover:text-blue-800">log out</a> of all other accounts and use only the account {{currentEmail}} to access the Google Forms add-on.</p>
    </div>
    <DashLoading v-else-if="formStore.isFirstEnterApp" :loadStr="loadStr"/>
    <div v-else class="wrap">
        <div class="space-y-0 flex justify-between items-center px-4">

            <div class="flex items-center space-x-3">

                <!-- <div><svg xmlns="http://www.w3.org/2000/svg" width="55px" version="1.0" viewBox="0 0 48 48"><path fill="#00BCD4" d="M7 31H17V41H7zM35.3 19.3l-5.6-5.6c-.4-.4-.4-1 0-1.4l5.6-5.6c.4-.4 1-.4 1.4 0l5.6 5.6c.4.4.4 1 0 1.4l-5.6 5.6C36.3 19.7 35.7 19.7 35.3 19.3z"></path><path fill="#3F51B5" d="M12 7A6 6 0 1 0 12 19A6 6 0 1 0 12 7Z"></path><path fill="#448AFF" d="M36 30A6 6 0 1 0 36 42A6 6 0 1 0 36 30Z"></path><path fill="#90A4AE" d="M11 24H13V29H11z"></path><path fill="#90A4AE" d="M12 21L9 25 15 25z"></path><g><path fill="#90A4AE" d="M20 12H25V14H20z"></path><path fill="#90A4AE" d="M28 13L24 10 24 16z"></path></g><g><path fill="#90A4AE" d="M35 21H37V26H35z"></path><path fill="#90A4AE" d="M36 29L39 25 33 25z"></path></g></svg></div>
                <div class="space-y-1">
                    <div class="text-xl font-bold text-gray-700">{{ topTitle }}</div>
                    <a href="https://pipiform.com/" target="_blank" rel="noreferrer" class="group flex items-center space-x-2.5"><span class="text-sm text-gray-400 group-hover:text-gray-900 font-medium"><em>by </em>pipiform.com</span></a>
                </div> -->

                <div class="flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-green-500"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg><span class="text-sm text-gray-500 font-medium">{{ formStore.userDesc }}</span></div>

            </div>
            

            <div class="flex flex-row gap-x-1.5">
                <Lang @switchLanguage="updateUILanguage" ref="langVue" class="mt-0.5"/>
                <!-- 升级 -->
                <button @click="upgradeButtonClick2" v-show="formStore.userPro==0" :title="upgradeDesc" class="relative btn ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-4 text-gray-500 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path></svg>
                    <svg v-if="isLoadAnimation2" class="animate-spin absolute inset-0 m-auto h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <div v-else>{{ upgradeStr }}</div>
                    <div v-if="isLoadAnimation2" class="invisible">{{upgradeStr}}</div>
                </button>                
                <!-- Options -->
                <div class="ml-3 relative inline-block text-left" data-headlessui-state="open" data-open="">
                    <Menu as="div" class="relative inline-block text-left">
                        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="headlessui-menu-button-:r3:" type="button" aria-haspopup="menu" aria-expanded="true" data-headlessui-state="open active" data-open="" data-active="" aria-controls="headlessui-menu-items-:rt:">{{optionsStr}}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="-mr-1 size-5 text-gray-400"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg></MenuButton>
                        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100" aria-labelledby="headlessui-menu-button-:r3:" id="headlessui-menu-items-:r1t:" role="menu" tabindex="0" data-headlessui-state="open" data-open="" style="--button-width: 91.125px;">
                            <MenuItem class="px-1 py-2.5" @click="optionClick(0)"  v-slot="{ active }">
                                <a :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r6:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 size-5 text-gray-400 group-hover:text-gray-500"><path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z"></path></svg>{{ aiStr }}<span class="text-xs ml-1.5 text-orange-500 font-semibold -mt-2">New</span></a>
                            </MenuItem>
                            <div>
                                <MenuItem class="py-2.5" @click="optionClick(1)"  v-slot="{ active }">
                                    <a :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r6:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 size-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z" clip-rule="evenodd"></path></svg>{{ resendStr }}</a>
                                </MenuItem>
                                <MenuItem class="py-2.5" @click="optionClick(2)" v-slot="{ active }">
                                    <a :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" title="Import Notification from a text file" id="headlessui-menu-item-:r2b:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 size-5 text-gray-400 group-hover:text-gray-500"><path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z"></path><path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z"></path></svg>{{ importStr }}</a>
                                </MenuItem>
                            </div>
                            <div>
                                <MenuItem class="py-2.5" @click="optionClick('limiter')" v-slot="{ active }">
                                    <a :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r8:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 size-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd"></path></svg>{{ limitRes }}</a>
                                </MenuItem>
                                <MenuItem class="py-2.5" @click="optionClick('settings')" v-slot="{ active }">
                                    <a :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r9:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 size-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"></path></svg>{{ formSettings }}</a>
                                </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                    </Menu>
                </div>

                <!-- Create -->
                <div class="ml-3 relative inline-block text-left" data-headlessui-state="open" data-open="">
                    <Menu as="div" class="relative inline-block text-left">
                        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-0 ring-inset ring-gray-300 hover:bg-indigo-700" id="headlessui-menu-button-:r3:" type="button" aria-haspopup="menu" aria-expanded="true" data-headlessui-state="open active" data-open="" data-active="" aria-controls="headlessui-menu-items-:rt:">{{createStr}}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="-mr-1 h-5 w-5 text-white"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg></MenuButton>
                        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100" aria-labelledby="headlessui-menu-button-:r3:" id="headlessui-menu-items-:r1t:" role="menu" tabindex="0" data-headlessui-state="open" data-open="" style="--button-width: 91.125px;">
                            <MenuItem class="py-2.5" @click="createClick('create')"  v-slot="{ active }">
                                <a title="Create New Email Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2b:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"></path><path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"></path></svg>{{ emailNoti }}</a>
                            </MenuItem>
                            <MenuItem class="py-2.5" @click="createClick('webhook')" v-slot="{ active }">
                                <a title="Create New Webhook" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2c:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"></path><path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"></path></svg>{{ webhookStr }}</a>
                            </MenuItem>
                            <MenuItem class="py-2.5" @click="createClick('slack')" v-slot="{ active }">
                                <a title="Create New Slack Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2c:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h10.5a.75.75 0 0 1 0 1.5H12v13.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5H2v-13h-.25A.75.75 0 0 1 1 2.75ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM8 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM8.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM14.25 6a.75.75 0 0 0-.75.75V17a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H18v-9h.25a.75.75 0 0 0 0-1.5h-4Zm.5 3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" clip-rule="evenodd"></path></svg>{{ slackStr }}</a>
                            </MenuItem>
                            <MenuItem class="py-2.5" @click="createClick('sms')" v-slot="{ active }">
                                <a title="Create New Text (SMS) Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2d:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path><path fill-rule="evenodd" d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z" clip-rule="evenodd"></path></svg>{{ smsStr }}</a>
                            </MenuItem>
                            <!-- <MenuItem class="py-2.5" @click="createClick('push')" v-slot="{ active }">
                                <a title="Create New Push Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2f:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z"></path><path fill-rule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z" clip-rule="evenodd"></path></svg>{{ pushStr }}</a>
                            </MenuItem> -->
                            <MenuItem class="py-2.5" @click="createClick('discord')" v-slot="{ active }">
                                <a title="Create New Discord Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2g:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z"></path></svg>{{ discordStr }}</a>
                            </MenuItem>
                            <MenuItem class="py-2.5" @click="createClick('chat')" v-slot="{ active }">
                                <a title="Create New Google Chat Notification" :class="[active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]" id="headlessui-menu-item-:r2h:" role="menuitem" tabindex="-1" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 0 0 1.28.53l3.58-3.579a.78.78 0 0 1 .527-.224 41.202 41.202 0 0 0 5.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg>{{ chatStr }}</a>                            
                            </MenuItem>
                          </MenuItems>
                        </transition>
                    </Menu>
                </div>

                <!-- 关闭按钮 -->
                <button @click="closeDialog" class="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>


            </div>
        </div>
        <br>

        <!-- 教程 -->
        <!-- <div class="px-4 pt-5 border-t border-gray-200">
            <div class="flex flex-row space-y-0 space-x-8">
                <div class="flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-green-500"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg><span class="text-sm text-gray-500 font-medium">{{ formStore.userDesc }}</span></div>
                <div class="flex items-center space-x-2 flex-1 justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-blue-300"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z"></path></svg><a href="https://www.youtube.com/watch?v=ZB-pRMrm7Ak" target="_blank" rel="noreferrer"><span class="text-sm text-gray-600 font-medium">{{ videoTutorial }}</span></a></div>
                <div class="flex items-center space-x-2 flex-1 justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-black"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg><a href="https://pipiform.com/docs/en/form-notifications/introduction" target="_blank" rel="noreferrer"><span class="text-sm text-gray-500 font-medium">{{ docStr }}</span></a></div>
            </div>
        </div>
        <br> -->

        <!-- 分割线 -->
        <div class="border-t border-gray-200"></div> 

        <!-- 提示购买pro -->
        <div v-if="showPremium" class="mt-6 px-6"><p class="text-base font-semibold text-gray-900">{{ freeLimit }}</p><p class="text-sm leading-5 text-gray-500">{{ freeLimitDesc }}</p><div class="mt-6">
            <button @click="upgradeButtonClick" :title="upgradeDesc" class="relative px-3 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md focus:outline-none focus:ring-0 text-white bg-green-600 hover:bg-green-800"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-4 text-gray-500 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path></svg>
                <svg v-if="isLoadAnimation" class="animate-spin absolute inset-0 m-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <div v-else>{{upgradePremium}}</div>
                <div v-if="isLoadAnimation" class="invisible">{{ upgradePremium }}</div>
            </button>
            <a @click.prevent="backHomeClick" title="Discard changes and go to the home screen" class="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{ homeStr }}</a></div>
        </div>
        <ResendResponse v-else-if="isResendNotification" @backHomeClick="backHomeClick()"/>
        <!-- 没有数据的时候 -->
        <div v-else-if="formStore.dashArray.length==0" class="mx-3 mt-8"><h2 class="text-base font-semibold leading-6 text-gray-800">{{notiStr}}</h2><p class="mt-1 text-sm text-gray-500" v-html="notiDesc"></p></div>
        
        <!-- 有数据的时候 -->
        <ul v-else class="divide-y divide-gray-200">
            <li v-for="item in formStore.dashArray" :key="item.id">
                <div class="relative group py-5 flex items-center space-x-3 px-4">
                    <div class="flex-shrink-0"><span :title="item.notification_name" :class="`bg-${item.color}-500 text-white text-lg font-medium inline-flex items-center justify-center h-8 w-8 rounded-full select-none`">{{ item.firstChar }}</span></div>
                    <div class="min-w-0 flex-1"><a href="#" @click.prevent="editClick(item)" :title="viewStr" class="font-medium text-sm text-gray-800">{{ item.notification_name }}</a><div class="text-sm text-gray-400 tracking-tight">{{item.show_time}}</div></div>
                    <div class="flex-shrink-0 self-center">
                        <div class="relative inline-block" data-headlessui-state="">
                            <div class="flex">
                                <Menu as="div" class="relative inline-block text-left">
                                    <div><MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">{{actionStr}}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg></MenuButton></div>
                                    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                                      <MenuItems class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        <MenuItem class="px-1 py-2.5" @click="editClick(item)"  v-slot="{ active }"><button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path></svg>{{editStr}}</button></MenuItem>
                                        <div>
                                            <MenuItem class="px-1 py-2.5"@click="copyClick(item)"  v-slot="{ active }"><button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg>{{ duplicateStr }}</button></MenuItem>
                                            <MenuItem class="px-1 py-2.5" @click="exportClick(item)"  v-slot="{ active }"><button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-600','group flex w-full items-center rounded-md px-4 py-2 text-sm',]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"></path></svg>{{exportStr}}</button></MenuItem>
                                        </div>
                                        <MenuItem class="px-1 py-2.5" @click="deleteClick(item)" v-slot="{ active }"><button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-600', 'group flex w-full items-center rounded-md px-4 py-2 text-sm',]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" aria-hidden="true" data-slot="icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>{{deleteStr}}</button></MenuItem>
                                      </MenuItems>
                                    </transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <div v-if="formStore.userPayment" class="h-12"></div>
        </ul>
    </div>

    <div v-if="formStore.userPayment" class="fixed bottom-0 right-0 m-4">
      <div class="text-gray-500 text-[0.65rem]" ><a @click.prevent="manageSubClick" href="" target="_blank" class="underline">{{ manageSub }}</a></div>
    </div>

    <!-- 支付状态刷新蒙版弹窗 -->
    <PaymentModal ref="paymentModal" />

</template>

<script setup>
import { onMounted, watch, ref, inject, onUnmounted, resolveComponent } from 'vue';
import { httpGet, httpPost } from '@/assets/http';
import { handerDashArray } from '@/assets/sharedConstants';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue' // https://headlessui.com/v1/vue/menu
import { useRouter } from 'vue-router';
import FMDialog from '@/components/FMDialog.vue';
import FMDialogError from '@/components/FMDialogError.vue';
import DashLoading from '@/components/DashLoading.vue';
import { useFormStore } from '@/stores/form';
import ResendResponse from '@/components/ResendResponse.vue';
import { translateLocale } from '@/assets/language';
import Lang from '@/components/Lang.vue';
import PaymentModal from '@/components/PaymentModal.vue';

const loading = ref(false)
const langVue = ref(null)
const formStore = useFormStore()
const router = useRouter()
const startLoading = inject('startLoading-key');
const endLoading = inject('endLoading-key');
// const dataArray = ref([])
const fmDialog = ref(null)
const fmDialogError = ref(null)
const showPremium = ref(false)
const isLoadAnimation = ref(false)
const isLoadAnimation2 = ref(false)
const currentEmail = ref('')
const multipleAccount = ref(false)
const isResendNotification = ref(false)
const paymentModal = ref(null)

const loadStr = ref('')
const topTitle = ref('')
const notiStr = ref('')
const notiDesc = ref('')
const upgradeStr = ref('')
const upgradeDesc = ref('')
const manageSub = ref('')
const upgradePremium = ref('')
const freeLimit = ref('')
const freeLimitDesc = ref('')
const optionsStr = ref('')
const createStr = ref('')
const aiStr = ref('')
const resendStr = ref('')
const importStr = ref('')
const limitRes = ref('')
const formSettings = ref('')
const emailNoti = ref('')
const webhookStr = ref('')
const slackStr = ref('')
const smsStr = ref('')
const pushStr = ref('')
const discordStr = ref('')
const chatStr = ref('')
const viewStr = ref('')
const actionStr = ref('')
const editStr = ref('')
const duplicateStr = ref('')
const exportStr = ref('')
const deleteStr = ref('')
const homeStr = ref('')
const videoTutorial = ref('')
const docStr = ref('')

onMounted(()=>{
    setLocalizing()
    const licenseKeyInput = document.getElementById('licenseKey');
    if (licenseKeyInput) {
        currentEmail.value = licenseKeyInput.placeholder;
    }
    if (formStore.dashArray.length > 0){
        return
    }
    fetchData()
})
watch(langVue, (newValue) => {
  if (newValue) {
    // console.log("Lang 组件已挂载");
    langVue.value.changeLanguage(formStore.localeSelect)
  }
});
function setLocalizing(){
    docStr.value = translate('Help & Support')
    videoTutorial.value = translate('Video Tutorial')
    loadStr.value = translate('Loading, please wait')
    topTitle.value = translate('Form Notifications')
    notiStr.value = translate('Notifications')
    notiDesc.value = translate('You haven’t created any notifications yet. Get started by clicking the <b>Create button</b> above.')
    upgradeStr.value = translate('Upgrade')
    upgradeDesc.value = translate('Upgrade to premium and unlock all features')
    manageSub.value = translate('Manage Subscription')
    upgradePremium.value = translate('Upgrade to premium')
    freeLimit.value = translate('Free Limit Reached')
    freeLimitDesc.value = translate('Sorry, this feature is not available in your current plan. Please upgrade to unlock all features.')
    homeStr.value = translate('Home')
    optionsStr.value = translate('Options')
    createStr.value = translate('Create')
    aiStr.value = translate('AI Studio')
    resendStr.value = translate('Resend notifications')
    importStr.value = translate('Import an existing rule')
    limitRes.value = translate('Limit Form Responses')
    formSettings.value = translate('Form Settings')
    emailNoti.value = translate('Email Notification')
    webhookStr.value = translate('Webhook Notification')
    slackStr.value = translate('Slack Notification')
    smsStr.value = translate('SMS Notification')
    pushStr.value = translate('Push Notification')
    discordStr.value = translate('Discord Notification')
    chatStr.value = translate('Google Chat Notification')
    viewStr.value = translate('View and Edit Workflow')
    actionStr.value = translate('Actions')
    editStr.value = translate('Edit')
    duplicateStr.value = translate('Duplicate')
    exportStr.value = translate('Export')
    deleteStr.value = translate('Delete')
    for(var i=0; i<formStore.dashArray.length; i++){
        const item = formStore.dashArray[i]
        let newType = ''
        if (item.type.toLowerCase().includes('email')) {
            newType = translate("Email notification")
        } else if (item.type.toLowerCase().includes('webhook')) {
            newType = translate("Webhook notification")
        } else if (item.type.toLowerCase().includes('slack')) {
            newType = translate("Slack notification")
        } else if (item.type.toLowerCase().includes('sms')) {
            newType = translate("SMS notification")
        } else if (item.type.toLowerCase().includes('discord')) {
            newType = translate("Discord notification")
        } else if (item.type.toLowerCase().includes('google')) {
            newType = translate("Google Chat notification")
        }
        item.show_time = newType + ', ' + item.time
    }
}
function updateUILanguage(localize){
    if(!localize){
        return
    }
    // console.log("更新语言: ", localize)
    formStore.localeSelect = localize
    setLocalizing()
    formStore.setLocalizing()
    fmDialog.value.setLocalizing()
}
//从appscript获取到的语言
function setLocalLang(response){
    const currentStorage =  localStorage.getItem('form_selected_language')
    if (currentStorage) {//本地有语言，就按照本地选择的语言显示
        // console.log("本地有语言 ", currentStorage)
    }else if(response?.languageCode){//本地没有选语言的处理
        updateUILanguage(response.languageCode)
    }
}
async function fetchData(){
    let url = "email/info/list"
    if (import.meta.env.VITE_API_BASE_URL){//develop
        url = `email/info/list?email=${formStore.activeEmail}&form_id=test`
        formStore.fmAccessToken = 'ya29.c.c0ASRK0GYa-6ujGMte2WxRkTkZI8PN50eK37lik_1aZbpxsQJrLY_t7gds7Qu_zpyPd_5OVvSAwcNOvaMPvLDzF9ebqFQ9WVeqDkuJOPVZjnZiFX31mIbpstsy5VZ6yplFIEyN2fl4tpMICuDsI8s9ShBmjR23tv7nmTtGXQvnOvVXP9R2DSD-GArYhOv-DgrcMAuAa0B_SKMGhntGF49YmNudRQBXEKKvUP8EQYlGCUR5jLdFqroo3Ki5vVKdkKTn6za4VSU4w-Sz-qOgWjjBsGZLr48fBoxNiL082HZkQOEOYpuwUMUa7zGyzm-v4x663MnuHRE1ch-VNquaowdgmD2xnViMAaelGRWLroTAWdJMENGeGXfiRLYE384KU5WW_5Q2oUz-c-JebM9OsbQ_8t2WdJ9wamr3lxpmj1xBjQQyppcc2JFWWVcFS-2t61S4i-Ri5OdSow_993v8g3YgZfmmf978Va-50YMdbXBRQfOwl9J_Ve71XpclFkbx3bjdaYSd9bVpjq80yJtBvqXOn1pU9yuhzSooiqtb6jU_aij-9lrY3hc5VBQROdh5rBcyvWvgI9k440rBca32tSi6Bj64emsQwVdYUz4j7ljdb4xMx0cs3m-MlXplhuIqIqWXBp2uF3lvqSn_t-UXxkjZ1078BtRuBfjh7Fi1c6vukW2g90tVpjwg5_n4V6SUn93XqXQk8o6Vkf-IOJwtjFq_Z3fkOM1Zf5JFzX8ijwfjhW26fnj9u8oskn-4g443VmymheSq-8b-c1ckmV3B0-Rw45_akOx1B-a8noiQj0nJFkwBJ4b2oW_r6znZzOgtwd7yIJiMn4rU4j2JvB-mMxS2fchqxURFae_kd-eOw5c52qzSpS16UvgJmR5v-3I3YBo859YhnsJd1UdbicxSbkoWtBq8ZcmlFRjbyYx6ymJO4fvF-J9ZdihJpV3Oje5mu7l0iJjIw5OnzSn_-1yBQZntO7vbcv-JoxF-n57-6qYnBmlh_43ifVd57lM'
    }
    const res = await httpGet(url);//内部会调用google.script.run
    if(res.code === 1){
        if (res?.message?.includes("PERMISSION_DENIED")){
            multipleAccount.value = true
            return
        }
        fmDialogError.value.openModal(res.message)
    }else{
        if (import.meta.env.VITE_API_BASE_URL){//develop
            res.languageCode = 'zh_CN'
        }
        formStore.setHttpData(res)
        handerDashArray(res.data)
    }
    // formStore.dashArray.splice(0)
    formStore.isFirstEnterApp = false
    setLocalLang(res)//一定要放在isFirstEnterApp=false后面
}
function optionClick(tag){
    if (typeof tag == 'string'){
        router.push({ path: `/${tag}` }).then(() => {
            // window.scrollTo({ top: 0 });
        });
    }else{
        if (tag == 0){
            router.push({path:'/ai'})
        }else if (tag == 1){
            isResendNotification.value = true
        }else if (tag == 2){
            importTxtFile()
        }
    }
}
function createClick(tag){
    let showPurchase = false
    if (formStore.userPro==0 && !formStore.userTrial){
        showPurchase = true
    }
    if (formStore.dashArray.length > 0 && showPurchase) {//试用期结束，只能创建一个邮箱
        showPremium.value = true
        return
    }
    if(tag!='create' && showPurchase){//试用期结束，不能创建除了邮件以为的其他
        showPremium.value = true
        return
    }
    router.push({ path: `/${tag}` }).then(() => {
        window.scrollTo({ top: 0 });
    });
}
function editClick(item){
    if (item.ext1) {
        router.push({ path: `/${item.ext1}/${item.id}` }).then(() => {
            window.scrollTo({ top: 0 });
        });
        return
    }
    router.push({ path: `/edit/${item.id}` }).then(() => {
        window.scrollTo({ top: 0 });
    });
}
function copyClick(item){
    const result = generateExportResult(item)
    pushToExportPage(result)
}
function exportClick(item){
    downloadObjectAsTxt(item);
}
function deleteClick(item){
    fmDialog.value.setIsOpen(true, item)
}
function backHomeClick(){
    showPremium.value = false
    isResendNotification.value = false
}
async function dialogClickOk(item){
    startLoading()
    const res = await httpPost('email/info/delete', {id:item.id, email:formStore.activeEmail});
    const index = formStore.dashArray.findIndex(item => item.id == res.data?.id);
    if (index !== -1) {
        console.log('删除 '+res.data.id)
        formStore.isHasTrigger = res.hasTrigger
        formStore.dashArray.splice(index, 1);
    }
    endLoading()
}
function upgradeButtonClick(){
    console.log("upgradeButtonClick")

    isLoadAnimation.value = true
    google.script.run.withSuccessHandler(() => {
        isLoadAnimation.value = false
        paymentModal.value.show()
    })
    .withFailureHandler((error) => {
        isLoadAnimation.value = false
    })
    .openPurchaseDialog();
}
function upgradeButtonClick2(){
    console.log("upgradeButtonClick2")

    isLoadAnimation2.value = true
    google.script.run.withSuccessHandler(() => {
        isLoadAnimation2.value = false
        paymentModal.value.show()
    })
    .withFailureHandler((error) => {
        isLoadAnimation2.value = false
    })
    .openPurchaseDialog();
}
function downloadObjectAsTxt(item) {
    const result = generateExportResult(item)
    let filename = 'z-'+new Date().getTime()
    if (item.notification_name){
        filename = item.notification_name
        if(item['ext1']){
            filename = item['ext1']+'-'+item.notification_name
        }
    }
    const content = JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
}
function generateExportResult(item){
    const result = {};
    if (item['ext1']){
        result['type'] = item['ext1']
    }
    const allowedKeys = Object.keys(formStore.initialServerData());
    for (const key of allowedKeys) {
        if (key in item) { // 如果 inputObject 中有合法属性
            if (item[key]){
                if (item[key] == "[]"){
                    continue
                }
                if (key.endsWith('_array')){
                    const array = JSON.parse(item[key])
                    if (key == 'send_condition_array'){
                        for (const element of array){
                            for (const cell of element.ifArray){
                                handerConditionParam(cell)
                            }
                            for (const cell of element.orAndArray){
                                handerConditionParam(cell)
                            }
                        }
                    }
                    if (array){
                        result[key] = array
                    } 
                } else if (key.startsWith('is_') && Number.isInteger(item[key])) {
                    if (item[key] == 1) {
                        result[key] = true
                    }
                } else{
                    result[key] = item[key];
                }
            }
        }
    }
    if (item['ext1']){
        if (item['ext1'] == 'sms'){//sms类型
            if (item['sender_name']) {
                result['sid'] = item['sender_name']
            }
            if (item['email_subject']) {
                result['token'] = item['email_subject']
            }
            if (item['email_body']) {
                result['sender_phone'] = item['email_body']
            }
            if (item['pdf_file_name']) {
                result['recipient_phone'] = item['pdf_file_name']
            }
            if (item['pdf_template']) {
                result['body'] = item['pdf_template']
            }
        }else{//其他类型
            if (item['pdf_file_name']) {
                result['url'] = item['pdf_file_name']
            }
            if (item['pdf_template']) {
                result['body'] = item['pdf_template']
            }
        }
        delete result['sender_email_address']
        delete result['sender_name']
        delete result['email_subject']
        delete result['email_body']
        delete result['pdf_file_name']
        delete result['pdf_template']
    }
    return result
}
function handerConditionParam(item){
    delete item.id
    delete item.optionConditions
    delete item.optionValues
    delete item.colorArray
    if (!item.input) {
        delete item.input
    }
    if (!item.content) {
        delete item.content
    }
    if (item.isRequired) {
        delete item.isRequired
    }
    if (item.showPlaceholder) {
        delete item.showPlaceholder
    }
    if (!item.isShowMoreBtn) {
        delete item.isShowMoreBtn
    }
    if (!item.isShowArray) {
        delete item.isShowArray
    }
    if (!item.isShowSelectValue) {
        delete item.isShowSelectValue
    }
    if (item.selectedValue == '75ab8ef3-e4e0-4f23-a624-66820f045f8e') {
        delete item.selectedValue
    }
    if (item.list?.length == 0){
        delete item.list
    }
}
function importTxtFile() {
    const existingFileInput = document.getElementById('file-input');
    if (existingFileInput) {
        document.body.removeChild(existingFileInput);
    }
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.id = 'file-input'; 
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const content = e.target.result; // 文件内容
                const parsedObject = JSON.parse(content); // 解析为对象
                pushToExportPage(parsedObject)
            } catch (err) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file); // 读取文件内容
        document.body.removeChild(fileInput);
    });
    document.body.appendChild(fileInput);
    fileInput.click();
}
function pushToExportPage(parsedObject){
    formStore.exportRuleData = parsedObject
    const tag = parsedObject['type']
    if (tag) {
        router.push({ path: `/${tag}`, query: { export: true } }).then(() => {
            window.scrollTo({ top: 0 });
        });
    } else {
        router.push({ path: `/create`, query: { export: true } }).then(() => {
            window.scrollTo({ top: 0 });
        });
    }
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
function manageSubClick(){
    startLoading()
    google.script.run.withSuccessHandler((res) => {
        endLoading()
        window.open(res, '_blank');
    })
    .withFailureHandler((error) => {
        endLoading()
    })
    .manageSubscription();
}
function closeDialog(){
    google.script.host.close();
}
</script>
