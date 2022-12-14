// Импортируем хук
import { useDispatch } from 'react-redux';
// Импортируем генератор экшена
import { addTask } from 'redux/actions';

import { toast } from 'react-hot-toast';

import { Button } from 'components/Button/Button';
import css from './TaskForm.module.css';

export const TaskForm = () => {
  // Получаем ссылку на функцию отправки экшенов
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    // Вызываем генератор экшена и передаем текст задачи для поля payload
    // Отправляем результат - экшен создания задачи
    if (!form.elements.text.value) {
      toast.error('Enter task text', { duration: 2000, icon: '📝' });
      return;
    }
    dispatch(addTask(form.elements.text.value));
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.field}
        type="text"
        name="text"
        placeholder="Enter task text..."
      />
      <Button type="submit">Add task</Button>
    </form>
  );
};
