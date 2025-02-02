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
                </td> -->`

  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
}

const tabela = document.querySelector('[data-tabela]');


const http = new XMLHttpRequest();
http.open('GET', 'http://localhost:3000/profile')
http.send()

//exibindo dados do cliente
http.onload = () => {
  const data = JSON.parse(http.response)
  data.forEach(elemento => {
    tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
  })

  //cliente cadastrados na semana anterior
  const http2 = new XMLHttpRequest()
  http2.open('GET', 'http://localhost:3000/profile/semanaPassada')

  http2.onload = () => {
    //puxando dados semana retrasada
    const http3 = new XMLHttpRequest()
    http3.open('GET', 'http://localhost:3000/profile/semanaRetrasada')

    http3.onload = () => {
      
    }


  }

  http2.send()
}