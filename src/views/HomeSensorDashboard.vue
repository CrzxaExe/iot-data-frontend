<template>
    <div class="pb-2 w-full relative z-[1]">
        <h1 class="text-xl lg:text-2xl font-semibold">Home Sensor</h1>
        
        <div class="w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
            <Suspense>
                <Status :model="data.model" :temp="data.data.temperature" :humidity="data.data.humidity" :timestamp="new Date(data.timestamp)" />
            </Suspense>
            <div class="w-full flex flex-col md:flex-row gap-2 lg:gap-4">
                <div class="p-2 lg:px-3 w-full md:w-[50%] lg:w-[62%] bg-zinc-200 flex flex-col justify-center items-center relative rounded-2xl">
                    <apexchart type="line" :series="dataSeries" :options="dataOption" class="w-full aspect-video max-h-[12rem] max-w-full lg:max-w-[30rem]" />
                </div>

                <div class="px-2 py-3 2xl:py-4 2xl:px-3 w-full bg-zinc-200 flex flex-col 2xl:flex-row md:gap-6 lg:gap-12 relative rounded-2xl min-h-full">
                    <div class="w-full 2xl:w-1/2 flex flex-col lg:min-h-[30%] 2xl:min-h-full">
                        <h1 class="text-lg 2xl:text-xl font-bold tracking-tighter w-full">Temperature</h1>

                        <div class="flex flex-row items-center w-full 2xl:min-h-full max-h-[4rem] mt-2 2xl:-mt-8">
                            <div class="w-1/2 min-h-full max-h-[10rem] flex flex-col items-center justify-center px-3 py-0.5 xl:py-1">
                                <h1 class="tracking-tighter text-xs lg:text-sm 2xl:text-base">Low</h1>
                                
                                <span class="block font-extrabold tracking-tighter text-2xl 2xl:text-4xl mt-1 2xl:mt-4 text-[#008ffb]">{{ tempLogs.low.data.temperature }}&deg;C</span>
                                <span class="block text-xs lg:text-sm -mt-1">{{ new Date(tempLogs.low.timestamp).toLocaleTimeString() }}</span>
                            </div>

                            <div class="min-h-[3rem] h-full max-h-[10rem] w-[2px] bg-black"></div>

                            <div class="w-1/2 min-h-full max-h-[10rem] flex flex-col items-center justify-center px-3 py-0.5 xl:py-1">
                                <h1 class="tracking-tighter text-xs lg:text-sm 2xl:text-base">High</h1>
                                
                                <span class="block font-extrabold tracking-tighter text-2xl 2xl:text-4xl mt-1 2xl:mt-4 text-[#008ffb]">{{ tempLogs.high.data.temperature }}&deg;C</span>
                                <span class="block text-xs lg:text-sm -mt-1">{{ new Date(tempLogs.high.timestamp).toLocaleTimeString() }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full 2xl:w-1/2 flex flex-col lg:min-h-[30%] 2xl:min-h-full">
                        <h1 class="text-lg 2xl:text-xl font-bold tracking-tighter w-full">Humidity</h1>

                        <div class="flex flex-row items-center w-full 2xl:min-h-full max-h-[4rem] mt-2 2xl:-mt-8">
                            <div class="w-1/2 min-h-full max-h-[10rem] flex flex-col items-center justify-center px-3 py-0.5 xl:py-1">
                                <h1 class="tracking-tighter text-xs lg:text-sm 2xl:text-base">Low</h1>
                                
                                <span class="block font-extrabold tracking-tighter text-2xl 2xl:text-4xl mt-1 2xl:mt-4 text-[#00e396]">{{ humLogs.low.data.humidity }}%</span>
                                <span class="block text-xs lg:text-sm -mt-1">{{ new Date(humLogs.low.timestamp).toLocaleTimeString() }}</span>
                            </div>

                            <div class="min-h-[3rem] h-full max-h-[10rem] w-[2px] bg-black"></div>

                            <div class="w-1/2 min-h-full max-h-[10rem] flex flex-col items-center justify-center px-3 py-0.5 xl:py-1">
                                <h1 class="tracking-tighter text-xs lg:text-sm 2xl:text-base">High</h1>
                                
                                <span class="block font-extrabold tracking-tighter text-2xl 2xl:text-4xl mt-1 2xl:mt-4 text-[#00e396]">{{ humLogs.high.data.humidity }}%</span>
                                <span class="block text-xs lg:text-sm -mt-1">{{ new Date(humLogs.high.timestamp).toLocaleTimeString() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-row justify-between items-center w-full mt-2 lg:mt-4">
            <h1 class="text-xl lg:text-2xl font-semibold">History</h1>

            <div class="flex flex-row justify-between items-center text-xs lg:text-sm mt-2">
                <select name="model" id="model" v-model="nowModel" @change="fetchLogsAndData" class="border-1 border-black px-3 py-1 rounded-lg inset-0">
                    <option v-for="(model, i) in models" :value="model" :key="i">{{ model }}</option>
                </select>
            </div>
        </div>

        <div>
            <table class="w-full font-light text-xs lg:text-sm relative overflow-x-hidden rounded-lg mt-2">
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
const tempLogs = ref({
    low: {
        model: '',
        data: {
            temperature: 0,
            humidity: 0
        },
        timestamp: new Date().toISOString()
    },
    high: {
        model: '',
        data: {
            temperature: 0,
            humidity: 0
        },
        timestamp: new Date().toISOString()
    },
})
const humLogs = ref({
    low: {
        model: '',
        data: {
            temperature: 0,
            humidity: 0
        },
        timestamp: new Date().toISOString()
    },
    high: {
        model: '',
        data: {
            temperature: 0,
            humidity: 0
        },
        timestamp: new Date().toISOString()
    },
})

const dataSeries = ref([
    {
        name: "Temperature",
        data: [ ...logs.value.map(e => e.data.temperature)]
    },
    {
        name: "Humidity",
        data: [ ...logs.value.map(e => e.data.humidity)]
    }
])
const dataOption = ref({
    chart: {
        height: 'auto',
        width: '100%',
        toolbar: {
            show: false
        },
    },
    title: {
        text: 'Temperature',
        align: 'left'
    },
    grid: {
        row: {
        colors: ['#fff', 'transparent'],
        opacity: 0.5
        },
    },
    yaxis: {
        show: true,
        showAlways: true,
        axisBorder: {
            color: '#000'
        },
    },
    xaxis: {
        axisBorder: {
            color: '#000'
        },
        categories: [],
    }
})

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
    const res = await logsRes.json();
    logs.value = res.data || [];
    data.value = (await dataRes.json()).data || {
        model: '',
        data: { temperature: 0, humidity: 0 },
        timestamp: new Date().toISOString()
    };

    tempLogs.value = {
        low: structuredClone(res.data).sort((a,b) => a.data.temperature - b.data.temperature)[0],
        high: structuredClone(res.data).sort((a,b) => b.data.temperature - a.data.temperature)[0],
    }
    humLogs.value = {
        low: structuredClone(res.data).sort((a,b) => a.data.humidity - b.data.humidity)[0],
        high: structuredClone(res.data).sort((a,b) => b.data.humidity - a.data.humidity)[0],
    }

    dataSeries.value[0].data = [ ...logs.value.reverse().map(e => e.data.temperature)];
    dataSeries.value[1].data = [ ...logs.value.reverse().map(e => e.data.humidity)];
    dataOption.value = {
        ...dataOption.value,
        xaxis: {
            ...dataOption.value.xaxis,
            categories:  [ ...logs.value.reverse().map(e => {
                const d = new Date(e.timestamp)
                return d.getMinutes().toString().padEnd(2, "0") + ":" + d.getSeconds().toString().padEnd(2, "0");
            })]
        }
    }
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