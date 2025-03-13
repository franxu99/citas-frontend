import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useInfoStore } from './info';

export const useCentrosStore = defineStore('centros', () => {
    const centros = ref([]);
    const infoStore = useInfoStore();

    const fetchCentros = async () => {
        try {
            console.log('token:', infoStore.token);
            const response = await axios.get('http://127.0.0.1:5000/centers', {
                headers: {
                    Authorization: `Bearer ${infoStore.token}`
                }
            }
            );
            centros.value = response.data;
            return centros.value;
        } catch (error) {
            console.error('Error al obtener los centros:', error);
        }
    }

    return {
        centros,
        fetchCentros
    };
});