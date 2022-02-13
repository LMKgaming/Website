var h2 = document.querySelector('h2')

setInterval(function () {
    h2.innerText = `Thời gian hiện tại là: ` + new Date().toLocaleString('vi')
},100)