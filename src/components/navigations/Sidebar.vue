<template>
    <div class="fixed bg-zinc-600 lg:bg-white min-h-screen z-[100] flex flex-col lg:w-[13rem] transition-all duration-300 ease-in-out text-white lg:text-black px-2 rounded-r-xl" :class="[toggle ? 'w-[13rem]' : 'w-[3rem]']">
        <div class="flex w-full lg:justify-start items-center p-2" :class="[toggle ? 'justify-end' : 'justify-center pb-2 pt-5']">
            <RouterLink to="/" class="cursor-pointer w-full">
                <h1 class="font-bold -tracking-[0.1rem] text-lg lg:text-xl lg:block w-full" :class="[ toggle ? 'block' : 'hidden']">ZaDisk</h1>
            </RouterLink>

            <div class="lg:hidden flex flex-col ustify-center items-center max-w-[30px] w-full gap-2 cursor-pointer" @click="set(!toggle)">
                <img v-if="!toggle" src="@/assets/icons/Closed-Menu.svg" alt="ArrowClosed" class="max-w-[1rem] aspect-square">
                <img v-else src="@/assets/icons/Open-Menu.svg" alt="ArrowOpen" class="max-w-[1rem] aspect-square">
            </div>
        </div>

        <div class="mt-2 w-full">
            <div class="w-full flex flex-row gap-2 justify-center items-center bg-zinc-200 rounded-lg lg:px-2 lg:text-black lg:py-0" :class="[toggle ? 'px-2 py-0' : 'py-2']">
                <img src="@/assets/icons/Search.svg" alt="Search" class="max-w-[1rem] invert">
                <input type="text" name="search" id="search" class="block lg:max-w-full w-full outline-none text-xs lg:text-sm lg:py-2 text-black placeholder:text-black lg:block" placeholder="Search" :class="[toggle ? 'max-w-full py-2 lg:block' : 'max-w-0 lg:block hidden']">
            </div>
        </div>

        <div class="mt-4 flex flex-col gap-2">
            <RouterLink v-for="({ label, to, icon }) in dashboardNavigation" :to class="flex flex-row items-center gap-3 px-1.5 py-1.5 lg:py-2 hover:bg-zinc-200/50 lg:hover:bg-zinc-200 transition-all ease-in-out duration-300 rounded-lg">
                <img :src="icon" alt="Dashboard" class="lg:invert max-w-[1.2rem] aspect-square">
                <span class="lg:block uppercase font-light text-xs lg:text-sm" :class="[toggle ? 'block' : 'hidden']">
                    {{ label }}
                </span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { dashboardNavigation } from '@/constant';
import { RouterLink } from 'vue-router';

defineProps({
    toggle: Boolean,
    set: Function
})
</script>