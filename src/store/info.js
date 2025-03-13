import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useInfoStore = defineStore('info', () => {
    const username = ref(localStorage.getItem('username') || '');
    const name = ref(localStorage.getItem('name') || '');
    const lastname = ref(localStorage.getItem('lastname') || '');
    const email = ref(localStorage.getItem('email') || '');
    const phone = ref(localStorage.getItem('phone') || '');
    const date = ref(localStorage.getItem('date') || '');
    const token = ref(localStorage.getItem('token') || '');
    const isAuthenticated = ref(!!token.value);


    const setUserInfo = (userInfo) => {
        username.value = userInfo.username;
        name.value = userInfo.name;
        lastname.value = userInfo.lastname;
        email.value = userInfo.email;
        phone.value = userInfo.phone;
        date.value = userInfo.date;
        token.value = userInfo.token;
        isAuthenticated.value = true;
        localStorage.setItem('token', userInfo.token); // Guardar el token en localStorage

        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('name', userInfo.name);
        localStorage.setItem('lastname', userInfo.lastname);
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('phone', userInfo.phone);
        localStorage.setItem('date', userInfo.date);
        localStorage.setItem('token', userInfo.token);

    };

    const clearUserInfo = () => {
        username.value = '';
        name.value = '';
        lastname.value = '';
        email.value = '';
        phone.value = '';
        date.value = '';
        token.value = '';
        isAuthenticated.value = false;
        localStorage.removeItem('token'); // Eliminar el token de localStorage

        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('date');
        localStorage.removeItem('token');

    };

    const login = async (usernameInput, passwordInput) => {
        try {
            console.log('usernameInput:', usernameInput);
            console.log('passwordInput:', passwordInput);
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username: usernameInput,
                password: passwordInput
            });
            if (response.data.access_token) {
                username.value = usernameInput; // Asigna el valor directamente
                token.value = response.data.access_token; // Asigna el valor directamente
                isAuthenticated.value = true;
                localStorage.setItem('token', response.data.access_token); // Guardar el token en localStorage
                console.log('Inicio de sesión exitoso');
                await fetchUserProfile();
                return true;
            } else {
                errorMessage.value = 'Nombre de usuario o contraseña incorrectos';
                return false;
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
            return false;
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/profile', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            console.log('response.data:', response.data);
            const userInfo = response.data;
            userInfo.token = token.value; // Asigna el valor directamente   
            // Formatear la fecha de nacimiento a dd/mm/yyyy
            if (userInfo.date) {
                userInfo.date = new Date(userInfo.date).toLocaleDateString('es-ES');
                console.log('userInfo.date:', userInfo.date);
            }
            setUserInfo(userInfo);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
    };

    const updateUserProfile = async (updatedInfo) => {
        console.log('updatedInfo:', updatedInfo);
        console.log('token:', token.value);
        try {
            await axios.patch('http://127.0.0.1:5000/currentUser', updatedInfo, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            await fetchUserProfile(); // Actualizar la información del usuario
        } catch (error) {
            console.error('Error al actualizar el perfil del usuario:', error);
            throw error;
        }
    };

    const register = async (username, password, name, lastname, email, phone, date) => {
        try {
            console.log(date)
            const response = await axios.post('http://127.0.0.1:5000/register', 
                {
                    date: date,
                    email: email,
                    lastname: lastname,
                    name: name,
                    password: password,
                    phone: phone,
                    username: username
                }
            );
            if (response.status === 200) {
                console.log('Registro exitoso');
                return response;
            } else {
                console.error('Error al registrar el usuario:', response.data);
                return false;
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            return false;
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
        isAuthenticated,
        setUserInfo,
        clearUserInfo,
        fetchUserProfile,
        updateUserProfile,
        login,
        register
    };
});