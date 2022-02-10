let name = prompt("Qual o seu nome?");
let comparador1 = [undefined];
let comparador2 = [null];

const chat = document.querySelector("main");

searchData();
setInterval(searchData, 3000);

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
    
    if (comparador2 !== comparador1) {
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
        comparador1 = info.data;
        comparador2 = comparador1;
        message.scrollIntoView();
    }
}