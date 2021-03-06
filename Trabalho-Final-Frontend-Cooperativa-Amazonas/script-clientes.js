const barraPesquisa = document.getElementsByTagName('input')[0];
var listaClientes = [];

window.onload = function () {
    carregarPagina();
}

barraPesquisa.onkeyup = function () {
    let textoPesquisado = barraPesquisa.value;
    let listaFiltrada = buscar(listaClientes, textoPesquisado);
    criarTabela(listaFiltrada);
} 

barraPesquisa.onsearch = function () {
    if(barraPesquisa.onkeyup) {
        let listaFiltrada = buscar(listaClientes, barraPesquisa.value);
        criarTabela(listaFiltrada);
    } else {
        criarTabela(listaClientes);
    }
}

function carregarPagina() {
    fetch('https://randomuser.me/api/?results=50')
        .then(dadosClientes => dadosClientes.json())
        .then(dadosClientes => dadosClientes.results)
        .then(dadosClientes => {
            listaClientes = dadosClientes;
            criarTabela(listaClientes);
        })           
}

function criarTabela (clientes) {
    const tBody = document.querySelector('tbody');

    tBody.innerHTML = "";

    for (i = 0; i < clientes.length; i++) {
        let cliente = {
            id:clientes[i].login.uuid,
            nome: clientes[i].name.first + " " + clientes[i].name.last,
            genero: clientes[i].gender.toLowerCase() == 'female' ? 'Feminino' : 'Masculino',
            idade: clientes[i].dob.age,
            localizacao: clientes[i].location.state + ", " + clientes[i].location.country,
            dataCadastro: ajustarData(clientes[i].registered.date)
        }

        const linhaTabela = document.createElement('tr');
        const nome = document.createElement('td');
        const genero = document.createElement('td');
        const idade = document.createElement('td');
        const localizacao = document.createElement('td');
        const dataCadastro = document.createElement('td');

        genero.className = 'center';
        idade.className = 'center';
        linhaTabela.className = 'linha-tabela-cliente';
        dataCadastro.className = 'padding-esquerda-tabela';
        
        linhaTabela.setAttribute("onclick", "mostrarFichaCliente(this)");
        linhaTabela.setAttribute("id", cliente.id);
        linhaTabela.setAttribute("data-bs-toggle","modal");
        linhaTabela.setAttribute("data-bs-target","#exampleModalCenteredScrollable");

        linhaTabela.appendChild(nome);
        linhaTabela.appendChild(genero);
        linhaTabela.appendChild(idade);
        linhaTabela.appendChild(localizacao);
        linhaTabela.appendChild(dataCadastro);

        nome.innerHTML = cliente.nome;
        genero.innerHTML = cliente.genero;
        idade.innerHTML = cliente.idade;
        localizacao.innerHTML = cliente.localizacao;
        dataCadastro.innerHTML = cliente.dataCadastro;

        tBody.appendChild(linhaTabela);
    }
}

function buscar(listaClientes, textoPesquisado) {
    let listaFiltrada = []
    
    listaClientes.forEach(cliente => {
        let nomeCliente =  cliente.name.first + " " + cliente.name.last
        nomeCliente = nomeCliente.toLowerCase();
        textoPesquisado = textoPesquisado.toLowerCase();
  
        if(nomeCliente.includes(textoPesquisado)) {
            listaFiltrada.push(cliente);
        }
    });

    return listaFiltrada;
}

function mostrarFichaCliente(clienteElement){
    let cliente = recuperarCliente(clienteElement.id);

    const imgModal = document.getElementsByClassName('imagem-modal')[0];
    const nomeModal = document.getElementsByClassName('nome-modal')[0];
    const fusoModal = document.getElementsByClassName('fuso-modal')[0];
    const dataCadastroModal = document.getElementsByClassName('data-cadastro-modal')[0];
    const emailModal = document.getElementsByClassName('email-modal')[0];
    const celularModal = document.getElementsByClassName('celular-modal')[0];
    const enderecoModal = document.getElementsByClassName('endereco-modal')[0];
    const paisModal = document.getElementsByClassName('pais-modal')[0];

    imgModal.src = cliente.picture.large;
    fusoModal.innerHTML = `${cliente.location.state}, ${cliente.location.country}`;
    dataCadastroModal.innerHTML = `Data de cadastro: ${ajustarData(cliente.registered.date)}`;
    emailModal.innerHTML = `Email: ${cliente.email}`;
    celularModal.innerHTML = `Celular: ${cliente.cell}`;
    nomeModal.innerHTML = `${cliente.name.title} ${cliente.name.first} 
                                ${cliente.name.last}, ${cliente.dob.age} anos`;
    enderecoModal.innerHTML = `Endere??o: ${cliente.location.street.name}, 
                                n?? ${cliente.location.street.number} - ${cliente.location.city}`

}

function recuperarCliente(id) {
    let clienteFiltrado;
    
    listaClientes.forEach(cliente => {
        if(cliente.login.uuid == id) {
            clienteFiltrado = cliente;
        }
    });

    return clienteFiltrado;
}

function ajustarData(data) {
    let dataSemHora = data.split("T")[0].split("-");
    return `${dataSemHora[2]}/${dataSemHora[1]}/${dataSemHora[0]}`;
}

function mudaTema() {
    document.body.classList.toggle("dark");
    mudaTextoBotaoTema();
}

function mudaTextoBotaoTema() {
    var textoBotaoTema = document.getElementById("button-tema");
    if (textoBotaoTema.innerHTML === "Dark Mode") {
        textoBotaoTema.innerHTML = "Light Mode";
    } else {
        textoBotaoTema.innerHTML = "Dark Mode";
       // alert('cuidado com os bugs atra??dos pela luz')
    }
}