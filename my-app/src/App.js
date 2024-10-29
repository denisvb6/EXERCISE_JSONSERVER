import { useEffect, useState } from 'react';
import './App.css';
import './icon-search.svg';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [dataSearch, setDataSearch] = useState('');
	const [dataSort, setDataSort] = useState(todos);

	useEffect(() => {
		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, [refreshTodos]);

	//Добавить дело
	const requestAddWork = () => {
		setIsCreating(true);

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: '6',
				title: 'illo est ratione doloremque quia maiores aut',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Добавлено дело, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsCreating(false));
	};

	// Заменить дело
	const requestUpdateWork = () => {
		setIsUpdating(true);

		fetch('http://localhost:3003/todos/3', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: 3,
				title: 'repellendus sunt dolores architecto voluptatum',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Заменить дело, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsUpdating(false));
	};

	// Удалить дело
	const requestDeleteWork = () => {
		setIsDeleting(true);

		fetch('http://localhost:3003/todos/2', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено, ответ сервера:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsDeleting(false));
	};

	//Фильтрация дел
	const filteredTodos = todos.filter((obj, index, array) => {
		return obj.title.includes(dataSearch);
	});

	//Сортировка дел
	const funSort = () => {
		const dataSort = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setDataSort(dataSort);
	};

	return (
		<div className="App">
			<h2>Список дел:</h2>
			{todos.map(({ id, title }) => (
				<div key={id}>
					{id} - {title}
				</div>
			))}

			<button className="btn" disabled={isCreating} onClick={requestAddWork}>
				Добавить дело
			</button>
			<button className="btn" disabled={isUpdating} onClick={requestUpdateWork}>
				Заменить дело
			</button>
			<button className="btn" disabled={isDeleting} onClick={requestDeleteWork}>
				Удалить дело
			</button>

			<div className='line'></div>

			<div>
				<button className="btn" onClick={funSort}>
					Сортировка
				</button>
			</div>
			<div>
				<h3>Отсортировано:</h3>
				{dataSort.map(({ id, title }) => (
					<div key={id}>
						{id} - {title}
					</div>
				))}
			</div>

			<div className='line'></div>

			<div>
				<input
					className="inputSearch"
					onChange={(event) => setDataSearch(event.target.value)}
				/>
			</div>
			<div>
				<h3>Найдено:</h3>
				{filteredTodos.map(({ id, title }) => (
					<div key={id}>
						{id} - {title}
					</div>
				))}
			</div>
		</div>
	);
};
