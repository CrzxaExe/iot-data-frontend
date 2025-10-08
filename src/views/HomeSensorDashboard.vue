<template>
    <div class="pt-2 w-full relative z-[1]">
        <h1 class="text-xl lg:text-2xl font-semibold">Widget</h1>
        
        <div class="w-full flex flex-row gap-2 lg:gap-4 mt-2">
            <Suspense>
                <Status :model="data.model" :temp="data.data.temperature" :humidity="data.data.humidity" :timestamp="new Date(data.timestamp)" />
            </Suspense>
            <div class="p-2 lg:px-3 w-full  bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white"></div>
        </div>
        
        <div class="flex flex-row justify-between items-center w-full mt-4 lg:mt-8">
            <h1 class="text-xl lg:text-2xl font-semibold">Logs</h1>

            <div class="flex flex-row justify-between items-center text-xs lg:text-sm">
                <select name="model" id="model" v-model="nowModel" @change="fetchLogsAndData" class="border-1 border-black px-3 py-1 rounded-lg inset-0">
                    <option v-for="(model, i) in models" :value="model" :key="i">{{ model }}</option>
                </select>
            </div>
        </div>

        <div>
            <table class="w-full font-light text-xs lg:text-sm table-fixed relative overflow-hidden rounded-lg mt-2">
                <thead>
                    <tr>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4 bg-zinc-200 w-1/3 lg:w-1/2">Model</th>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4 w-1/5.5 lg:w-1/7">Temperature</th>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4 bg-zinc-200 w-1/5 lg:w-1/7">Humidity</th>
                        <th class="text-center px-2 lg:px-4 py-3 pb-4">Timestamp</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="({ model, data: { temperature, humidity }, timestamp }, i) in logs" :key="i">
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3 bg-zinc-200">{{ model }}</td>
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3">{{ temperature }}&deg;C</td>
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3 bg-zinc-200">{{ humidity }}%</td>
                        <td class="text-center px-2 lg:px-4 py-2 lg:py-3">{{ new Date(timestamp).toLocaleTimeString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import Status from '@/components/card/Status.vue';
import { nextTick, onBeforeMount, ref } from 'vue';

const data = ref({
    model: '',
    data: {
        temperature: 0,
        humidity: 0
    },
    timestamp: new Date().toISOString()
});
const models = ref([]);
const nowModel = ref(models.value[0] ?? "");
const logs = ref([
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
    { model: '--', data: { temperature: 0, humidity: 0 }, timestamp: new Date().toISOString() },
]);

const fetchModels = async () => {
    const res = await fetch(import.meta.env.VITE_API + "home-sensor/get-models/");
    const json = await res.json();
    models.value = json.data || [];
    nowModel.value = models.value[0] || '';
};

const fetchLogsAndData = async () => {
    if (!nowModel.value) return;
    const [logsRes, dataRes] = await Promise.all([
        fetch(import.meta.env.VITE_API + "home-sensor/gets/" + nowModel.value + "&10"),
        fetch(import.meta.env.VITE_API + "home-sensor/get-latest/" + nowModel.value)
    ]);
    logs.value = (await logsRes.json()).data || [];
    data.value = (await dataRes.json()).data || {
        model: '',
        data: { temperature: 0, humidity: 0 },
        timestamp: new Date().toISOString()
    };
};

const getData = async () => {
    await fetchModels();
    nextTick();
};

onBeforeMount(async () => {
    await getData();
    await fetchLogsAndData();
})
setInterval(async () => {
    await fetchLogsAndData();
}, 10000);

</script>