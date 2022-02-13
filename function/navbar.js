var menuBtn = document.querySelector(".menu-icon")
menuBtn.onclick = () => {
    var width = window.getComputedStyle(menuBtn, null).getPropertyValue("--nav-width");
    if (width === "75px") {
        document.documentElement.style.setProperty('--nav-width', '150px');
        var menu = document.querySelector(".menu-icon button i")
        var home = document.querySelector(".home")
        var news = document.querySelector(".news")
        var music = document.querySelector(".music")
        var profile = document.querySelector(".profile")
        var config = document.querySelector(".config")
        var login = document.querySelector(".login")
        var dark = document.querySelector(".dark")
        var cloud = document.querySelector(".cloud")
        setTimeout(function(){
            menu.innerHTML = menu.innerHTML + " Menu";
            home.innerHTML = home.innerHTML + " Home";
            news.innerHTML = news.innerHTML + " News";
            music.innerHTML = music.innerHTML + " Music";
            profile.innerHTML = profile.innerHTML + " Profile";
            config.innerHTML = config.innerHTML + " Config";
            login.innerHTML = login.innerHTML + " Login";
            dark.innerHTML = dark.innerHTML + " Dark";
            cloud.innerHTML = cloud.innerHTML + " Weather"
        },500)
    } else {
        document.documentElement.style.setProperty('--nav-width', '75px');
        var menu = document.querySelector(".menu-icon button")
        var home = document.querySelector(".home")
        var news = document.querySelector(".news")
        var music = document.querySelector(".music")
        var profile = document.querySelector(".profile")
        var config = document.querySelector(".config")
        var login = document.querySelector(".login")
        var dark = document.querySelector(".dark")
        var cloud = document.querySelector(".cloud")
        menu.innerHTML = menu.innerHTML.replace(" Menu","");
        home.innerHTML = home.innerHTML.replace(" Home","");
        news.innerHTML = news.innerHTML.replace(" News","");
        music.innerHTML = music.innerHTML.replace(" Music","");
        profile.innerHTML = profile.innerHTML.replace(" Profile","");
        config.innerHTML = config.innerHTML.replace(" Config","");
        login.innerHTML = login.innerHTML.replace(" Login","");
        dark.innerHTML = dark.innerHTML.replace(" Dark","");
        cloud.innerHTML = cloud.innerHTML.replace(" Weather","")
    }
}