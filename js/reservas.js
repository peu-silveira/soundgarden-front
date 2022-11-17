let body = document.getElementsByTagName('body')[0];
let idUrl = '';
let bookings = [];

function getBookings(eventId) {
    // TRAZER UMA RESERVA PELO ID
        let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/bookings/event/' + eventId;
        fetch(endpoint)
            .then(response => {

                if (!response.ok) {
                    return new Error('Requisição falhou');
                }

                return response.json();
            })
            .then(data => {
                bookings = data;
                loadTable();
            })
            //Se der algum erro cai no catch
            .catch(error => {
                console.error('Requisição falou com o erro: ' + error);
            })
}


function loadTable() {
    let tbody = document.getElementsByTagName('tbody')[0];

    for (let i = 0; i < bookings.length; i++) {
        let tr = tbody.insertRow();

        let th_position = tr.insertCell().outerHTML = `<th scope="row">${i + 1}</th>`
        let td_owner_name = tr.insertCell();
        let td_owner_email = tr.insertCell();
        let td_number_tickets = tr.insertCell();

        td_owner_name.innerText = bookings[i].owner_name;
        td_owner_email.innerText = bookings[i].owner_email;
        td_number_tickets.innerText = bookings[i].number_tickets;

    }
}


body.onload = function () {
    idUrl = location.search.split('=')[1];
    getBookings(idUrl);
}