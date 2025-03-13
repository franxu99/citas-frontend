import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useInfoStore } from './info';

export const useAppointmentsStore = defineStore('appointments', () => {
    const appointments = ref([]);
    const infoStore = useInfoStore();

    const createAppointment = async (data) => {
        try {
            console.log('data:', data);
            const response = await axios.post(
                'http://127.0.0.1:5000/date/create',
                {
                    center: data.center,
                    date: data.date
                },
                {
                    headers: {
                        Authorization: `Bearer ${infoStore.token}`
                    }
                }
            );
            appointments.value = response.data;
            return response;
        } catch (error) {
            console.error('Error al crear la cita:', error);
            return [];
        }
    };

    const fetchAppointments = async (date) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/appointments?date=${date}`, {
                headers: {
                    Authorization: `Bearer ${infoStore.token}`
                }
            });
            appointments.value = response.data;
            return appointments.value.map(appointment => appointment.time);
        } catch (error) {
            console.error('Error al obtener las citas:', error);
            return [];
        }
    };

    return {
        appointments,
        createAppointment,
        fetchAppointments
    };
});