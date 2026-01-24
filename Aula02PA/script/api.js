const API_URL = 'http://localhost:500/contatos';

export function getContatos(){
    return fetch(API_URL)
    .then(res => res.json())
}


export function postContato(contato){
    return fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type' : 'application/JSON'
        },
        body: JSON.stringify(contato)
    });
}

export function putContato(id, contato){
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : application/json
        },
        body: JSON.stringify(contato)
    });

}

export function deleteContato(id){
    return fetch(`${API_URL}/${id}`, {
        method:'DELETE'
    });    
}