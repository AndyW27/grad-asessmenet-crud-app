const getTasksBtn = document.querySelector('#retrieve');
const addTaskBtn = document.querySelector('#task-button');
const task = document.querySelector('#task');
const ul = document.querySelector('#task-list');

let clicked = false;

// EVENT LISTENER FOR GET TASKS BUTTON
getTasksBtn.addEventListener('click', async function (e) {
	e.preventDefault();

	const res = await fetch('http://localhost:3333/api');
	const data = await res.json();

	let html = ``;

	data.tasks.forEach((task) => {
		html += `<li>${task.item}<button class="remove" id="${task._id}">X</button></li>`;
	});

	if (!clicked) {
		clicked = true;
		ul.insertAdjacentHTML('beforeend', html);
	}

	const xBtn = document.querySelectorAll('.remove');

	// EVENT LISTENERS FOR X BUTTONS
	for (let i = 0; i < xBtn.length; i++) {
		xBtn[i].addEventListener('click', function () {
			const id = xBtn[i].getAttribute('id');

			fetch(`http://localhost:3333/api/${id}`, {
				method: 'DELETE',
			}).then((res) => res.json());

			xBtn[i].parentElement.remove();
		});
	}
});

// EVENT LISTENER FOR ADD TASK BUTTON
addTaskBtn.addEventListener('click', function () {
	fetch('http://localhost:3333/api', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			item: task.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
});
