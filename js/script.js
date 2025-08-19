const salvarLancamento = (lancamento) => {
    let dados = JSON.parse(localStorage.getItem("lancamentos")) || [];
    dados.push(lancamento);
    localStorage.setItem("lancamentos", JSON.stringify(dados));
};

const carregarLancamentos = () => {
    const tabela = document.querySelector("#tabelaLancamentos tbody");
    if (!tabela) return;
    tabela.innerHTML = "";
    let dados = JSON.parse(localStorage.getItem("lancamentos")) || [];
    dados.forEach(l => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${l.data}</td><td>${l.tipo}</td><td>${l.descricao}</td><td>${l.produto}</td><td>${l.qtd}</td>`;
        tabela.appendChild(tr);
    });
};

const carregarEstoque = () => {
    const tabela = document.querySelector("#tabelaEstoque tbody");
    if (!tabela) return;
    tabela.innerHTML = "";


    let dados = JSON.parse(localStorage.getItem("lancamentos")) || [];
    let estoque = {};


    dados.forEach(l => {
        if (!estoque[l.produto]) estoque[l.produto] = { entrada: 0, saida: 0 };
        if (l.tipo === "ENTRADA") estoque[l.produto].entrada += Number(l.qtd);
        else if (l.tipo === "SAIDA") estoque[l.produto].saida += Number(l.qtd);
    });


    Object.keys(estoque).forEach(produto => {
        let entrada = estoque[produto].entrada;
        let saida = estoque[produto].saida;
        let saldo = entrada - saida;
        let situacao = saldo <= 5 ? "COMPRAR" : "OK";
        let cor = saldo <= 5 ? "🔴" : "🟢";


        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${produto}</td><td>${entrada}</td><td>${saida}</td><td>${saldo}</td><td>${situacao}</td><td>${cor}</td>`;
        tabela.appendChild(tr);
    });
};


// Eventos
const form = document.querySelector("#formLancamento");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const lancamento = {
            data: document.querySelector("#data").value,
            tipo: document.querySelector("#tipo").value,
            descricao: document.querySelector("#descricao").value,
            produto: document.querySelector("#produto").value,
            qtd: document.querySelector("#qtd").value
        };
        salvarLancamento(lancamento);
        form.reset();
        carregarLancamentos();
    });
}


// Inicializações
carregarLancamentos();
carregarEstoque();