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

function newEvent(name, poster, attractions, description, scheduled, number_tickets) {
    
    //Configurando o objeto a ser enviado
    const event = {
        name: name,
        poster: poster,
        attractions: attractions,
        description: description,
        scheduled: scheduled,
        number_tickets: number_tickets
    };

    //Configurando método post
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    };

    //Consumindo API
    let endpoint = 'https://xp41-soundgarden-api.herokuapp.com/events';
    fetch(endpoint, options)
        .then(response => {

            if (!response.ok) {
                return new Error('Requisição falhou');
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        //Se der algum erro cai no catch
        .catch(error => {
            console.error('Requisição falou com o erro: ' + error);
        })
}

let btEnviar = document.getElementById('btEnviar');
btEnviar.onclick = function () {
    let nameInput = document.getElementById('nome').value;
    let poster = 'link da imagem';
    let attractionsInput = document.getElementById('atracoes').value;
    let descriptionInput = document.getElementById('descricao').value;
    let scheduledInput = new Date(document.getElementById('data').value);
    let number_ticketsInput = document.getElementById('lotacao').value;

    let attractions = formatAttractions(attractionsInput);
    let number_tickets = +number_ticketsInput;

    newEvent(nameInput, poster, attractions, descriptionInput, scheduledInput, number_tickets);

    alert('Evento criado com sucesso!');
}