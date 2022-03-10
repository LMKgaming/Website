var flag = document.querySelector(".flag img")
var answers = document.querySelectorAll(".answer div")
var score = document.querySelector(".score")
var windowGame = document.querySelector(".window-game")
var loseScreen = document.querySelector(".lose")
var gameList = document.querySelector(".game-list")
var gameChoose = document.querySelector(".game-choose")
var gameItem = document.querySelector(".game-item")
var againBtn = document.querySelector(".again")
var backBtn = document.querySelector(".back")
var highestScore = document.querySelectorAll(".highest-score")
var lastedScore = document.querySelector(".lasted-score")

const keyABCD = ["A","B","C","D"]
const KEY_SECRET = "GAME"

var config = JSON.parse(localStorage.getItem(KEY_SECRET)) || {}

function setConfig(key, value) {
    config[key] = value
    localStorage.setItem(KEY_SECRET, JSON.stringify(config))
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function getCountry() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = keyABCD[i]
    }
    let apiURL = `https://restcountries.com/v3.1/all`
    let data = await fetch(apiURL).then(res=>res.json())
    // console.log(data)
    let randomNum = getRandomInt(data.length)
    flag.src = data[randomNum].flags.png
    // console.log(answers)
    let resultPlace =getRandomInt(4)
    for (let i = 0; i < answers.length; i++) {
        console.log(answers[i])
        if (i == resultPlace) {
            answers[i].innerText = answers[i].innerText +". "+ data[randomNum].name.common
        } else {
            answers[i].innerText = answers[i].innerText +". "+ data[getRandomInt(data.length)].name.common    
        }
    }
    console.log(resultPlace)
    win(randomNum,data)
}

function win(randomNum,data) {
    var answer = document.querySelector(".answer")
    answer.onclick = function(e) {
        let node = e.target.closest("div")
        console.log([node])
        if (node.innerText.replace("A. ","").replace("B. ","").replace("C. ","").replace("D. ","") == data[randomNum].name.common) {
            node.classList.add("waiting")
            setTimeout(() => {
                node.classList.remove("waiting")
                node.classList.add("true")
                score.innerText = Number(score.innerText) + 1
            }, 1000);
            setTimeout(()=>{
                for (let i = 0; i < answers.length; i++) {
                    answers[i].innerText = keyABCD[i]
                }
                getCountry()
                node.classList.remove("true")
            },2000)
            
        }
        else {
            node.classList.add("waiting")
            setTimeout(() => {
                node.classList.remove("waiting")
                node.classList.add("false")
            }, 1000);
            setTimeout(()=>{
                windowGame.classList.toggle("playing")
                loseScreen.classList.toggle("playing")
                loseScreenFunc(score.innerText)
                node.classList.remove("false")
                getCountry()
            },2000)
            
        }
    }
}

function loadConfig() {
    for (const highestElem of highestScore) {
        highestElem.innerText = `Highest Score: ${config.highestScoreReach ? config.highestScoreReach : 0}`
    }
}
loadConfig()
getCountry()

function loseScreenFunc(scores) {
    lastedScore.innerText = `Your Score: ${scores}`
    if (scores > (config.highestScoreReach ? config.highestScoreReach : 0)) setConfig('highestScoreReach',Number(scores))
    for (const highestElem of highestScore) {
        highestElem.innerText = `Highest Score: ${config.highestScoreReach ? config.highestScoreReach : scores}`
    }
}

gameItem.onclick = function() {
    gameList.classList.toggle("playing")
    gameChoose.classList.toggle("playing")
    windowGame.classList.remove("playing")
}

againBtn.onclick = function() {
    windowGame.classList.toggle("playing")
    loseScreen.classList.toggle("playing")
    score.innerText = 0
}
backBtn.onclick = function() {
    gameList.classList.toggle("playing")
    gameChoose.classList.toggle("playing")
    loseScreen.classList.toggle("playing")
    score.innerText = 0
}

// var script = document.createElement('script')
// console.log([script])