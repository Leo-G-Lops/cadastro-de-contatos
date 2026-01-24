import { validarContato } from "./validations.js";

import {
    getContatos,
    postContato,
    putContato,
    deleteContato
} from "./api.js";

// Selecionar elementos da página
const form = document.getElementById('formContato');
const lista = document.getElementById('listaContatos');


//let contatos =[];
// if (localStorage.getItem('contatos')){
//     contatos = JSON.parse(localStorage.getItem('contatos'));
//     mostrarContatos();
// }

let indiceEdicao = null;


function carregarContatos(){
    getContatos().then(contatos => {
    lista.innerHTML = '';

    contatos.forEach((contato) => {
        const item = document.createElement('li');

        item.innerHTML = `
        <p><strong>Nome:</strong> ${contato.nome}</p>
        <p><strong>E-mail:</strong> ${contato.email}</p>
        <p><strong>Telefone:</strong> ${contato.telefone}</p>
        `;

        const botaoExcluir = item.querySelector('.btn-excluir');
        botaoExcluir.addEventListener('click', () =>{
            const confirmar = confirm('Deseja realmente excluir este contato?');
            if (confirmar){
                deleteContato(contato.id).then(() =>{
                    alert('Contato excluído com sucesso');
                    carregarContatos();
                })
                .catch(() => {
                    alert('Erro ao excluir contato')
                });
            }
        });
        const botaoEditar = item.querySelector('.btn-editar');
        botaoEditar.addEventListener('click', function(){
            editarContato(contato);
        });
        lista.appendChild(item);
    });
})
.catch(()=>{
    lista.innterHTML = '<li>Erro ao carregar contatos</li>';
});
} 

let contatoEmEdicao = null;

function editarContato(contato){
    nome.value = contato.nome;
    email.value = contato.email;
    telefone.value = contato.telefone;
    contatoEmEdicao = contato;

    const botao = form.querySelector('button');
    botao.textContent = 'Atualizar contato';
    form.scrollIntoView({behavior: 'smooth'});
}


form.addEventListener('submit', function(event){
    event.preventDefault();

    const contato = {
        nome: nome.value.trim(), 
        email: email.value.trim(), 
        telefone: telefone.value.trim()
    };
    if (!validarContato(contato)){
        return;
    }
    if(!contato.nome || !contato.email || contato.telefone){
        alert('Preencha todos os campos');
        return;
    }
    if(contatoEmEdicao){
        putContato(contatoEmEdicao.id, contato).then(()=>{
            alert('Contato atualizado com sucesso');
            contatoEmEdicao = null;
            form.reset;
            form.querySelector('button').textContent = 'Salvar Contato';
            carregarContatos();
        })
        .catch(()=>{
            mostrarMensagem('Erro ao atualizar contato')
        });
    } else {
        postContato(contato).then(()=>{
            alert('Contato cadastrado com sucesso')
            form.reset();
            carregarContatos();
        })
        .catch(()=>{
            alert('Erro ao cadastrar contato');
        });
    }
});

carregarContatos();



// Evento de envio do formulário

// form.addEventListener('submit',function(event){
//     event.preventDefault(); //impede de recarregar a página

    
//     //pegar valores digitados
//     const nome = document.getElementById('nome').value;
//     const email = document.getElementById('email').value;
//     const telefone = document.getElementById('telefone').value;
    
    //validação
    
    // if(nome === "" || email === "" || telefone === ""){
    //     alert('Preencha todos os campos!')
    //     return;
    // }

    // const novoContato = {
    //     nome:nome,
    //     email:email,
    //     telefone: tel
    // };

    // contatos.push(novoContato);

   // localStorage.setItem('contatos', JSON.stringify(contatos));

    //mostrarContatos();
    // //criando item da lista
    // const item = document.createElement('li');
    // item.textContent = `Nome: ${nome} | E-mail:${email} | Telefone:${tel}`;
    
    // //adicionar na lista
    // lista.appendChild(item);

    //limpar os campos
    //form.reset();
    
//});




