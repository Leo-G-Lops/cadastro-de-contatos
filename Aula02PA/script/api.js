// const STORAGE_KEY = 'contatos_api';

// function obterContatos() {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
// }

// function salvarContatos(contatos) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(contatos));
// }

// export function getContatos() {
//     return new Promise(resolve => {
//         resolve(obterContatos());
//     });
// }

// export function postContato(contato) {
//     return new Promise(resolve => {
//         const contatos = obterContatos();
//         contatos.push(contato);
//         salvarContatos(contatos);
//         resolve();
//     });
// }

// export function putContato(index, contato) {
//     return new Promise(resolve => {
//         const contatos = obterContatos();
//         contatos[index] = contato;
//         salvarContatos(contatos);
//         resolve();
//     });
// }

// export function deleteContato(index) {
//     return new Promise(resolve => {
//         const contatos = obterContatos();
//         contatos.splice(index, 1);
//         salvarContatos(contatos);
//         resolve();
//     });
// }


const API_URL = 'http://localhost:5000/contatos';

export function getContatos(){
    return fetch(API_URL)
    .then(res => res.json());
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
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(contato)
    });

}

export function deleteContato(id){
    return fetch(`${API_URL}/${id}`, {
        method:'DELETE'
    });    
}