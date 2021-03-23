
const button = document.getElementsByClassName('.butonSubmit');

async function submit() {


    const username = document.querySelector('.username');
    const password = document.querySelector('.password');
    const data = {
        username: username.value,
        password: password.value
    }

    let res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // .then(async res => {
    //     username.value = ''
    //     password.value = ''
    //     console.log(await res.json())
    //     /*  window.location.replace('http://127.0.0.1:5500/templates/redirect.html') */
    // })
    // .catch(e => console.log(e))
    // console.log(await res.json())
    let user = await res.json();
    if (user?.success) window.location.replace('http://127.0.0.1:5500/templates/redirect.html');
}


