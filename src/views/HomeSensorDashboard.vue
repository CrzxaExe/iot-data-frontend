<template>
    <main class="pt-18 w-full max-w-[100rem] mx-auto relative z-[1] px-2">
        <h1 class="text-xl font-semibold">Widget</h1>
        
        <div class="w-full flex flex-row gap-2 lg:gap-4 mt-2">
            <Status :model="data.model" :temp="data.data.temperature" :humidity="data.data.humidity" :timestamp="new Date(data.timestamp)" />
            <div class="p-2 lg:px-3 w-full  bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white"></div>
        </div>
        
        <div class="flex flex-row justify-between items-center w-full mt-4">
            <h1 class="text-xl font-semibold">Statistik</h1>

            <div class="flex flex-row justify-between items-center">
                <select name="model" id="model" class="border-1 border-black px-3 py-1 rounded-lg inset-0">
                    <option value="Cz-HomeSensor">Cz-HomeSensor</option>
                    <option value=""></option>
                </select>
            </div>
        </div>
    </main>
</template>

<script setup>
import Status from '@/components/card/Status.vue';
import axios from 'axios';
import { nextTick, onBeforeMount, ref } from 'vue';


const getData = async() => {
    const res = await axios.get("https://iot-data-server.vercel.app/home-sensor/get-latest");
    data.value = res.data.data;
    nextTick();
}

onBeforeMount(async () => {
    await getData();
})
setInterval(async () => {
    await getData()
}, 5000);

const data = ref();
</script>