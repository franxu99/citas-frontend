import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useInfoStore = defineStore('info', () => {
    const username = ref('');
    const name = ref('');
    const lastname = ref('');
    const email = ref('');
    const phone = ref('');
    const date = ref('');
    const token = ref('');

    const setUserInfo = (userInfo) => {
        username.value = userInfo.username;
        name.value = userInfo.name;
        lastname.value = userInfo.lastname;
        email.value = userInfo.email;
        phone.value = userInfo.phone;
        date.value = userInfo.date;
        token.value = userInfo.token;
    };

    const clearUserInfo = () => {
        username.value = '';
        name.value = '';
        lastname.value = '';
        email.value = '';
        phone.value = '';
        date.value = '';
        token.value = '';
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/profile', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
    };

    const updateUserProfile = async (updatedInfo) => {
        console.log('updatedInfo:', updatedInfo);
        console.log('token:', token.value);
        try {
            const response = await axios.patch('http://127.0.0.1:5000/currentUser', updatedInfo, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            setUserInfo(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el perfil del usuario:', error);
            throw error;
        }
    };

    return {
        username,
        name,
        lastname,
        email,
        phone,
        date,
        token,
        setUserInfo,
        clearUserInfo,
        fetchUserProfile,
        updateUserProfile,
    };
});