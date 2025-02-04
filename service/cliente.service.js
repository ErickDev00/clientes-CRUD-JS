// Selecionando elementos do DOM
const tabela = document.querySelector('[data-tabela]');
const formulario = document.querySelector('[data-form]');

// Função para criar uma nova linha na tabela de clientes
const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr');
    linhaNovoCliente.innerHTML = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
    `;
    linhaNovoCliente.dataset.id = id;
    return linhaNovoCliente;
};

// Função para listar clientes
const listaClientes = () => {
    return fetch('http://localhost:3000/profile')
        .then(res => res.json())
        .catch(err => console.error('Erro ao listar clientes:', err));
};

// Função para criar um cliente
const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(res => res.json())
    .catch(err => console.error('Erro ao criar cliente:', err));
};

// Função para remover cliente
const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao excluir cliente');
        }
    })
    .catch(err => console.error('Erro ao remover cliente:', err));
};

// Adicionando clientes na tabela ao carregar a página
listaClientes().then(data => {
    data.forEach(cliente => {
        tabela.appendChild(criaNovaLinha(cliente.nome, cliente.email, cliente.id));
    });
});

// Capturando evento de envio do formulário
if (formulario) {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nome = evento.target.querySelector('[data-nome]').value;
        const email = evento.target.querySelector('[data-email]').value;
        
        criaCliente(nome, email).then(() => {
            window.location.href = '../telas/cadastro_concluido.html';
        });
    });
}

// Capturando evento de clique para deletar clientes
if (tabela) {
    tabela.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('botao-simples--excluir')) {
            const linhaCliente = evento.target.closest('tr');
            const id = linhaCliente.dataset.id;
            
            removeCliente(id).then(() => {
                linhaCliente.remove();
            });
        }
    });
}
