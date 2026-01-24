let = contatos =[];
if (localStorage.getItem('contatos')){
    contatos = JSON.parse(localStorage.getItem('contatos'));
    mostrarContatos();
}


function mostrarContatos(){
    lista.innerHTML = '';

    contatos.forEach(function(contato){
        const item = document.createElement('li');

        item.innerHTML = `
        <p><strong>Nome:</strong> ${contato.nome}</p>
        <p><strong>E-mail:</strong> ${contato.email}</p>
        <p><strong>Telefone:</strong> ${contato.telefone}</p>
        `
    })
}

// Selecionar elementos da página
const form = document.getElementById('formContato');
const lista = document.getElementById('listaContatos');

// Evento de envio do formulário

form.addEventListener('submit',function(event){
    event.preventDefault(); //impede de recarregar a página

    
    //pegar valores digitados
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('telefone').value;
    
    //validação
    
    if(nome === "" || email === "" || tel === ""){
        alert('Preencha todos os campos!')
        return;
    }

    const novoContato = {
        nome:nome,
        email:email,
        telefone: tel
    };

    contatos.push(novoContato);

    localStorage.setItem('contatos', JSON.stringify(contatos));

    mostrarContatos();
    // //criando item da lista
    // const item = document.createElement('li');
    // item.textContent = `Nome: ${nome} | E-mail:${email} | Telefone:${tel}`;
    
    // //adicionar na lista
    // lista.appendChild(item);

    //limpar os campos
    form.reset();
    
});

