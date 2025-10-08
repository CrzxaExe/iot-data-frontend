<script setup lang="ts">
import Topbar from '@/components/navigations/Topbar.vue';

</script>

<template>
    <main class="overflow-x-hidden">
        <Topbar />

        <div class="w-full max-w-[100rem] mx-auto px-3 pt-14">
            <RouterView />
        </div>
    </main>
</template>