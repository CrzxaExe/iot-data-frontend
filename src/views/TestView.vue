<template>
    <div>
        <h1 class="text-2xl lg:text-3xl font-bold">Testing</h1>

        <div class="flex flex-col lg:flex-row text-xs lg:text-sm">
            <div class="mt-4 bg-zinc-200 w-full lg:w-1/3 px-2 lg:px-4 py-1 lg:py-3 rounded-lg">
                <h1 class="text-lg lg:text-xl font-bold tracking-tighter">Redirect Test</h1>

                <div class="flex flex-col lg:flex-row gap-2 w-full mt-2">
                    <input type="url" name="url" id="url" placeholder="URLs" class="outline-none bg-white w-full px-2 py-1 rounded-lg" @keydown="handleChange">
                    <input type="text"name="formatedUrl" id="formatedUrl" placeholder="Formated URL" readonly class="outline-none bg-white w-full px-2 py-1 rounded-lg" :value="url">
                    <button class="bg-white px-2 py-1 rounded-lg" @click="handleSubmit">Go</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const url = ref('');

const handleChange = (element) => {
    url.value = encodeURIComponent(element.target.value).slice(0, -3);
}

const handleSubmit = async (e) => {
    e.preventDefault();

    window.location.href = import.meta.env.VITE_API+"test/redirect/"+url.value;
}
</script>