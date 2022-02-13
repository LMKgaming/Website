var registerForm = document.querySelector('.register')
var loginForm = document.querySelector('.login')
var registerBtn = document.querySelector('.register-btn')
var loginBtn = document.querySelector('.login-btn')

registerForm.style.display = 'none'
loginForm.style.display = 'flex'
registerForm.style.opacity = '0'
loginForm.style.opacity = '1'

loginBtn.onclick = () => {
    loginBtn.classList.add('on-page')
    registerBtn.classList.remove('on-page')
    registerForm.style.display = 'none'
    loginForm.style.display = 'flex'
    setTimeout(() => {
        registerForm.style.opacity = '0'
        loginForm.style.opacity = '1'
    },100)
}

registerBtn.onclick = () => {
    registerBtn.classList.add('on-page')
    loginBtn.classList.remove('on-page')
    registerForm.style.display = 'flex'
    loginForm.style.display = 'none'
    setTimeout(() => {
        registerForm.style.opacity = '1'
        loginForm.style.opacity = '0'
    },100)
}