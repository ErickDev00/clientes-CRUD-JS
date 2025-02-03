//criando tabela cliente
const criaNovaLinha = (nome, email) => {
  const linhaNovoCliente = document.createElement('tr');
  const conteudo = `<td class="td" data-td>${nome}</td>
                <td>${email}</td>
                <td>
                    <ul class="tabela__botoes-controle">
                        <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
                        <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                    </ul>
                </td> `

  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
}

const tabela = document.querySelector('[data-tabela]');
const formulario = document.querySelector('[data-form]');

const listaClientes = () => {
  return fetch(`http://localhost:3000/profile`)
  .then( res => {
    return res.json()
  })
  }

  listaClientes()
  .then(data => {
    data.forEach(elemento=>{
      tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
    })
  })

  const criaCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        email: email
      })
        
      
    })
    .then( res => {
      return res.body
    })
  }


formulario.addEventListener( 'submit', (evento) => {
  evento.preventDefault()
  const nome = evento.target.querySelector('[data-nome]').value;
  const email = evento.target.querySelector('[data-email]').value;

  criaCliente(nome, email).then(() => {
    window.location.href = '../telas/cadastro_concluido.html'
  })
})

