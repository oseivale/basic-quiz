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
const extrovert = document.getElementById('extrovert')
const introvert = document.getElementById('introvert')
const ambivert = document.getElementById('ambivert')
const introvertPercentage = document.getElementById('introvert-percentage')
const extrovertPercentage = document.getElementById('extrovert-percentage')

const breakdown = document.getElementById('breakdown')
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
    },
    {
        question: '5. You prefer:',
        answerA: 'a. to have a large (20+ people) group of friends',
        answerB: 'b. to have a small (less than 4 people) circle of people in your life'
    },
    {
        question: '6. You are someone who:',
        answerA: 'a. typically stays at home',
        answerB: 'b. loves to go out all the time'
    },
    {
        question: '7. When you eat out, you:',
        answerA: 'a. are okay to sit and eat alone',
        answerB: 'b. need to go with someone else'
    },
    {
        question: '8. In conflict, you:',
        answerA: 'a. Observe the situation first, think about it, and wait before you speak',
        answerB: 'b. react immediately, and need to speak right away'
    }
]

const initialState = (function () {
    let initialIndex = 0;
    let aResponses = 0;
    let bResponses = 0;
    let lastQuestion = false;
    let results;
    resultsSection.style.display = 'none'
    breakdown.style.display = 'none'

    function displayResults() {
        if (initialState.getAValue() > data.length / 2) {
            results = "EXTROVERT"
        } else if (initialState.getAValue() === data.length / 2) {
            results = 'AMBIVERT'
        } else if (initialState.getAValue() < data.length / 2 && initialState.getAValue() > 0) {
            results = "INTROVERT"
        } else if (initialState.getAValue() === 0 && initialState.getBValue() === 0) {
            results = "Oops! Not enough info. Please try again."
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

function calculateResults() {
    const introvertResults = initialState.getBValue() / data.length * 100
    const extrovertResults = initialState.getAValue() / data.length * 100

    extrovert.style.maxWidth = `${extrovertResults}%`
    introvert.style.maxWidth = `${introvertResults}%`

    introvertPercentage.innerText = `Introvert: ${introvertResults}%`

    extrovertPercentage.innerText = `Extrovert: ${extrovertResults}%`

    console.log('extrovertResults', extrovertResults)
}

function createQuestions() {
    wrapper.classList.add('fade')
    breakdown.classList.add('fade')
    introvert.classList.add('results')
    extrovert.classList.add('results')

    setTimeout(() => {
        wrapper.classList.remove('fade')
    }, 1000);

    initialState.incrementIndex()
    if (data[initialState.getIndex()] === undefined) {
        initialState.resetIndex();
        resultsSection.style.display = 'block'
        breakdown.style.display = 'block'
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

    calculateResults()

    console.log('As', initialState.getAValue())
    console.log('Bs', initialState.getBValue())
}

confirmBtn.addEventListener('click', createQuestions)

