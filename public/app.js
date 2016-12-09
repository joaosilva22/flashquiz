let correct = null;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(arr, exclude) {
    let value = null;
    do {
	let rand = getRandomInt(0, arr.length);
	value = arr[rand];
    } while (exclude.includes(value));
    return value;
}

function resetClasses() {
    let buttons = [...document.getElementById('answers').getElementsByTagName('button')];
    buttons.forEach((button) => {
	button.className = 'card card-interactive';
	button.disabled = false;
    });

    let next = document.getElementById('next').children[0];
    next.className = 'muted';
}

function getRandomQuestion() {
    resetClasses();
    fetch('http://localhost:8000/api/question', { method: 'GET' }).then((res) => {
	res.json().then((data) => {
	    document.getElementById('question').innerHTML = data.question;
	    correct = data.correct;

	    let answers = data.wrong;
	    answers.push(data.correct);

	    let buttons = [...document.getElementById('answers').getElementsByTagName('button')];
	    let exclude = [];
	    buttons.forEach((button) => {
		let value = getRandomValue(answers, exclude);
		button.innerHTML = value;
		exclude.push(value);
	    });
	});
    });
}

function showAnswer(selected) {
    let buttons = [...document.getElementById('answers').getElementsByTagName('button')];
    buttons.forEach((button) => {
	if (button.innerHTML === correct) {
	    button.className = 'correct';
	} else {
	    button.className = 'muted';
	}
	button.disabled = true;
    });

    if (selected.className !== 'correct') {
	selected.className = 'wrong muted';
    }

    let next = document.getElementById('next').children[0];
    next.className = 'strong';
}
