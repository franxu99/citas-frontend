<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Agendar Cita</h1>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div class="mb-4">
        <label for="service" class="block text-sm font-medium text-gray-700">Servicio</label>
        <Select v-model="selectedService" :options="services" optionLabel="name" placeholder="Selecciona un servicio" class="w-full" />
      </div>
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
        <Calendar v-model="selectedDate" dateFormat="dd/mm/yy" placeholder="Selecciona una fecha" class="w-full" @change="fetchAppointments" />
      </div>
      <div class="mb-4">
        <label for="time" class="block text-sm font-medium text-gray-700">Hora</label>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="hour in hours"
            :key="hour"
            :disabled="isHourDisabled(hour)"
            @click="selectTime(hour)"
            :class="['py-2 px-4 rounded', selectedTime === hour ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700', isHourDisabled(hour) ? 'opacity-50 cursor-not-allowed' : '']"
            type="button"
          >
            {{ hour }}
          </button>
        </div>
      </div>
      <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Agendar Cita</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Select } from 'primevue';
import Calendar from 'primevue/calendar';
import { useCentrosStore } from '../store/centros';
import { useAppointmentsStore } from '../store/appointments';

const router = useRouter();

const centrosStore = useCentrosStore();
const appointmentsStore = useAppointmentsStore();
const services = ref([]);
const selectedService = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);
const hours = ref([
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
]);
const reservedHours = ref([]);

onMounted(async () => {
  services.value = await centrosStore.fetchCentros();
  console.log(services.value);
});

const fetchAppointments = async () => {
  if (selectedDate.value) {
    reservedHours.value = await appointmentsStore.fetchAppointments(selectedDate.value);
  }
};

const isHourDisabled = (hour) => {
  return reservedHours.value.includes(hour);
};

const selectTime = (hour) => {
  if (!isHourDisabled(hour)) {
    selectedTime.value = hour;
  }
};

const formatDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

  return `${day}/${month}/${year} ${formattedTime}`;
};

const handleSubmit = async () => {
  // Lógica para manejar el envío del formulario
  console.log('Servicio:', selectedService.value);
  console.log('Fecha:', selectedDate.value);
  console.log('Hora:', selectedTime.value);

  const combinedDateTime = formatDateTime(selectedDate.value, selectedTime.value);


    let response = await appointmentsStore.createAppointment({
        center: selectedService.value.name,
        date: combinedDateTime
    });

  response.status === 200 ? alert('Cita agendada correctamente') : alert('Error al agendar la cita');
  router.push('/');
};
</script>

<style scoped>
/* Agrega tus estilos personalizados aquí */
</style>