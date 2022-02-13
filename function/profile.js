profileList = [
    {
        name: "Lê Minh",
        value: "Học sinh",
        img: "./img/binh.jpg"
    },
    {
        name: "Minh Khoa",
        value: "Coder",
        img: "./img/binh.jpg"
    },
    {
        name: "Thái Bình",
        value: "Người yêu",
        img: "./img/binh.jpg"
    },
    {
        name: "Tú Anh",
        value: "Học sinh",
        img: "./img/binh.jpg"
    },
    {
        name: "Thanh Dương",
        value: "Học sinh",
        img: "./img/binh.jpg"
    },
    {
        name: "Ngọc Ánh",
        value: "Học sinh",
        img: "./img/binh.jpg"
    },
    {
        name: "Ngọc Huyền",
        value: "Học sinh",
        img: "./img/binh.jpg"
    },
    {
        name: "Thiên Long",
        value: "Ngáo",
        img: "./img/binh.jpg"
    },
]

var btnBtn = document.querySelector(".search-btn")
btnBtn.onclick = function () {
    this.parentElement.classList.toggle("open");
    this.previousElementSibling.focus()
}

var btnSearch = document.querySelector(".search-input")
btnSearch.onchange = function () {
    var elem = document.querySelector(".status");
    elem.style.visibility = "visible"
    var width = 1;
    
    var profile = document.querySelector(".profile__header")
    profile.style.opacity = "0";
    profile.style.visibility = "hidden"
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            elem.innerHTML = "Success";
            setTimeout(function(){
                elem.innerHTML = "";
                elem.style.width = 0 + "%";
                elem.style.visibility = "hidden"
                btnSearchChange()
            },1000)
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width + "%"
        }
    }
    
}
function btnSearchChange() {
    var img = document.querySelector(".profile__header .profile-img img")
    var name = document.querySelector(".profile__header h2")
    var value = document.querySelector(".profile__header p")
    var profile = document.querySelector(".profile__header")
    profile.style.opacity = "1.0";
    profile.style.visibility = "visible"
    for (var key of profileList) {
        if (key.name == btnSearch.value) {
            name.innerHTML = key.name;
            img.src = key.img;
            value.innerHTML = key.value
            return;
        } else {
            name.innerHTML = "No name in data";
            value.innerHTML = "No data"
        }
    }
}

