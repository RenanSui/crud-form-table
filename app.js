// SELECT ELEMENTS
const table = document.querySelector('.table');
const myForm = document.querySelector('.myForm');
const btnSubmit = document.querySelector('.btnSubmit');

// URL
const API_URL = 'http://localhost:3000/posts';

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => getFetch());
myForm.addEventListener('submit', (e) => handleSubmit(e));

// FETCH API
const getFetch = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();
	renderTables(data);
};

// RENDER
function renderTables(tables) {
	const newTables = tables
		.map((table) => {
			return `<tr>
                    <td>${table.date}</td>
                    <td>${table.name}</td>
                    <td>${table.country}</td>
                    <td>${table.age}</td>
                </tr>`;
		})
		.join('');
	table.innerHTML += newTables;
}

// FUNCTION TO GET DATE
function getDateNow() {
	let date = new Date();
	const [year, month, day] = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	];
	const [hour, minutes] = [date.getHours(), date.getMinutes()];
	date = `${year}-${month}-${day} ${hour}:${minutes}`;
	return date;
}

// SUBMIT FORM
const handleSubmit = (e) => {
	e.preventDefault();
	const date = getDateNow();
	const name = document.querySelector('#form-name').value;
	const country = document.querySelector('#form-country').value;
	const age = document.querySelector('#form-age').value;
	const body = { date, name, country, age };
	postFetch(body)
};

// POST REQUEST
const postFetch = async (form) => {
	const settings = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(form)
	};
	fetch(API_URL, settings)
	console.log('new post added');
};
