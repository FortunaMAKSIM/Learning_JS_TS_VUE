<template>
    <div class="tickets-table__add">
        <button @click="openAddModal( )">Добавить</button>
    </div>
    
    <div class="tickets-table">
        <div class="tickets-table__row">
        <div class="tickets-table__cell">id</div>
        <div class="tickets-table__cell">Имя</div>
        <div class="tickets-table__cell">Почта</div>
        <div class="tickets-table__cell">Дата создания</div>
        <div class="tickets-table__cell">Название фильма</div>
        <div class="tickets-table__cell">Дата сеанса</div>
        </div>
        <div v-for="ticket in tickets" :key="ticket.id" class="tickets-table__row">
        <div class="tickets-table__cell">{{ ticket.id }}</div>
        <div class="tickets-table__cell">{{ ticket.user.name }}</div>
        <div class="tickets-table__cell">{{ ticket.user.email }}</div>
        <div class="tickets-table__cell">{{ ticket.user.created }}</div>
        <div class="tickets-table__cell">{{ ticket.film.title }}</div>
        <div class="tickets-table__cell">{{ ticket.film.session }}</div>
        <div class="tickets-table__del"><button @click="deleteTicket(ticket.id)">Удалить</button></div>
        <div class="tickets-table__edt"><button @click="openEditModal(ticket)">Изменить</button></div>
        </div>
    </div>
    
    
    <div v-if="isEditModalOpen" class="modal">
        <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Редактировать Билет</h2>
        <select v-model="editTicketOwnerName">
            <option disabledvalue="">Выберите владельца</option>
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
        </select>
        <input v-model="editTicketOwnerEmail" placeholder="Почта владельца" />
        <input v-model="editTicketOwnerDate" placeholder="Дата регистрации владельца" />
        <select v-model="editTicketFilmName">
            <option disabledvalue="">Выберите фильм</option>
            <option v-for="film in films" :key="film.id" :value="film.title">{{ film.title }}</option>
        </select>
        <input v-model="editTicketFilmDate" placeholder="Дата сеанса" />
        <button @click="saveTicket ()">Сохранить</button>
        </div>
    </div>
    
    
    <div v-if="isAddModalOpen" class="modal">
        <div class="modal-content">
        <span class="close" @click="closeAddModal">&times;</span>
        <h2>Добавить Билет</h2>
        <select v-model="addTicketOwnerName">
            <option disabledvalue="">Выберите владельца</option>
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
        </select>
        <input v-model="addTicketOwnerEmail" placeholder="Почта владельца" />
        <input v-model="addTicketOwnerDate" placeholder="Дата регистрации владельца" />
        <select v-model="addTicketFilmName">
            <option disabledvalue="">Выберите фильм</option>
            <option v-for="film in films" :key="film.id" :value="film.title">{{ film.title }}</option>
        </select>
        <input v-model="addTicketFilmDate" placeholder="Дата сеанса" />
        <button @click="addTicket ()">Добавить</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store.ts';

const { films, users } = useStore();
const tickets = ref<TicketType[]>([]);

type TicketType = {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
        created: string;
    };
    film: {
        title: string;
        session: string;
    };
};

const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const editTicketOwnerName = ref('');
const editTicketOwnerEmail = ref('');
const editTicketOwnerDate = ref('');
const editTicketFilmName = ref('');
const editTicketFilmDate = ref('');
const addTicketOwnerName = ref('');
const addTicketOwnerEmail = ref('');
const addTicketOwnerDate = ref('');
const addTicketFilmName = ref('');
const addTicketFilmDate = ref('');
const currentTicketId = ref<number | null>(null);

const openAddModal = () => {
    addTicketOwnerName.value = '';
    addTicketOwnerEmail.value = '';
    addTicketOwnerDate.value = '';
    addTicketFilmName.value = '';
    addTicketFilmDate.value = '';
    isAddModalOpen.value = true;
};

const closeAddModal = () => {
    isAddModalOpen.value = false;
};

const addTicket = () => {
    const selectedFilm = films.value.find(film => film.title === addTicketFilmName.value);
    const selectedUser = users.value.find(user => user.name === addTicketOwnerName.value);
    
    if (selectedFilm && selectedUser ) {
        const newTicket : TicketType = {
            id: tickets.value.length,
            user: {
                id: users.value.length,
                name: selectedUser.name,
                email: selectedUser.email,
                created: selectedUser.created
            },
            film: {
                title: selectedFilm.title,
                session: selectedFilm.session
            }
        };
        tickets.value.push(newTicket);
        closeEditModal();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
};

const deleteTicket = (ticketId : number) => {
    tickets.value = tickets.value.filter(ticket => ticket.id !== ticketId);
};

const openEditModal = (ticket : TicketType) => {
    editTicketOwnerName.value = ticket.user.name;
    editTicketOwnerEmail.value = ticket.user.email;
    editTicketOwnerDate.value = ticket.user.created;
    editTicketFilmName.value = ticket.film.title;
    editTicketFilmDate.value = ticket.film.session;
    currentTicketId.value = ticket.id;
    isEditModalOpen.value = true;
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
};

const saveTicket = () => {
    if (currentTicketId.value !== null) {
        const ticketToUpdate = tickets.value.find(ticket => ticket.id === currentTicketId.value);
        if (ticketToUpdate) {
            ticketToUpdate.user.name = editTicketOwnerName.value;
            ticketToUpdate.user.email = editTicketOwnerEmail.value;
            ticketToUpdate.user.created = editTicketOwnerDate.value;
            ticketToUpdate.film.title = editTicketFilmName.value;
            ticketToUpdate.film.session = editTicketFilmDate.value;
        }
        closeEditModal();
    }
};
</script>

<style scoped>
.tickets-table {
  display: flex;
  flex-direction: column;
}

.tickets-table__row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.tickets-table__cell {
  min-width: 120px;
  background-color: #888888;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}

.tickets-table__del {
  min-width: 120px;
  background-color: #FF0000;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}
.tickets-table__add {
  min-width: 120px;
  background-color: #00ff00;
  border: 1px solid cornsilk;
  text-align: center;
  padding: 4px;
}
.tickets-table__edt {
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
