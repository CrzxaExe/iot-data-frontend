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

        <div class="lg:pl-[13.4rem] max-w-full overflow-x-hidden w-full px-1 min-h-screen pt-3 pr-[3rem] transition-all ease-in-out duration-300 relative" :class="[toggle ? 'pl-[13.4rem]' : 'pl-[3.4rem]']">
            <RouterView/>
        </div>
    </main>
</template>