import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useInfoStore } from './info';
import { data } from 'autoprefixer';

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
            console.log('date:', date);
            const response = await axios.post(`http://127.0.0.1:5000/date/getByDay`, 
                {
                    day: date
                },
                {
                    headers: {
                        Authorization: `Bearer ${infoStore.token}`
                    }
            });
            appointments.value = response.data;
            return response;
        } catch (error) {
            console.error('Error al obtener las citas:', error);
            return [];
        }
    };

    const fetchUserAppointments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/date/getByUser', {
                headers: {
                    Authorization: `Bearer ${infoStore.token}`
                }
            });
            appointments.value = response.data;
            return appointments.value;
        } catch (error) {
            console.error('Error al obtener las citas del usuario:', error);
            return [];
        }
    };

    const deleteAppointment = async (data) => {
        try {
            await axios.post(`http://127.0.0.1:5000/date/delete`,
                {
                    center: data.center,
                    date: data.date
                },
                {
                headers: {
                    Authorization: `Bearer ${infoStore.token}`
                }
            });
            appointments.value = await fetchUserAppointments();
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
        }
    };

    return {
        appointments,
        createAppointment,
        fetchAppointments,
        fetchUserAppointments,
        deleteAppointment
    };
});