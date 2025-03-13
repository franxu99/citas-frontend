<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useInfoStore } from '../store/info';
import { InputText } from 'primevue';


const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');
const lastname = ref('');
const phone = ref('');
const date = ref('');
const username = ref('');
const errorMessage = ref('');

const router = useRouter();
const infoStore = useInfoStore();

const toggleForm = () => {
    isLogin.value = !isLogin.value;
    errorMessage.value = ''; // Limpiar el mensaje de error al cambiar de formulario
};

const handleSubmit = async () => {
    errorMessage.value = ''; // Limpiar el mensaje de error antes de enviar el formulario
    if (isLogin.value) {
        // Lógica para iniciar sesión
        console.log('Iniciar sesión con', username.value, password.value);
        try {
            console.log('Iniciar sesión con', username.value, password.value);
            if(await infoStore.login(username.value, password.value)){
                console.log('Inicio de sesión exitoso');
                router.push('/');
            }else{
                errorMessage.value = 'Error en el inicio de sesión';
            }
        } catch (error) {
            errorMessage.value = error.response ? error.response.data.msg : error.message;
        }
    } else {
        console.log('Registrarse con', username.value, password.value, name.value, lastname.value, email.value, phone.value, date.value);
        // Lógica para registrarse
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', {
                username: username.value,
                password: password.value,
                name: name.value,
                lastname: lastname.value,
                email: email.value,
                phone: phone.value,
                date: date.value
            });
            if (response.status === 200) {
                infoStore.setUserInfo({
                    username: username.value,
                    name: name.value,
                    lastname: lastname.value,
                    email: email.value,
                    phone: phone.value,
                });
                console.log('Registro exitoso');
                router.push('/');
            } else {
                errorMessage.value = 'Error en el registro';
            }
        } catch (error) {
            errorMessage.value = error.response ? error.response.data.msg : error.message;
        }
    }
};
</script>
<template>
    <main class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div>
                <img src="/public/login.png" alt="Salud Nova" class="h-8 mx-auto" />
            </div>
            <h1 class="text-2xl font-bold mb-6 text-center">{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h1>
            <form @submit.prevent="handleSubmit">
                <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
                    {{ errorMessage }}
                </div>
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <InputText type="text" id="username" v-model="username" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div v-if="!isLogin" class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <InputText type="text" id="name" v-model="name" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div v-if="!isLogin" class="mb-4">
                    <label for="lastname" class="block text-sm font-medium text-gray-700">Apellido</label>
                    <InputText type="text" id="lastname" v-model="lastname" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div v-if="!isLogin" class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                    <InputText type="text" id="phone" v-model="phone" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div v-if="!isLogin" class="mb-4">
                    <label for="date" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <InputText type="text" id="date" v-model="date" required placeholder="DD/MM/YYYY"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div v-if="!isLogin" class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <InputText type="email" id="email" v-model="email" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <InputText type="password" id="password" v-model="password" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{{
                        isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</button>
            </form>
            <button @click="toggleForm"
                class="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión' }}
            </button>
        </div>
    </main>
</template>

<style scoped>
/* Agrega tus estilos personalizados aquí */
</style>