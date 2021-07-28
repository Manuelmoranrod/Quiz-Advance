//api con 10 preguntas
//https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
//Pantalla principal en la que se empieza el juego
const startButton = document.getElementById('start')
const question = document.querySelector('div.pregunta p')
const answer = document.getElementById('btnR')
const options = document.getElementsByClassName('btn-answer')
console.log(options);
/*
var firebaseConfig = {
    apiKey: "AIzaSyBECQR6LkUj7TItogQ3zyvbyx2wKc9DhXc",
    authDomain: "prueba-firebase-fe68f.firebaseapp.com",
    projectId: "prueba-firebase-fe68f",
    storageBucket: "prueba-firebase-fe68f.appspot.com",
    messagingSenderId: "751779822238",
    appId: "1:751779822238:web:b6b643a927d69afa07198f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/
//const db = firebase.firestore();

let responseQuiz = {}
let round = 0
let score = 0

startButton.addEventListener("click", startGame())


function startGame() {
    console.log('Empieza el juego')
    //Peticion API de las preguntas
    getQuestion()
    .then(pregNew => {
        console.log(pregNew);
        this.responseQuiz = pregNew
        drawNextQ()
    })
}
//Evento listener en pantalla home.html para iniciar juego
async function getQuestion() {
    let contentPreg = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple')
    let pregNew = await contentPreg.json()
    return pregNew
}
//Comprobacion respuestas y pinta pregunta cuando pulse next
function goNext() {
    //volver a pintar class btn orange
    disableClick(false);
    for(let opt of options){
        opt.style.backgroundColor = "orange"
    }
    if (round != 10) {
        drawNextQ()
    } else { //guardar en base datos los resultados
        window.location.href = "results.html";
    }
}

function drawNextQ() {
    let apiQuestion = this.responseQuiz.results[round].question
    let correctAnswer = this.responseQuiz.results[round].correct_answer
    let incorrectAnswers = this.responseQuiz.results[round].incorrect_answers//array
    const random_number = Math.floor(Math.random() * 4); //2
    question.innerHTML = apiQuestion// Pinta pregunta

    let total_answers = [];
    let positionIncorrectAnsw = 0;
    //pintar el array de posibles respuestas
    for (let i = 0; i < 4; i++) {
        if (random_number === i) {
            total_answers[i] = correctAnswer;
        } else {
            total_answers[i] = incorrectAnswers[positionIncorrectAnsw];
            positionIncorrectAnsw++;
        }
    }
    total_answers.forEach((element, index) => options[index].innerHTML = element);
}
//Validar preguntas
function validateAnswer(e) {
    //console.log(this.responseQuiz.results[round]);
    //console.log(e.innerHTML);
    if (e.innerHTML == this.responseQuiz.results[round].correct_answer) {
        score++;
        e.style.backgroundColor = "green"
    } else {
        e.style.backgroundColor = "red"
    }
    round++
    disableClick(true);
}
//Deshabilita el clic de los botones
function disableClick(disable){
    for(let opt of options){
        opt.disabled = disable
    }
}


//******************* FIREBASE ************************


