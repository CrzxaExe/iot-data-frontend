<script setup>
import Ticket from '@/components/card/Ticket.vue';
</script>

<template>
  <main class="pt-18 w-full max-w-[100rem] mx-auto relative z-[1] px-3 lg:px-0">
    <h1 class="text-xl font-semibold">Sensors</h1>
    <div class="w-full">
      <Ticket label="Home Sensor" to="/home-sensor" description="Sensor installed for house" cls="border-0 border-b-[8px] border-b-cyan-500" />
    </div>
  </main>
</template>
