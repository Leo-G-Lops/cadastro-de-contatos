export function validarContato(contato){
    if (contato.nome.length < 3){
        alert('O nome deve ter pelo menos 3 letras');
        return false;
    }

    if (!contato.email.includes('@') || !contato.email.includes('.')){
        alert('Digite um email válido');
        return false;
    }

    if (isNaN(contato.telefone) || contato.telefone.length < 10){
        alert('Digite um telefone válido')
        return false;
    }
        return true;
}