let container = document.getElementById('container');

//class criar user
class User {
	constructor(name, dob, picture, location, cell, email, nat, gender) {
		this.name = name;
		this.dob = dob;
		this.picture = picture;
		this.location = location;
		this.cell = cell;
		this.email = email;
		this.nat = nat;
		this.gender = gender;
	}
}

let users = [];
showUsers(users);
//fetch
fetch('https://randomuser.me/api/?results=20')
	.then((res) => res.json())
	.then((data) => {
		users = data.results;
		showUsers(users);
		console.log(users);
	})
	.catch((container.textContent = 'ERRO..'));

//vars
let addBtn = document.querySelector('.addBtn');
let editingBtn = document.querySelector('.editingBtn');
let write = document.querySelector('.write'); //form
let inputs = write.querySelectorAll('input');
let writeDiv = write.querySelector('.writeDiv');

function showUsers(arrayUsers) {
	container.innerHTML = '';
	arrayUsers.map(
		({ name, dob, picture, location, cell, email, nat, gender }) => {
			container.innerHTML += `
            <article class="article">
                <ul>
                    <li>
                        <h2><span class="liNameF">${name.first}</span> <span class="liNameL">${name.last}</span>, <span class="liAge">${dob.age}</span></h2>
                    </li>
                    <li><img src="${picture.large}"></img></li>
                    <li class="liLocation"><span class="liCity">${location.city}</span>, <span class="liCountry">${location.country}</span></li>
                    <li class="liPhone">${cell}</li>
                    <li class="liEmail">${email}</li>
                    <li>Nacionalidade: <span class="liNat" style="text-transform:uppercase">${nat}</span></li>
                    <li class="liGender gender">${gender}</li>
                </ul>
                <img class="editIcon" src="edit.png"/>
                <img class="deleteIcon" src="close.png"/>
            </article>
        `;

			//change gender to letter
			let liGender = document.querySelectorAll('.liGender');
			liGender.forEach((element) => {
				if (element.innerHTML == 'female') {
					element.innerHTML = '<p class="genderF">F</p>';
				}
				if (element.innerHTML == 'male') {
					element.innerHTML = '<p class="genderM">M</p>';
				}
			});

			//delete
			let deleteIcon = document.querySelectorAll('.deleteIcon');
			deleteIcon.forEach((element) => {
				element.addEventListener('click', deleting, false);
			});
			function deleting(event) {
				console.log(event.target);
				if (
					addBtn.classList.contains('add') &&
					editingBtn.classList.contains('editor')
				) {
					event.target.parentElement.remove();
				}
			}

			//edit
			let checkIcon = document.getElementById('checkIcon');
			let editIcon = document.querySelectorAll('.editIcon');
			editIcon.forEach((element) => {
				element.addEventListener('click', editing, false);
			});
            function editing(event) {
                topFunction();
                if (addBtn.classList.contains('add')) {
					container.classList.add('editorC');
					for (const btns of editIcon) {
						btns.classList.add('hideBtn');
					}
					event.target.parentElement.classList.add('editing');
					addBtn.classList.add('hide');
					editingBtn.classList.add('show');
					editingBtn.classList.remove('editor');
					editingBtn.classList.add('cancel');
					editingBtn.classList.add('addBtnActive');
					write.classList.add('writeshow');
					plusIcon.classList.add('hide');
					checkIcon.classList.add('show');
					//value to inputs
					write[2].value =
						event.target.parentElement.querySelector(
							'.liNameF'
						).textContent;
					write[3].value =
						event.target.parentElement.querySelector(
							'.liNameL'
						).textContent;
					write[4].value =
						event.target.parentElement.querySelector(
							'.liAge'
						).textContent;
					write[6].value =
						event.target.parentElement.querySelector(
							'.liCity'
						).textContent;
					write[7].value =
						event.target.parentElement.querySelector(
							'.liCountry'
						).textContent;
					write[8].value =
						event.target.parentElement.querySelector(
							'.liPhone'
						).textContent;
					write[9].value =
						event.target.parentElement.querySelector(
							'.liEmail'
						).textContent;
					write[10].value =
						event.target.parentElement.querySelector(
							'.liNat'
						).textContent;
					//if female
					if (
						event.target.parentElement
							.querySelector('.liGender')
							.firstElementChild.classList.contains('genderF')
					) {
						inputs[0].checked = true;
						inputs[5].value = 'imagef.jpg';
						writeGenderF.classList.remove('unselected');
						writeGenderF.classList.add('selected');
						writeGenderM.classList.remove('selected');
						writeGenderM.classList.add('unselected');
					}
					//if male
					if (
						event.target.parentElement
							.querySelector('.liGender')
							.firstElementChild.classList.contains('genderM')
					) {
						inputs[1].checked = true;
						inputs[5].value = 'image.jpg';
						writeGenderM.classList.remove('unselected');
						writeGenderM.classList.add('selected');
						writeGenderF.classList.remove('selected');
						writeGenderF.classList.add('unselected');
					}
				}
                if (editingBtn.classList.contains('cancel')) {

                    //cancel edit
                    editingBtn.addEventListener('click', cancelEdit, false);
                    function cancelEdit() {
                        container.classList.remove('editorC');
						for (const btns of editIcon) {
							btns.classList.remove('hideBtn');
						}
                        document.querySelector('.editing').classList.remove('editing');
						editingBtn.classList.remove('show');
						editingBtn.classList.add('editor');
						editingBtn.classList.remove('cancel');
						editingBtn.classList.remove('addBtnActive');
						addBtn.classList.remove('hide');
						write.classList.remove('writeshow');
						plusIcon.classList.remove('hide');
						checkIcon.classList.remove('show');
                        resetAndClose();
                    }

                    //update user
					flag3 = false;
                    checkIcon.addEventListener('click', updateUser, false);
                    function updateUser() {
                        if (inputs[10].value.length < 2) {
							inputs[10].classList.add('error');
							window.setTimeout(function () {
								inputs[10].classList.remove('error');
							}, 1250);
						}
                        for (let i = 2; i < inputs.length - 1; i++) {
							if (inputs[i].value.length == 0) {
								inputs[i].classList.add('error');
								window.setTimeout(function () {
									inputs[i].classList.remove('error');
								}, 1250);
							}
							if (
								inputs[2].value.length > 0 &&
								inputs[3].value.length > 0 &&
								inputs[4].value.length > 0 &&
								inputs[5].value.length > 0 &&
								inputs[6].value.length > 0 &&
								inputs[7].value.length > 0 &&
								inputs[8].value.length > 0 &&
								inputs[9].value.length > 0 &&
								inputs[10].value.length == 2
							) {
								flag3 = true;
							}
						}
						//executar edit
						if (flag3 == true) {
                            //inputs to value
                            document.querySelector('.editing').querySelector('.liNameF').textContent = write[2].value;
                            document.querySelector('.editing').querySelector('.liNameL').textContent = write[3].value;
                            document.querySelector('.editing').querySelector('.liAge').textContent = write[4].value;
                            document.querySelector('.editing').querySelector('.liCity').textContent = write[6].value;
                            document.querySelector('.editing').querySelector('.liCountry').textContent = write[7].value;
                            document.querySelector('.editing').querySelector('.liPhone').textContent = write[8].value;
                            document.querySelector('.editing').querySelector('.liEmail').textContent = write[9].value;
                            document.querySelector('.editing').querySelector('.liNat').textContent = write[10].value;
                            if (writeGenderF.classList.contains('selected')) {
                                console.log('f');
								document.querySelector('.editing').querySelector('.liGender').innerHTML = '<p class="genderF">F</p>'
                            }
                        	if (writeGenderM.classList.contains('selected')) {
                                console.log('m');
								document.querySelector('.editing').querySelector('.liGender').innerHTML = '<p class="genderM">M</p>';
                            }
							cancelEdit();
                        }
                    }
                }
            }
		}
	);
}

//back to top
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//image message
inputs[5].addEventListener('click', message, false);
function message() {
	console.log('a imagem é carregada automaticamente');
}

function resetAndClose() {
	inputs.forEach((element) => {
		element.value = '';
	});
	inputs[5].value = 'image.jpg';
	inputs[0].checked = false;
	inputs[0].value = 'female';
	inputs[1].checked = false;
	inputs[1].value = 'male';
	writeGenderF.classList.remove('selected');
	writeGenderF.classList.add('unselected');
	writeGenderM.classList.remove('selected');
	writeGenderM.classList.add('unselected');
	container.classList.remove('temp');
}

//add btn
addBtn.addEventListener('click', startAdd, false);
function startAdd() {
	if (addBtn.classList.contains('add')) {
		//add btn
		addBtn.textContent = 'Cancelar';
		addBtn.classList.remove('add');
		addBtn.classList.add('cancel');
		addBtn.classList.add('addBtnActive');
		write.classList.add('writeshow');
		container.classList.add('temp');
	} else if (addBtn.classList.contains('cancel')) {
		//cancel btn
		addBtn.textContent = 'Adicionar utilizador';
		addBtn.classList.remove('cancel');
		addBtn.classList.add('add');
		addBtn.classList.remove('addBtnActive');
		write.classList.remove('writeshow');
		resetAndClose();
	}
}

//toggle between genders (on add)
let writeGenderF = writeDiv.querySelector('.writeGenderF');
let writeGenderM = writeDiv.querySelector('.writeGenderM');
writeDiv.addEventListener('click', toggleAdd, false);
function toggleAdd(event) {
	if (event.target.classList.contains('writeGenderF')) {
		writeGenderF.classList.remove('unselected');
		writeGenderF.classList.add('selected');
		inputs[5].value = 'imagef.jpg';
		writeGenderM.classList.remove('selected');
		writeGenderM.classList.add('unselected');
	}
	if (event.target.classList.contains('writeGenderM')) {
		writeGenderM.classList.remove('unselected');
		writeGenderM.classList.add('selected');
		inputs[5].value = 'image.jpg';
		writeGenderF.classList.remove('selected');
		writeGenderF.classList.add('unselected');
	}
}

//plus btn (on add)
let plusIcon = document.getElementById('plusIcon');
plusIcon.addEventListener('click', createUser, false);
inputs[5].readOnly = true; //image input
function createUser() {
	let flag1 = false;
	let flag2 = false;

	//erro icons (flag1)
	if (
		writeGenderF.classList.contains('unselected') &&
		writeGenderM.classList.contains('unselected')
	) {
		writeGenderF.classList.add('error');
		writeGenderM.classList.add('error');
		setTimeout(function () {
			writeGenderF.classList.remove('error');
			writeGenderM.classList.remove('error');
		}, 1500);
	} else {
		flag1 = true;
	}

	//erro inputs (flag2)
	if (inputs[10].value.length < 2) {
		inputs[10].classList.add('error');
		window.setTimeout(function () {
			inputs[10].classList.remove('error');
		}, 1250);
	}
	for (let i = 2; i < inputs.length - 1; i++) {
		if (inputs[i].value.length == 0) {
			inputs[i].classList.add('error');
			window.setTimeout(function () {
				inputs[i].classList.remove('error');
			}, 1250);
		}
		if (
			inputs[2].value.length > 0 &&
			inputs[3].value.length > 0 &&
			inputs[4].value.length > 0 &&
			inputs[5].value.length > 0 &&
			inputs[6].value.length > 0 &&
			inputs[7].value.length > 0 &&
			inputs[8].value.length > 0 &&
			inputs[9].value.length > 0 &&
			inputs[10].value.length == 2
		) {
			flag2 = true;
		}
	}

	//executar
	console.log(flag1, flag2);
	if (flag1 == true && flag2 == true) {
		if (inputs[0].checked == true) {
			let newUser = new User(
				{ first: inputs[2].value, last: inputs[3].value },
				{ age: inputs[4].value },
				{ large: inputs[5].value },
				{ city: inputs[6].value, country: inputs[7].value },
				inputs[8].value,
				inputs[9].value,
				inputs[10].value,
				inputs[0].value
			);
			users.unshift(newUser);
			showUsers(users);
		} else if (inputs[1].checked == true) {
			let newUser = new User(
				{ first: inputs[2].value, last: inputs[3].value },
				{ age: inputs[4].value },
				{ large: inputs[5].value },
				{ city: inputs[6].value, country: inputs[7].value },
				inputs[8].value,
				inputs[9].value,
				inputs[10].value,
				inputs[1].value
			);
			users.unshift(newUser);
			showUsers(users);
		}
		resetAndClose();
		addBtn.textContent = 'Adicionar utilizador';
		addBtn.classList.remove('cancel');
		addBtn.classList.add('add');
		addBtn.classList.remove('addBtnActive');
		write.classList.remove('writeshow');
	}
}


//filter
let filtroGenero = document.getElementById('filtro-genero');
filtroGenero.addEventListener('change', filterBy, false);

let filterFemale = document.getElementById('filterFemale');
let filterF = document.querySelector(".filterF");
let filterMale = document.getElementById('filterMale');
let filterM = document.querySelector(".filterM");
//////////filter select options
let select = document.querySelector('.select');
select.addEventListener('change', filter, false)
function filter(event) {
	if (event.target.selectedIndex == 0) {
		filtroGenero.classList.add('hide');
		select.classList.remove('gender');
		showUsers(users);
		filterReset();
	}
	if (event.target.selectedIndex == 1) {
		filtroGenero.classList.remove('hide');
		select.classList.remove('gender');
		select.classList.add('ageA');
		select.classList.remove('ageD');
		showUsers(users);
		filterFemale.type = 'checkbox';
		filterMale.type = 'checkbox';
		filterReset();
		ascend();
	}
	if (event.target.selectedIndex == 2) {
		filtroGenero.classList.remove('hide');
		select.classList.remove('gender');
		select.classList.remove('ageA');
		select.classList.add('ageD');
		showUsers(users);
		filterFemale.type = 'checkbox';
		filterMale.type = 'checkbox';
		filterReset();
		descend();
	}
	if (event.target.selectedIndex == 3) {
		filtroGenero.classList.remove('hide');
		select.classList.add('gender');
		select.classList.remove('ageA');
		select.classList.remove('ageD');
    	showUsers(users);
		filterFemale.type = 'radio';
		filterMale.type = 'radio';
		filterReset();
	}
}
function filterBy(event) {
	if(select.classList.contains('gender')) {
		if(event.target == filterFemale) {
			filterFemales();
		}
		if(event.target == filterMale) {
			filterMales();
		}
	}
	if(select.classList.contains('ageA')) {
		if(filterFemale.checked == true & filterMale.checked == false) {
			filterFemales();
		}
		if(filterFemale.checked == false & filterMale.checked == true) {
			filterMales();
		}
		if(filterFemale.checked == true & filterMale.checked == true) {
			showUsers(users);
		}
		if(filterFemale.checked == false & filterMale.checked == false) {
			showUsers(users);
		}
	}
	if(select.classList.contains('ageD')) {
		if(filterFemale.checked == true & filterMale.checked == false) {
			filterFemales();
		}
		if(filterFemale.checked == false & filterMale.checked == true) {
			filterMales();
		}
		if(filterFemale.checked == true & filterMale.checked == true) {
			showUsers(users);
		}
		if(filterFemale.checked == false & filterMale.checked == false) {
			showUsers(users);
		}
	}
}
function filterFemales() {
    let females = users.filter(user => user.gender == 'female');
    showUsers(females);
}
function filterMales() {
    let males = users.filter(user => user.gender == 'male');
    showUsers(males);
}

//filter age
function ascend() {
	users.sort(function (a, b) {
		return a.dob.age - b.dob.age;
	});
	showUsers(users);
}
function descend() {
	users.sort(function (b, a) {
		return a.dob.age - b.dob.age;
	});
	showUsers(users);
}

//filter reset
function filterReset() {
	filterFemale.checked = false;
	filterMale.checked = false;
}