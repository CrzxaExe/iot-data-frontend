<script setup lang="ts">
import { navigations } from '@/constant';
import { ref } from 'vue';

const toggle = ref(false);

const handleToggle = (val = !toggle.value) => {
    toggle.value = val;
}
</script>

<template>
    <header class="w-full shadow-lg lg:py-3 flex justify-center items-center fixed z-[99] bg-white">
        <div class="w-full max-w-[100rem] flex flex-col lg:flex-row justify-between lg:items-center">
            <div class="w-full lg:w-fit flex flex-row items-center justify-between px-3 lg:px-0 py-3 lg:py-0">
                <h1 class="font-bold text-2xl">ZDC</h1>

                <div class="lg:hidden flex flex-col max-w-[30px] w-full gap-2 cursor-pointer" @click="() => handleToggle()">
                    <span class="block py-[0.9px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-top-left" :class="[toggle ? 'rotate-45' : '']"></span>
                    <span class="block py-[0.8px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-center" :class="[toggle ? 'scale-0' : '']"></span>
                    <span class="block py-[0.9px] w-full rounded-full bg-black transition-all ease-in-out duration-300 origin-bottom-left" :class="[toggle ? '-rotate-45' : '']"></span>
                </div>
            </div>
            <nav class="lg:flex flex-col lg:flex-row gap-0 lg:gap-3 mt-3 lg:mt-0 bg-zinc-200 lg:bg-transparent px-3 lg:px-0 py-2 lg:py-0" :class="[toggle ? 'flex' : 'hidden']">
                <RouterLink v-for="({ label, to }) in navigations" :to class="text-xl lg:text-lg">{{ label }}</RouterLink>
            </nav>
        </div>
    </header>
</template>