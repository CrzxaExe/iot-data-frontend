<script setup>
import Sidebar from '@/components/navigations/Sidebar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const toggle = ref(false);
const setToggle = (val = !toggle.value) => toggle.value = val;
</script>

<template>
    <main class="flex flex-row w-full overflow-x-hidden min-h-screen">
        <Sidebar :toggle :set="setToggle"/>

        <div class="lg:translate-x-[13.4rem] lg:max-w-[calc(100vw-13.4rem)] overflow-x-hidden w-full px-1 min-h-screen pt-3 transition-all ease-in-out duration-300" :class="[toggle ? 'translate-x-[13.4rem]' : 'translate-x-[3.4rem] pr-[4rem]']">
            <RouterView/>
        </div>
    </main>
</template>