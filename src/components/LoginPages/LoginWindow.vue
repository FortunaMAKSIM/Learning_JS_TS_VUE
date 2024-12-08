<template>
    <div class="login-container">
        <label>Логин:</label>
        <input v-model="userLogin" placeholder="Введите логин" />
        <label>Пароль:</label>
        <input type="password" v-model="userPassword" placeholder="Введите пароль" />
        <button @click="Log()">Войти</button>
        <button @click="Reg()">Регистрация</button>

        <div v-if="isRegModalOpen" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeRegModal">&times;</span>
            <h2>Регистрация</h2>
            <input v-model="newUserLRLogin" placeholder="Логин" />
            <input v-model="newUserLRPaassword" placeholder="Пароль" />
            <button @click="addUserLR()">Зарегистрироваться</button>
          </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const users = ref<UserLRType[]>([]);

type UserLRType = {
id: number;
login: string;
password: string;
};

const newUserLRLogin = ref('');
const newUserLRPaassword = ref('');
const isRegModalOpen = ref(false);

const userLogin = ref('');
const userPassword = ref('');

const addUserLR = () => {
  if (newUserLRLogin.value && newUserLRPaassword.value) {
    const existingUser = users.value.find(user => user.login === newUserLRLogin.value);

    if (existingUser) {
      alert("Пользователь с таким логином уже существует.");
    } else {
      // Если пользователя нет, создаем нового
      const newUser : UserLRType = {
        id: users.value.length,
        login: newUserLRLogin.value,
        password: newUserLRPaassword.value,
      };

      users.value.push(newUser );
      newUserLRLogin.value = '';
      newUserLRPaassword.value = '';
      alert("Пользователь успешно зарегистрирован.");
    }
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
};

const Log = () => {
  const user = users.value.find(user => user.login === userLogin.value && user.password === userPassword.value);
  if (user) {
    alert('Успешный вход!');
  } else {
    alert('Неверный логин или пароль.');
  }
};

const Reg = () => {
  newUserLRLogin.value = '';
  newUserLRPaassword.value = '';
  isRegModalOpen.value = true;
};

const closeRegModal = () => {
  isRegModalOpen.value = false;
  newUserLRLogin.value = '';
  newUserLRPaassword.value = '';
};
</script>


<style scoped>
.login-container {
max-width: 300px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
}
</style>