<template>
    <div class="users-table__add">
    <input v-model="newUserName" placeholder="Имя" />
    <input v-model="newUserEmail" placeholder="Почта" />
    <button @click="addUser()">Добавить</button>
    </div>
    <div class="users-table">
      <div class="users-table__row">
        <div class="users-table__cell">id</div>
        <div class="users-table__cell">Имя</div>
        <div class="users-table__cell">Почта</div>
        <div class="users-table__cell">Дата создания</div>
      </div>
      <div v-for="user in users" :key="user.id" class="users-table__row">
        <div class="users-table__cell">{{ user.id }}</div>
        <div class="users-table__cell">{{ user.name }}</div>
        <div class="users-table__cell">{{ user.email }}</div>
        <div class="users-table__cell">{{ user.created }}</div>
        <div class="users-table__del"><button @click="deleteUser(user.id)">Удалить</button></div>
        <div class="users-table__edt"><button @click="editUser(user.id)">Изменить</button></div>
      </div>
    </div>
    </template>
    
    <script setup lang="ts">
    import { ref, computed } from 'vue'
    
    type UserType = {
      id: number
      name: string
      email: string
      created: string | Date
    }
    
    const currentDate = new Date()
    
    const createdMockDate = computed(() => {
      return `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`
    })
    
    const users = ref<UserType[]>([
      {
        id: 0,
        name: 'Ann',
        email: 'alex@alex.alex',
        created: createdMockDate.value,
      },
      {
        id: 1,
        name: 'Alex',
        email: 'ann@ann.ann',
        created: createdMockDate.value,
      },
      {
        id: 2,
        name: 'Art',
        email: 'art@art.art',
        created: createdMockDate.value,
      },
      {
        id: 3,
        name: 'you',
        email: 'you@you.you',
        created: createdMockDate.value,
      }
    ])

    const newUserName = ref('')
    const newUserEmail = ref('')

    const addUser = () => {
      if (newUserName.value && newUserEmail.value) {
        const newUser: UserType = {
          id: users.value.length,
          name: newUserName.value,
          email: newUserEmail.value,
          created: createdMockDate.value,
        }
        
        users.value.push(newUser)
        
        // Очистка полей ввода после добавления
        newUserName.value = ''
        newUserEmail.value = ''
      } else {
        alert("Пожалуйста, заполните все поля.");
      }
    }

    const deleteUser = (userId: number) => {
    users.value = users.value.filter(user => user.id !== userId);
    }

    const editUser = (userId: number) => {
    users.value = users.value.filter(user => user.id !== userId);
    }
    </script>
    
    <style scoped>
    .users-table {
      display: flex;
      flex-direction: column;
    }
    
    .users-table__row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
    
    .users-table__cell {
      min-width: 120px;
      background-color: #888888;
      border: 1px solid cornsilk;
      text-align: center;
      padding: 4px;
    }

    .users-table__del {
      min-width: 120px;
      background-color: #FF0000;
      border: 1px solid cornsilk;
      text-align: center;
      padding: 4px;
    }
    .users-table__add {
      min-width: 120px;
      background-color: #00ff00;
      border: 1px solid cornsilk;
      text-align: center;
      padding: 4px;
    }
    .users-table__edt {
      min-width: 120px;
      background-color: #0000FF;
      border: 1px solid cornsilk;
      text-align: center;
      padding: 4px;
    }
    </style>