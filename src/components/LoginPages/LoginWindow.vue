<template>
    <div class="login-container">
        <label for="username">Логин:</label>
        <input v-model="username" placeholder="Введите логин" />
        <label>Пароль:</label>
        <input type="password" v-model="password" placeholder="Введите пароль" />
        <button @click="Log">Войти</button>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  const Log = () => {
    if (username.value === '1' && password.value === '1') {
      alert('Успешный вход!');
    } else {
      alert('Неверный логин или пароль.');
    }
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