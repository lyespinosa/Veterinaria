let nightmode = document.querySelector('#switch')

nightmode.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    nightmode.classList.toggle('active-dark');

    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true')
    }
    else{
        localStorage.setItem('dark-mode', 'false')
    }
})


if(localStorage.getItem('dark-mode') === 'true'){
    document.body.classList.add('dark')
    nightmode.classList.add('active-dark');

}else{
    document.body.classList.remove('dark')
    nightmode.classList.remove('active-dark');

}