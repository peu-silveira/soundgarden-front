let body = document.getElementsByTagName('body')[0];
let events = [];

// CONFIRMAR DELEÇÃO DO EVENTO
function deleteEvent(id, name) {
    let deleteConfirmation = confirm(`Deseja deletar o evento ${name}?`);

    if (deleteConfirmation) {
        let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/events/' + id;
        fetch(endpoint, { method: 'DELETE' })
            .then(response => {
                response.text()
                window.location.reload();
            })
            //Se der algum erro cai no catch
            .catch(error => {
                console.error('Requisição falou com o erro: ' + error);
            })
    }


}

// TRAZER TODOS OS EVENTOS
function getEvents() {
    let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/events';
    fetch(endpoint)
        .then(response => {

            if (!response.ok) {
                return new Error('Requisição falhou');
            }

            return response.json();
        })
        .then(data => {
            events = data;
            loadTable();
        })
        //Se der algum erro cai no catch
        .catch(error => {
            console.error('Requisição falou com o erro: ' + error);
        })
}

function loadTable() {
    let tbody = document.getElementsByTagName('tbody')[0];

    for (let i = 0; i < events.length; i++) {
        let tr = tbody.insertRow();

        let th_position = tr.insertCell().outerHTML = `<th scope="row">${i + 1}</th>`
        let td_scheduled = tr.insertCell();
        let td_name = tr.insertCell();
        let td_attractions = tr.insertCell();

        let td_actions = tr.insertCell().outerHTML = `
        <td>
        <a href="../reservas.html?id=${events[i]._id}" class="btn btn-dark" id="btShowBookings">ver reservas</a>
        <a href="../editar-evento.html?id=${events[i]._id}" class="btn btn-secondary" id="btEditEvent">editar</a>
        <button class="btn btn-danger" id="btDeleteEvent" onclick="deleteEvent('${events[i]._id}', '${events[i].name}')">excluir</button>
        </td>`;

        btDeleteEvent = document.getElementById('btDeleteEvent');

        td_scheduled.innerText = events[i].scheduled;
        td_name.innerText = events[i].name;
        td_attractions.innerText = events[i].attractions;

    }
}

body.onload = function () {
    getEvents();
}