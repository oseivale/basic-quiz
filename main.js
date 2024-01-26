const newQuestion = document.getElementById('question')
const confirmBtn = document.getElementById('confirm-btn')
const showResultsBtn = document.getElementById('results-btn')
const resultsText = document.getElementById('results-text')
const wrapper = document.getElementById('wrapper')
const resultsSection = document.getElementById('results')
const aBtn = document.getElementById('option-a')
const bBtn = document.getElementById('option-b')
const inputA = document.getElementById('input-a')
const inputB = document.getElementById('input-b')

const container = document.getElementById('container')

var data = [
    {
        question: '1. Your perfect Friday night is:',
        answerA: 'a. Going out to a nice restaurant with friends to see a liveband',
        answerB: 'b. Quiet night in with popcorn and a movie'
    },
    {
        question: '2. After a long day at work, do you:',
        answerA: 'a. Need to talk to someone about your day',
        answerB: 'b. Need space and quiet time '
    },
    {
        question: '3. Do you like:',
        answerA: 'a. Trips with a group of friends',
        answerB: 'b. Solo trips'
    },
    {
        question: '4. When you plan a vacation, you:',
        answerA: 'a. prefer lots of social and adventurous activities',
        answerB: 'b. prefer lots of relaxation and alone time'
    }
]

const initialState = (function () {
    let initialIndex = 0;
    let aResponses = 0;
    let bResponses = 0;
    let lastQuestion = false;
    let results;
    resultsSection.style.display = 'none'

    function displayResults() {
        if (initialState.getAValue() > 2) {
            results = "EXTROVERT"
        } else if (initialState.getAValue() === 2) {
            results = 'AMBIVERT'
        } else {
            results = "INTROVERT"
        }

        return results;
    }


    return {
        displayResults,
        incrementIndex: () => initialIndex++,
        setLastQuestion: () => lastQuestion = true,
        unsetLastQuestion: () => lastQuestion = false,
        getLastQuestion: () => lastQuestion,
        getIndex: () => initialIndex,
        resetIndex: () => initialIndex = 0,
        getAValue: () => aResponses,
        getBValue: () => bResponses,
        incrementA: () => aResponses++,
        incrementB: () => bResponses++,
    }
})()

newQuestion.innerText = data[initialState.getIndex()].question
aBtn.innerText = data[initialState.getIndex()].answerA
bBtn.innerText = data[initialState.getIndex()].answerB
initialState.unsetLastQuestion()

function createQuestions() {
    wrapper.classList.add('fade')

    setTimeout(() => {
        wrapper.classList.remove('fade')
    }, 1000);

    initialState.incrementIndex()
    if (data[initialState.getIndex()] === undefined) {
        initialState.resetIndex();
        resultsSection.style.display = 'block'
        resultsText.innerText = initialState.displayResults()
        wrapper.style.display = "none"
    }

    newQuestion.innerText = data[initialState.getIndex()]?.question
    aBtn.innerText = data[initialState.getIndex()]?.answerA
    bBtn.innerText = data[initialState.getIndex()]?.answerB

    if (inputA.checked) {
        initialState.incrementA()
    } else if (inputB.checked) {
        initialState.incrementB()
    }

    inputA.checked = false
    inputB.checked = false

    console.log('As', initialState.getAValue())
    console.log('Bs', initialState.getBValue())
}

confirmBtn.addEventListener('click', createQuestions)

