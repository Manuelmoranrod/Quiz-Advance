//api con 10 preguntas
//https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
//Pantalla principal en la que se empieza el juego
const starButton = document.getElementById('start')
//const questionContainerElement = document.getElementById('principal')
const question = document.querySelector('div.pregunta p')
const answer = document.getElementById('btnR')
const options = document.getElementsByClassName('btn')


let responseQuiz = {}

let round = 0
let score = 0

//Evento listener en pantalla home.html para iniciar juego
//starButton.addEventListener('click', startGame)
async function getQuestion() {
    let contentPreg = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple')
    let pregNew = await contentPreg.json()
    return pregNew
}

function startGame() {
    console.log('Empieza el juego')

    //Peticion API de las preguntas

    getQuestion()
        .then(pregNew => {
            console.log(pregNew);
            responseQuiz = pregNew
            drawNextQ()
            //pregNew.map()
        })
}
//Comprobacion de las respuestas cuando pulse next
function goNext() {
    validateAnswer()
    drawNextQ()
    //else{ redirecciona results html y guarda en base de datos}
}

function drawNextQ() {
    let apiQuestion = responseQuiz.results[round].question
    let apiAns = responseQuiz.results[round].correct_answer
    let apiOpt = responseQuiz.results[round].incorrect_answers
    question.innerHTML = apiQuestion
    //answer.innerHTML = apiAns
    
    /*for(let i=0; i<=options.lenght; i++){
        for (let i = 0; i < 11; i++) {
            postI += i;
            postJ += i;
            suma = postJ + postI;
            console.log(
            `En la Iteración Nº ${i}: la suma de postI y postJ es: ${suma}`
            );
        }
    };*/
    options[0].innerHTML = apiOpt[0]
    options[1].innerHTML = apiOpt[1]
    options[2].innerHTML = apiOpt[2]
    //falta pintarle el id para la validacion
    options[3].innerHTML = apiAns
    console.log(apiQuestion)
    console.log(apiAns);
    console.log(apiOpt);
    console.log(question);
    //console.log(answer);
    console.log(options);
    round++
    
}

function validateAnswer(){
    let select = document.getElementsByClassName('btn')
    console.log(select);
    if(select == "answer"){
        score++;
        answer.style.backgroundColor = "green"
        
    }else{
        options.style.backgroundColor = "red"
    }
    
}

    //guardar en la base de datos de firestore los resultados de las partida
    //y mostrar en una grafica

