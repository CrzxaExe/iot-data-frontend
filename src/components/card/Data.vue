<template>
    <Suspense>
        <template #default>
            <div class="p-2 py-8 lg:py-2 lg:px-3 lg:aspect-square w-full max-w-full lg:max-w-[12rem] bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white">
                <h1 class="text-sm lg:text-base font-medium">{{ model ?? "-Get-" }}</h1>
                
                <div class="flex flex-col items-center mt-1 lg:mt-3">
                    <span class="block text-3xl lg:text-4xl font-semibold text-center">{{ data ?? '' }}</span>
                    <span class="-mt-1 text-xs lg:text-sm text-zinc-300 text-center">{{ desc ?? '' }}</span>
                </div>                
            </div>
        </template>
        <template #fallback>
            <div class="p-2 lg:px-3 aspect-square w-full max-w-[11rem] lg:max-w-[14rem] bg-zinc-700 flex flex-col justify-center items-center relative rounded-2xl text-white">
                <h1 class="text-sm lg:text-base font-medium">-Get-</h1>
                
                <div class="flex flex-col items-center mt-1 lg:mt-3">
                    <span class="block text-3xl lg:text-4xl font-semibold text-center">Data</span>
                    <span class="-mt-1 text-xs lg:text-sm text-zinc-300 text-center">Description</span>
                </div>                
            </div>
        </template>
    </Suspense>
</template>

<script setup>
defineProps({
    model: String,
    desc: String,
    data: String,
})
</script>