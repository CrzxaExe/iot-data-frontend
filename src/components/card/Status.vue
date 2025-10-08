<template>
    <Suspense>
        <template #default>
            <div class="p-2 lg:px-3 aspect-square w-full max-w-[11rem] lg:max-w-[14rem] bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white">
                <h1 class="text-xs lg:text-sm font-medium">{{ model ?? "-Get-" }}</h1>
                
                <div class="flex flex-col items-center mt-1 lg:mt-3">
                    <span class="block text-4xl lg:text-5xl font-semibold">{{ temp ?? 0 }}&deg;C</span>
                    <span class="-mt-1 text-xs lg:text-sm">Humidity {{ humidity ?? 0 }}%</span>
                </div>
                
                <span class="absolute bottom-2 right-2 text-xs font-light text-zinc-200">{{ timestamp.toLocaleTimeString() }}</span>
            </div>
        </template>
        <template #fallback>
            <div class="p-2 lg:px-3 aspect-square w-full max-w-[11rem] lg:max-w-[14rem] bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white">
                <h1 class="text-xs lg:text-sm font-medium">-Get-</h1>
                
                <div class="flex flex-col items-center mt-1 lg:mt-3">
                    <span class="block text-4xl lg:text-5xl font-semibold">0&deg;C</span>
                    <span class="-mt-1 text-xs lg:text-sm">Humidity 0%</span>
                </div>
                
                <span class="absolute bottom-2 right-2 text-xs font-light text-zinc-200">{{ timestamp.toLocaleTimeString() }}</span>
            </div>
        </template>
    </Suspense>
</template>

<script setup>
defineProps({
    model: String,
    temp: Number,
    humidity: Number,
    timestamp: Date
})
</script>