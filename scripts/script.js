let nameUser = prompt("Qual o seu nome de usuário?");
verifyUser();
searchData();


let comparador1 = [undefined];
let comparador2 = [];

const chat = document.querySelector("main");


setInterval(searchData, 3000);



function verifyUser() {
    const userObject = {
        name: nameUser
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userObject);

    promise.catch(duplicateUser)
}


function duplicateUser(error) {
    const locateError = parseInt(error.response.status);

    if (locateError !== 200) {
        nameUser = prompt("Este nome de usuário já está em uso, utilize outro.");
        verifyUser();
    }
}





function searchData() {
    const chatData = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    chatData.then(renderChatData);
}





function renderChatData(info) {
    let message = document.querySelector('.mensagem');

    let username = null;
    let target = null;
    let sentText = null;
    let type = null;
    let time = null;

    comparador1 = info.data;
    
    if (comparador2 != comparador1) {
        chat.innerHTML = "";

        for (let i = 0; i < 100; i++) {
            username = info.data[i].from;
            target = info.data[i].to;
            sentText = info.data[i].text;
            type = info.data[i].type;
            time = info.data[i].time;
    
            if (type === 'status') {
                chat.innerHTML += `<div class="${type} mensagem"><p> <span class="time">(${time})</span> <span><strong>${username}</strong></span> <span>${sentText}</span> </p></div>`
            } else if (type === "message") {
                chat.innerHTML += `<div class="${type} mensagem"><p> <span class="time">(${time})</span> <span><strong>${username}</strong> para <strong>${target}</strong>:</span> <span>${sentText}</span> </p></div>`
            } else {
                chat.innerHTML += `<div class="${type} mensagem"><p> <span class="time">(${time})</span> <span><strong>${username}</strong> reservadamente para <strong>${target}</strong>:</span> <span>${sentText}</span> </p></div>`
            }
        }
        message.scrollIntoView();
    }

    comparador2 = comparador1;
}