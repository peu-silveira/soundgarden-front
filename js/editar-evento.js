let body = document.getElementsByTagName('body')[0];
let idUrl = '';
let btEnviar = document.getElementById('btEnviar');

function formatAttractions(attractionsString){
    let attractionsSplitted = attractionsString.split(',');

    for(let i = 0; i < attractionsSplitted.length; i++){
        let attraction = attractionsSplitted[i];
        if(attraction[0] == ' '){
            attractionsSplitted[i] = attraction.substring(1);
        }
    }

    return attractionsSplitted;
}

function editEvent(name, poster, attractions, description, scheduled, number_tickets) {
    
    //Configurando o objeto a ser enviado
    const event = {
        name: name,
        poster: poster,
        attractions: attractions,
        description: description,
        scheduled: scheduled,
        number_tickets: number_tickets
    };

    console.log(event)
    //Configurando método post
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    };

    //Consumindo API
    let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/events/' + idUrl;
    fetch(endpoint, options)
        .then(response => {

            if (!response.ok) {
                return new Error('Requisição falhou');
            }

            // return response.json();
            response.text()
        })
        //Se der algum erro cai no catch
        .catch(error => {
            console.error('Requisição falou com o erro: ' + error);
        })
}

btEnviar.onclick = function () {
    let nameInput = document.getElementById('nome').value;
    let poster = document.getElementById('banner').value;
    let attractionsInput = document.getElementById('atracoes').value;
    let descriptionInput = document.getElementById('descricao').value;
    let scheduledInput = new Date(document.getElementById('data').value);
    let number_ticketsInput = document.getElementById('lotacao').value;
    let attractions = formatAttractions(attractionsInput);
    let number_tickets = +number_ticketsInput;

    editEvent(nameInput, poster, attractions, descriptionInput, scheduledInput, number_tickets);

    alert('Evento atualizado com sucesso!');
}

function fillForm(event){
    document.getElementById('nome').value = event.name;
    document.getElementById('banner').value = event.poster;
    document.getElementById('atracoes').value = event.attractions;
    document.getElementById('descricao').value = event.description;
    document.getElementById('data').value = new Date(event.scheduled).toLocaleString('pt-BR', { timeZone: 'UTC' });;
    document.getElementById('lotacao').value = event.number_tickets;
}

function getEvent(id) {
    // TRAZER UM EVENTO PELO ID
        let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/events/' + id;
        fetch(endpoint)
            .then(response => {

                if (!response.ok) {
                    return new Error('Requisição falhou');
                }

                return response.json();
            })
            .then(evento => {
                fillForm(evento);
            })
            //Se der algum erro cai no catch
            .catch(error => {
                console.error('Requisição falou com o erro: ' + error);
            })
}



body.onload = function () {
    idUrl = location.search.split('=')[1];
    getEvent(idUrl);
}