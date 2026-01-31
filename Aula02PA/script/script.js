// import {
//     listarContatos,
//     criarContato,
//     atualizarContato,
//     excluirContato
// } from './fakeApi.js';
import { validarContato } from './validations.js'

import {
    getContatos,
    postContato,
    putContato,
    deleteContato
} from './api.js';


const form = document.getElementById('formContato');
const lista = document.getElementById('listaContatos');


let indiceEdicao = null;
// let contatos = [];

// if (localStorage.getItem('contatos')) {
//     contatos = JSON.parse(localStorage.getItem('contatos'));
//     mostrarContatos();
// }

function carregarContatos() {

    getContatos().then(contatos => {

        lista.innerHTML = '';

        contatos.forEach((contato) => {
            const item = document.createElement('li');

            item.innerHTML = `
                <p><strong>Nome:</strong> ${contato.nome}</p>
                <p><strong>E-mail:</strong> ${contato.email}</p>
                <p><strong>Telefone:</strong> ${contato.telefone}</p>
                <button class='btn-editar'>Editar</button> 
                <button class='btn-excluir'>Excluir</button>
            `;
            // const botaoExcluir = item.querySelector('.btn-excluir');
        
            // botaoExcluir.addEventListener('click', function() {
            //     deleteContato(contato.id).then(carregarContatos);
            // });

            const botaoExcluir = item.querySelector('.btn-excluir');
            botaoExcluir.addEventListener('click', () => {
                const confirmar = confirm('Deseja realmente excluir este contato?');
                if (confirmar) {
                    deleteContato(contato.id).then(() => {
                        alert('Contato excluído com sucesso');
                        carregarContatos();
                    })
                    .catch(() => {
                        alert('Erro ao excluir contato');
                    });
                }
            });
        
            const botaoEditar = item.querySelector('.btn-editar');
        
            botaoEditar.addEventListener('click', function() {
                editarContato(contato);
            });
        
            lista.appendChild(item);
        });
     })
     .catch(() => {
        lista.innerHTML = '<li>Erro ao carregar contatos</li>';
     });
}
let contatoEmEdicao = null;

function editarContato(contato) {
    // const contato = contatos[index];

        // document.getElementById('nome').value = contato.nome;
        // document.getElementById('email').value = contato.email;
        // document.getElementById('telefone').value = contato.telefone;

        nome.value = contato.nome;
        email.value = contato.email;
        telefone.value = contato.telefone;
        
        contatoEmEdicao = contato;

        const botao = form.querySelector('button');
        botao.textContent = 'Atualizar contato';

        form.scrollIntoView({ behavior: 'smooth' });
    }

// function removerContato(index) {
//     // contatos.splice(index, 1);

//     // localStorage.setItem('contatos', JSON.stringify(contatos));
//     deleteContato(index).then(() => {

//         mostrarContatos();
//     });
// }

// let indiceEdicao = null;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // botao.textContent = 'Salvar contato';

    const contato = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefone.value.trim()
       
    };

    if (!validarContato(contato)) {
        return;
    }


    if (!contato.nome || !contato.email || !contato.telefone) {
       alert('Preencha todos os campos');
       return;
    }

    
    // const nome = document.getElementById('nome').value;
    // const email = document.getElementById('email').value;
    // const telefone = document.getElementById('telefone').value;

    // if (nome === '' || email === '' || telefone === '') {
    //     alert('Preencha todos os campos');
    //     return;
    // }

    // const contato = { nome, email, telefone };

    // if (indiceEdicao === null) {
    //     // contatos.push({ nome, email, telefone });
    //     postContato(contato).then(() => {
    //         mostrarContatos();
    //     });
    // } else {
    //     // contatos[indiceEdicao] = { nome, email, telefone };
    //     putContato(indiceEdicao, contato).then(() => {

    //         indiceEdicao = null;
    //         mostrarContatos();
    //     });
    // }

    if (contatoEmEdicao) {
        putContato(contatoEmEdicao.id, contato)
            .then(() => {
                alert('Contato atualizado com sucesso');
                contatoEmEdicao = null;
                form.reset();
                form.querySelector('button').textContent = 'Salvar contato';
                carregarContatos();
            })
            
            .catch(() => {
                mostrarMensagem('Erro ao atualizar contato');
            });
           
    } else {
        postContato(contato)
            .then(() => {
                alert('Contato cadastrado com sucesso');
                form.reset();
                carregarContatos();
            })
            .catch(() => {
                alert('Erro ao cadastrar contato');
            });
            
    }
});


    // const novoContato = {
    //     nome: nome,
    //     email: email,
    //     telefone: telefone
    // };

    // contatos.push(novoContato);

    // localStorage.setItem('contatos', JSON.stringify(contatos));

    // mostrarContatos();
    // const item = document.createElement('li');
    // // item.textContent = `Nome: ${nome} | E-mail: ${email} | Telefone: ${telefone}`;
    // item.innerHTML = `
    //     <strong>Nome:</strong> ${nome}<br>
    //     <strong>E-mail:</strong> ${email}<br>
    //     <strong>Telefone:</strong> ${telefone}<br>
    // `

    // lista.appendChild(item);

   // form.reset();


carregarContatos();