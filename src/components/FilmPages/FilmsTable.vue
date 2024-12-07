<template>
<div class="films-table__add">
    <button @click="openAddModal( )">Добавить</button>
</div>

<div class="films-table">
    <div class="films-table__row">
    <div class="films-table__cell">id</div>
    <div class="films-table__cell">Название фильма</div>
    <div class="films-table__cell">Дата сеанса</div>
    </div>
    <div v-for="film in films" :key="film.id" class="films-table__row">
    <div class="films-table__cell">{{ film.id }}</div>
    <div class="films-table__cell">{{ film.title }}</div>
    <div class="films-table__cell">{{ film.session }}</div>
    <div class="films-table__del"><button @click="deleteFilm(film.id)">Удалить</button></div>
    <div class="films-table__edt"><button @click="openEditModal(film)">Изменить</button></div>
    </div>
</div>


<div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
    <span class="close" @click="closeEditModal">&times;</span>
    <h2>Редактировать фильм</h2>
    <input v-model="editFilmtitle" placeholder="Название" />
    <input v-model="editFilmDate" placeholder="Дата сеанса" />
    <button @click="saveFilm ()">Сохранить</button>
    </div>
</div>


<div v-if="isAddModalOpen" class="modal">
    <div class="modal-content">
    <span class="close" @click="closeAddModal">&times;</span>
    <h2>Добавить фильм</h2>
    <input v-model="newFilmtitle" placeholder="Имя" />
    <input v-model="newFilmDate" placeholder="Дата сеанса" />
    <button @click="addFilm ()">Добавить</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../../store.ts';

const { films } = useStore();

type FilmType = {
id: number;
title: string;
session: string;
};

const newFilmtitle = ref('');
const newFilmDate = ref('');
const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const editFilmId = ref<number | null>(null);
const editFilmtitle = ref('');
const editFilmDate = ref('');

const addFilm  = () => {
  if (newFilmtitle.value && newFilmDate.value) {
    const newFilm : FilmType = {
      id: films.value.length,
      title: newFilmtitle.value,
      session: newFilmDate.value,
    };

    films.value.push(newFilm );
    newFilmtitle.value = '';
    newFilmDate.value = '';
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
};

const deleteFilm  = (filmId: number) => {
  films.value = films.value.filter(film => film.id !== filmId);
};

const openEditModal = (film: FilmType) => {
  editFilmId.value = film.id;
  editFilmtitle.value = film.title;
  editFilmDate.value = film.session;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editFilmId.value = null;
  editFilmtitle.value = '';
  editFilmDate.value = '';
};

const saveFilm  = () => {
  if (editFilmId.value !== null) {
    const filmIndex = films.value.findIndex(film => film.id === editFilmId.value);
    if (filmIndex !== -1) {
      films.value[filmIndex].title = editFilmtitle.value;
      films.value[filmIndex].session = editFilmDate.value;
    }
    closeEditModal();
  }
};

const openAddModal = () => {
  newFilmtitle.value = '';
  newFilmDate.value = '';
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
  newFilmtitle.value = '';
  newFilmDate.value = '';
};
</script>

<style scoped>
.films-table {
  display: flex;
  flex-direction: column;
}

.films-table__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.films-table__cell {
  min-width: 120px;
  background-color: #888888;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}

.films-table__del {
  min-width: 120px;
  background-color: #FF0000;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}
.films-table__add {
  min-width: 120px;
  background-color: #00ff00;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}
.films-table__edt {
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
