import { createSelector } from '@reduxjs/toolkit';
import { statusFilters } from './constants';
// Процесс оптимизации селекторов называется мемоизация -
// сохранение результатов выполнения функции для предотвращения повторных вычислений.

// Для мемоизации селектора используется функция createSelector,
// которая принимает массив селекторов, значения которых необходимы для последующих вычислений и
// функцию преобразователь, в которой будут выполняться все вычисления.

export const selectTasks = state => state.tasks.items;

export const selectIsLoading = state => state.tasks.isLoading;

export const selectError = state => state.tasks.error;

export const selectStatusFilter = state => state.filters.status;

// БЫЛО
// export const selectVisibleTasks = state => {
//   // Используем другие селекторы
//   const tasks = selectTasks(state);
//   const statusFilter = selectStatusFilter(state);
//   switch (statusFilter) {
//     case statusFilters.active:
//       return tasks.filter(task => !task.completed);
//     case statusFilters.completed:
//       return tasks.filter(task => task.completed);
//     default:
//       return tasks;
//   }
// };

// СТАЛО

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    console.log('Calculating visible tasks. Now memoized!');
    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter(task => !task.completed);
      case statusFilters.completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);

// БЫЛО
// export const selectTaskCount = state => {
//   const tasks = selectTasks(state);
//   console.log('Calculating task count');

//   return tasks.reduce(
//     (acc, task) => {
//       if (task.completed) {
//         acc.completed += 1;
//       } else {
//         acc.active += 1;
//       }
//       return acc;
//     },
//     { active: 0, completed: 0 }
//   );
// };

// СТАЛО
export const selectTaskCount = createSelector([selectTasks], tasks => {
  console.log('Calculating task count. Now memoized!');
  return tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );
});
