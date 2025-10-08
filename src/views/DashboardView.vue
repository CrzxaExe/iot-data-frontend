<script setup>
import Ticket from '@/components/card/Ticket.vue';
</script>

<template>
  <main class="w-full relative z-[1] px-3 lg:px-0">
    <h1 class="text-xl font-semibold">Sensors</h1>
    <div class="w-full mt-4">
      <Ticket label="Home Sensor" to="/dashboard/home-sensor" description="Sensor installed for house" cls="border-0 border-b-[6px] border-b-cyan-500" />
    </div>
  </main>
</template>
