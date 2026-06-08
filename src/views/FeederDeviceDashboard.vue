<template>
    <div class="pb-2 w-full relative z-[1]">
        <h1 class="text-2xl lg:text-2xl font-semibold mb-2">Feeder Device</h1>

        <div class="w-full flex flex-col lg:flex-row gap-2 lg:gap-4 relative">
            <Data :data="nowModel" desc="Perangkat saat ini" model="Nama Perangkat" />
            <Data :data="models.length" desc="Total perangkat" model="Perangkat" />

            <div class="flex flex-row gap-2 lg:gap-4">
                <Data :data="total" desc="Total aktif hari ini" model="Total" />
                <Data :data="count" desc="Total aktifasi dari perangkat" model="Aktifasi" />
            </div>

            <div class="min-h-full w-full bg-zinc-700 rounded-2xl"></div>
        </div>

        <div class="flex flex-row justify-between items-center w-full mt-2 lg:mt-4">
            <h1 class="text-xl lg:text-2xl font-semibold">History</h1>

            <div class="flex flex-row justify-between items-center text-xs lg:text-sm mt-2">
                <select name="model" id="model" v-model="nowModel" @change="fetchData" class="border-1 border-black px-3 py-1 rounded-lg inset-0">
                    <option v-for="(model, i) in models" :value="model" :key="i">{{ model }}</option>
                </select>
            </div>
        </div>

        <div>
            <table class="w-full font-light text-xs lg:text-sm relative overflow-x-hidden rounded-lg mt-2">
                <thead>
                    <tr>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4 bg-zinc-200 w-1/3 lg:w-1/2">Model</th>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4">Tanggal</th>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4 bg-zinc-200">Timestamp</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="({ model, data }, i) in data.data" :key="i">
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3 bg-zinc-200">{{ model }}</td>
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3">{{ new Date(data).toLocaleDateString("id-ID") }}</td>
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3 bg-zinc-200">{{ new Date(data).toLocaleTimeString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import Data from '@/components/card/Data.vue';
import { onMounted, ref } from 'vue';

const models = ref([]);
const nowModel = ref("Tester");
const data = ref([]);
const total = ref(0);
const count = ref(0);

const fetchModels = async () => {
    const res = await fetch(import.meta.env.VITE_API + "feeder/get-models/");
    const json = await res.json();
    models.value = json.data || [];
    nowModel.value = models.value[0] || '';
};
const fetchData = async () => {
    const [log, counter] = await Promise.all([
        fetch(import.meta.env.VITE_API + "feeder/gets/" + nowModel.value).then(e => e.json()),
        fetch(import.meta.env.VITE_API + "feeder/count/" + nowModel.value).then(e => e.json()),
    ]);

    data.value = log;

    total.value = log.data.filter(e => {
        const tgl = new Date(e.data);
        const now = new Date();

        return tgl.getFullYear() === now.getFullYear() && tgl.getMonth() === now.getMonth() && tgl.getDate() === now.getDate();
    }).length;

    count.value = counter.data;
};

onMounted(async () => {
    await fetchModels();
    await fetchData();
});
setInterval(async () => {
    await fetchData();
}, 10000);
</script>