<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Mis Citas</h1>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Usuario</th>
          <th class="py-2 px-4 border-b">Día</th>
          <th class="py-2 px-4 border-b">Hora</th>
          <th class="py-2 px-4 border-b">Centro</th>
          <th class="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointmentsStore.appointments" :key="appointment.id">
          <td class="py-2 px-4 border-b text-center">{{ appointment.username }}</td>
          <td class="py-2 px-4 border-b text-center">{{ formatDate(appointment.date) }}</td>
          <td class="py-2 px-4 border-b text-center">{{ formatTime(appointment.date) }}</td>
          <td class="py-2 px-4 border-b text-center">{{ appointment.center }}</td>
          <td class="py-2 px-4 border-b text-center">
            <button @click="deleteAppointment(appointment)" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppointmentsStore } from '../store/appointments';

const appointmentsStore = useAppointmentsStore();
const appointments = ref([]);

onMounted(async () => {
  appointments.value = await appointmentsStore.fetchUserAppointments();
});

const formatDate = (dateString) => {
  const [date, time] = dateString.split(' ');
  return date;
};

const formatTime = (dateString) => {
  const [date, time] = dateString.split(' ');
  return time.slice(0, 5);
};

const deleteAppointment = async (data) => {
    console.log(data);
  await appointmentsStore.deleteAppointment(data);
};
</script>

<style scoped>
/* Agrega tus estilos personalizados aquí */
</style>