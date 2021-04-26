(() => {
    let logout = document.getElementById('logout');
    let login = document.getElementById('login');
    let addProduct = document.getElementById('addProduct');
    let username = document.getElementById('username');

    let user = localStorage.getItem('user');
    if (user) {
        login.hidden = true;
        addProduct.hidden = false;
        logout.hidden = false;
        username.hidden = false;
        username.innerHTML = `Logged in as <span class="ml-1 font-weight-bold">${user}</span>`;
    } else {
        login.hidden = false;
        addProduct.hidden = true;
        logout.hidden = true;
        username.hidden = true;
        username.innerText = '';
    }
})();

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
});
