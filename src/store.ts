import { ref, computed } from 'vue';

// Типы данных
export type UserType = {
  id: number;
  name: string;
  email: string;
  created: string | Date;
};

export type FilmType = {
  id: number;
  title: string;
  session: string;
};

const users = ref<UserType[]>([
    { id: 1, name: 'Ann', email: 'alex@alex.alex', created: new Date().toLocaleDateString() },
    { id: 2, name: 'Alex', email: 'ann@ann.ann', created: new Date().toLocaleDateString() },
    { id: 3, name: 'Art', email: 'art@art.art', created: new Date().toLocaleDateString() },
    { id: 4, name: 'You', email: 'you@you.you', created: new Date().toLocaleDateString() },
  ]);
  
  const films = ref<FilmType[]>([
    { id: 1, title: 'Оно', session: '10.10.2010' },
    { id: 2, title: 'Зелёный слоник', session: '11.11.2011' },
    { id: 3, title: 'Горбатая гора', session: '12.12.2012' },
  ]);

  export const useStore = () => ({
    users,
    films,
  });