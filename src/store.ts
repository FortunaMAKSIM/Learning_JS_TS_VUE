import { ref } from 'vue';

// Типы данных
export type UserType = {
  id: number;
  name: string;
  email: string;
  created: string;
};

export type FilmType = {
  id: number;
  title: string;
  session: string;
};

const users = ref<UserType[]>([
    { id: 0, name: 'Ann', email: 'alex@alex.alex', created: new Date().toLocaleDateString() },
    { id: 1, name: 'Alex', email: 'ann@ann.ann', created: new Date().toLocaleDateString() },
    { id: 2, name: 'Art', email: 'art@art.art', created: new Date().toLocaleDateString() },
    { id: 3, name: 'You', email: 'you@you.you', created: new Date().toLocaleDateString() },
  ]);
  
  const films = ref<FilmType[]>([
    { id: 0, title: 'Оно', session: new Date().toLocaleDateString() },
    { id: 1, title: 'Зелёный слоник', session: new Date().toLocaleDateString() },
    { id: 2, title: 'Горбатая гора', session: new Date().toLocaleDateString() },
  ]);

  export const useStore = () => ({
    users,
    films,
  });