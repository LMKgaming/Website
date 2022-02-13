var playBtn = document.querySelector(".play")
var audio = document.querySelector("#audio")
var isPlaying = true
var progress = document.querySelector("#progress-bar")
var cdThumb = document.querySelector(".song-thumb img")
var songName = document.querySelector(".song-name h2")
var songAuthor = document.querySelector(".song-name h3")
var nextBtn = document.querySelector(".next")
var backBtn = document.querySelector(".back")
var repeatBtn = document.querySelector(".repeat")
var playList = document.querySelector(".playlist")
var randomBtn = document.querySelector(".random")
var volumeBar = document.querySelector("#volume-bar")
var outputNumVol = document.querySelector(".output")
var seekNext = document.querySelector(".next-seek")
var seekBack = document.querySelector(".back-seek")

const PLAYER_STORAGE_KEY = 'KHOAYEUBINH'

const defineProperties = {
    currentSong: 0,
    isRepeating: false,
    isShuffling: false,
}

const config = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}

function setConfig(key, value) {
    config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(config))
}

const songList = [
    {
        name: 'Cô gái M52',
        author: 'HuyR',
        img: './img/binh2.jpg',
        path: './song/cogaim52.mp3'
    },
    {
        name: 'Holo',
        author: 'Alan Walker',
        img: './img/binh3.jpg',
        path: './song/holo.mp3'
    },
    {
        name: 'Bài hát liên quân',
        author: 'Vanh Leg',
        img: './img/binh4.jpg',
        path: './song/baihatlienquan.mp3'
    },
    {
        name: 'Anh Thanh Niên',
        author: 'HuyR',
        img: './img/binh5.jpg',
        path: './song/anhthanhnien.mp3'
    },
    {
        name: 'Way Back',
        author: 'Fake',
        img: './img/binh6.jpg',
        path: './song/abc.mp3'
    },
    {
        name: 'test',
        author: 'f8',
        img: './img/binh7.jpg',
        path: 'blob:https://www.youtube.com/ecfe7b49-0c3c-4b1d-8c84-2077306353c8'
    }
]

function renderListSong() {
    const htmls = songList.map((song, index) => {
        return `
        <div class="song-file" data-value="${index}">
            <div class="song-thumb-mini">
                <img src="${song.img ? song.img : './img/binh.jpg'}" alt="" />
            </div>
            <div class="song-desc-mini">
                <h3>${song.name}</h3>
                <h4>${song.author}</h4>
            </div>
            <div class="song-option">
                <i class="fas fa-ellipsis-h"></i>
                <!-- <ul>
                    <li>
                        <i class="fas fa-heart"></i>
                    </li>
                </ul> -->
            </div>
        </div>
        `
    })
    playList.innerHTML = htmls.join("")
}
renderListSong()

function scrollSong(name) {
    name.scrollIntoView({behavior: 'smooth',block: 'center',inline: 'nearest'})
}

function loadConfig() {
    if (!config == {}) {
        defineProperties.isRepeating = config.isRepeating
        defineProperties.isShuffling = config.isShuffling
        defineProperties.currentSong = config.currentSong
        // console.log(defineProperties.currentSong)
        defaultRender()
    }
}

function defaultRender() {
    repeatBtn.firstElementChild.classList.toggle("active",defineProperties.isRepeating)
    randomBtn.firstElementChild.classList.toggle("active",defineProperties.isShuffling)
    loadCurrentSong()
}

loadConfig()

function loadCurrentSong() {
    songName.innerText = songList[defineProperties.currentSong].name
    songAuthor.innerText = songList[defineProperties.currentSong].author
    audio.src = songList[defineProperties.currentSong].path
    cdThumb.src = songList[defineProperties.currentSong].img ? songList[defineProperties.currentSong].img : './img/binh.jpg'
    setConfig('currentSong',defineProperties.currentSong)
    var songListNames = document.querySelectorAll(".song-desc-mini h3")
    for (const songListName of songListNames) {
        if (songName.innerText == songListName.innerText) {
            songListName.parentElement.parentElement.classList.add("playing")
            scrollSong(songListName.parentElement.parentElement)
        } else {
            songListName.parentElement.parentElement.classList.remove("playing")
        }
    }
}
loadCurrentSong()

playList.onclick = function(e) {
    const songNodeFile = e.target.closest('.song-file:not(.playing)')
    if (songNodeFile || e.target.closest('.song-option')) {
        if (songNodeFile) {
            // console.log(songNodeFile.dataset.value)
            defineProperties.currentSong = Number(songNodeFile.dataset.value)
            loadCurrentSong()
            isPlaying = true
            playSong()
        }
        if (e.target.closest('.song-option')) {

        }
    }
}

playBtn.onclick = function () {
    playSong()
}

audio.onplay = function() {
    isPlaying = false
    playBtn.firstElementChild.classList.remove("fa-play-circle")
    playBtn.firstElementChild.classList.add("fa-pause-circle")
    cdThumbAnimate.play()
}

audio.onpause = function() {
    isPlaying = true
    playBtn.firstElementChild.classList.add("fa-play-circle")
    playBtn.firstElementChild.classList.remove("fa-pause-circle")
    cdThumbAnimate.pause()
}

nextBtn.onclick = function () {
    isPlaying = true
    changeSong()
}

function nextSong() {
    defineProperties.currentSong = defineProperties.currentSong + 1
    if (defineProperties.currentSong>=songList.length) defineProperties.currentSong = 0
    loadCurrentSong()
}

backBtn.onclick = function () {
    isPlaying = true
    if (defineProperties.isRepeating) {
        playSong()
    } else if(defineProperties.isShuffling) {
        randomSong()
        loadCurrentSong()
        playSong()
    } else {
        backSong()
        playSong()
    }
}

function backSong() {
    defineProperties.currentSong = defineProperties.currentSong -1
    if (defineProperties.currentSong < 0) defineProperties.currentSong = songList.length - 1
    loadCurrentSong()
}

const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)' }
],{
    duration: 8000,
    iterations: Infinity,
})
cdThumbAnimate.pause()

function playSong() {
    if (isPlaying) {
        audio.play()
    } else {
        audio.pause()
    }
}

audio.ontimeupdate = function() {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
    }
}

progress.onchange = function(e) {
    const seekTime = Math.floor(e.target.value / 100 * audio.duration)
    audio.currentTime = seekTime
}

seekNext.onclick = function() {
    audio.currentTime = audio.currentTime + 5
}

seekBack.onclick = function() {
    audio.currentTime = audio.currentTime - 5
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var randomNumList = []

function randomSong() {
    var randomNum = getRandomInt(songList.length-1)
    if (!randomNumList.includes(randomNum)) {
        randomNumList.push(randomNum)
        defineProperties.currentSong = randomNum
    } else if (randomNumList.length > songList.length / 2) {
        randomNumList = []
        nextSong()
    } else {
        randomSong()
    }
    // console.log(randomNumList)
}

function changeSong() {
    if (defineProperties.isRepeating) {
        isPlaying = true
        playSong()
    } else if(defineProperties.isShuffling) {
        randomSong()
        loadCurrentSong()
        playSong()
    } else {
        nextSong()
        playSong()
    }
}

audio.onended = function() {
    changeSong()
}

repeatBtn.onclick = function() {
    if (defineProperties.isRepeating) {
        defineProperties.isRepeating = false
    } else {
        defineProperties.isRepeating = true
    }
    this.firstElementChild.classList.toggle("active-config",defineProperties.isRepeating)
    setConfig('isRepeating',defineProperties.isRepeating)
}

randomBtn.onclick = function() {
    if (defineProperties.isShuffling) {
        defineProperties.isShuffling = false
    } else {
        defineProperties.isShuffling = true
    }
    this.firstElementChild.classList.toggle("active-config",defineProperties.isShuffling)
    setConfig('isShuffling',defineProperties.isShuffling)
}

// var songFiles = document.querySelectorAll(".song-file")
// for (var i = 0;i < songFiles.length;i++) {
//     songFiles[i].onclick = function() {
//         this.scrollIntoView({behavior: 'smooth',block: 'center',inline: 'nearest'})
//         for (var k = 0; k<songList.length; k++) {
//             if(this.firstElementChild.nextElementSibling.firstElementChild.innerText == songList[k]['name']) {
//                 // console.log(k)
//                 defineProperties.currentSong = k
//                 loadCurrentSong()
//                 isPlaying = true
//                 playSong()
//             }
//         }
//     }    
// }

volumeBar.addEventListener('input',volumeBarChange)
function volumeBarChange() {
    outputNumVol.style.visible = "visible"
    audio.volume = volumeBar.value / 100
    outputNumVol.innerHTML = volumeBar.value
    setConfig('volume',audio.volume)
    setTimeout(() => {
        outputNumVol.style.visible = "hidden"
        outputNumVol.innerHTML = ""
    },5000)
}