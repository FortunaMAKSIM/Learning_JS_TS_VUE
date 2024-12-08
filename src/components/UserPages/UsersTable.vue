<template>
  <div class="users-table__add">
    <button @click="openAddModal( )">Добавить</button>
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
      <div class="users-table__edt"><button @click="openEditModal(user)">Изменить</button></div>
    </div>
  </div>

  
  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h2>Редактировать пользователя</h2>
      <input v-model="editUserName" placeholder="Имя" />
      <input v-model="editUserEmail" placeholder="Почта" />
      <button @click="saveUser ()">Сохранить</button>
    </div>
  </div>

  
  <div v-if="isAddModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeAddModal">&times;</span>
      <h2>Добавить пользователя</h2>
      <input v-model="newUserName" placeholder="Имя" />
      <input v-model="newUserEmail" placeholder="Почта" />
      <button @click="addUser ()">Добавить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store.ts';

const { users } = useStore();

type UserType = {
  id: number;
  name: string;
  email: string;
  created: string;
};

const newUserName = ref('');
const newUserEmail = ref('');
const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const editUserId = ref<number | null>(null);
const editUserName = ref('');
const editUserEmail = ref('');

const addUser  = () => {
  if (newUserName.value && newUserEmail.value) {
    const newUser : UserType = {
      id: users.value.length,
      name: newUserName.value,
      email: newUserEmail.value,
      created: new Date().toLocaleDateString(),
    };

    users.value.push(newUser );
    newUserName.value = '';
    newUserEmail.value = '';
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
};

const deleteUser  = (userId: number) => {
  users.value = users.value.filter(user => user.id !== userId);
};

const openEditModal = (user: UserType) => {
  editUserId.value = user.id;
  editUserName.value = user.name;
  editUserEmail.value = user.email;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editUserId.value = null;
  editUserName.value = '';
  editUserEmail.value = '';
};

const saveUser  = () => {
  if (editUserId.value !== null) {
    const userIndex = users.value.findIndex(user => user.id === editUserId.value);
    if (userIndex !== -1) {
      users.value[userIndex].name = editUserName.value;
      users.value[userIndex].email = editUserEmail.value;
    }
    closeEditModal();
  }
};

const openAddModal = () => {
  newUserName.value = '';
  newUserEmail.value = '';
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
  newUserName.value = '';
  newUserEmail.value = '';
};
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

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
