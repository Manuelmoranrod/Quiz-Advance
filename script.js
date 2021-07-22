//api con 10 preguntas
//https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
//Pantalla principal en la que se empieza el juego
const starButton = document.getElementById('start')
const questionContainerElement = document.getElementById('principal')


//Evento listener en pantalla home.html para iniciar juego
//starButton.addEventListener('click', startGame)

function startGame() {
    console.log('Empieza el juego')
    let score = 0
    let round = 0
    const goNext = document.getElementById('next')
    
    //Peticion API de las preguntas
    
    async function getQuestion() {
        let contentPreg = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple')
        let pregNew = await contentPreg.json()
        return pregNew   
    }
    getQuestion()
    .then(pregNew => {
        let apiQuestion = pregNew.results[0].question
        //console.log(apiQuestion)
        //const containerPreg = document.getElementsByClassName('pregunta')
        

        containerPreg.innerHTML = apiQuestion
        //pregNew.map()
    })

    //Comprobacion de las respuestas cuando pulse next

    goNext.addEventListener('click', selectAnswer)

    function selectAnswer() {
        if(question.value == true) {
            score++
            //pintar de verde la casilla
        }
        else{
            //pintar de rojo la casilla
        }
        //add on de round for paint the next question 
        round++
        //remove ant question 
        document.body.removeChild('pregunta')
        document.body.appendChild('pregunta')
        if(round === 10){
            removeChild(question)
            window.location.assign(results.html)
        }
        
    }

    //guardar en la base de datos de firestore los resultados de las partida
    //y mostrar en una grafica

}