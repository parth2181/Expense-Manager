
let id = "no";

selectData();

function manageData() {
	document.getElementById('msg').innerHTML = "";
	let name = document.getElementById('name').value;
	let amount = document.getElementById('amount').value;

	if (name === '') {
		document.getElementById('msg').innerHTML = 'Please enter your name';
	} else if (amount === '') {
		document.getElementById('msg').innerHTML = 'Please enter the amount';
	} else {
		console.log(id);
		if (id === 'no') {
			let arr = getCrudData();
			if (arr === null) {
				let data = [{ name, amount }];
				setCrudData(data);
			} else {
				arr.push({ name, amount });
				setCrudData(arr);
			}
			document.getElementById('msg').innerHTML = 'Data Added';
		} else {
			let arr = getCrudData();
			arr[id].name = name;
			arr[id].amount = amount;
			setCrudData(arr);
			document.getElementById('msg').innerHTML = 'Data Updated';
		}
		document.getElementById('name').value = '';
		document.getElementById('amount').value = '';
		selectData();
	}
}
//show data

function selectData() {
	let arr = getCrudData();
	if (arr !== null) {
	  let html = '';
	  let sno = 1;
	  for (let k in arr) {
		html += `<tr><td>${sno}</td><td>${arr[k].name}</td><td>${arr[k].amount}</td><td><button class="btn btn-warning" onclick="editData(${k})">Edit</button>&nbsp;<button class="btn btn-danger" onclick="deleteData(${k})">Delete</button></td></tr>`;
		sno++;
	  }
	  document.getElementById('root').innerHTML = html;
	}
  }
  

function editData(rid) {
	id = rid;
	let arr = getCrudData();
	document.getElementById('name').value = arr[rid].name;
	document.getElementById('amount').value = arr[rid].amount;
}

function deleteData(rid) {
	let arr = getCrudData();
	arr.splice(rid, 1);
	setCrudData(arr);
	selectData();
}

function getCrudData() {
	let arr = JSON.parse(localStorage.getItem('crud'));
	return arr;
}

function setCrudData(arr) {
	localStorage.setItem('crud', JSON.stringify(arr));
}



// Get the input fields
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');

// Add event listeners to input fields
nameInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		amountInput.focus();
		event.preventDefault();
	}
});

amountInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		manageData();
		event.preventDefault();
	}
});