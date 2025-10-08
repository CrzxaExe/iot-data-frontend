<template>
    <RouterLink class="flex items-center lg:aspect-[3.5/1] bg-white lg:max-w-[18rem] shadow-xl px-3 lg:px-6 py-3 w-full rounded-xl" :class="cls" :to>
        <div class="flex flex-col">
            <h1 class="text-xl font-semibold">{{ label }}</h1>
            <p class="font-light text-sm">{{ description }}</p>
        </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    label: String,
    to: String,
    description: String,
    cls: String
})
</script>