<script setup lang="ts">
import { navigations, otherNavigations } from '@/constant';
import { ref } from 'vue';

const toggle = ref(false);

const handleToggle = (val = !toggle.value) => {
    toggle.value = val;
}
</script>

<template>
    <header class="w-full lg:py-3 flex justify-center items-center fixed z-[99]" :class="[toggle ? 'bg-white' : '']">
        <div class="w-full max-w-[100rem] flex flex-col lg:flex-row justify-between lg:items-center">
            <div class="w-full lg:w-fit flex flex-row items-center justify-between px-3 lg:px-0 py-3 lg:py-0">
                <h1 class="font-extrabold -tracking-[0.1rem] text-lg lg:text-xl lg:block  bg-zinc-200 py-1 px-3 rounded-full">ZaDisk</h1>

                <div class="lg:hidden flex flex-col max-w-[28px] w-full gap-2 cursor-pointer" @click="() => handleToggle()">
                    <span class="block py-[0.6px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-top-left" :class="[toggle ? 'rotate-45' : '']"></span>
                    <span class="block py-[0.6px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-center" :class="[toggle ? 'scale-0' : '']"></span>
                    <span class="block py-[0.6px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-bottom-left" :class="[toggle ? '-rotate-45' : '']"></span>
                </div>
            </div>
            <nav class="lg:flex flex-col lg:flex-row gap-2 lg:gap-4 bg-zinc-200 px-3 lg:px-5 py-2 lg:py-1 lg:rounded-full items-center" :class="[toggle ? 'flex' : 'hidden']">
                <RouterLink v-for="({ label, to }) in navigations" :to class="text-lg lg:text-base">{{ label }}</RouterLink>
                <div class="w-[1px] min-h-full lg:bg-black py-2.5 block"></div>
                <RouterLink v-for="({ icon, to }, i) in otherNavigations" :to class="text-lg lg:text-base">
                    <img :src="icon" :alt="String(i)" class="max-w-[1.5rem] lg:max-w-[1rem]">
                </RouterLink>
            </nav>
        </div>
    </header>
</template>