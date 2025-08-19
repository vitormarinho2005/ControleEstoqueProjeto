// ============================
// relatorios.js
// ============================

// Recuperar produtos do Local Storage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Selecionar elementos do DOM
const totalTiposEl = document.getElementById("totalTipos");
const totalProdutosEl = document.getElementById("totalProdutos");
const valorTotalEl = document.getElementById("valorTotal");
const tabelaBody = document.getElementById("tabelaRelatorios").querySelector("tbody");

// ============================
// Funções
// ============================

// Calcular e atualizar totais
function atualizarTotais() {
  const totalTiposProdutos = produtos.length;
  const totalProdutos = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + p.quantidade * p.preco, 0);

  totalTiposEl.textContent = `Total tipos de produtos: ${totalTiposProdutos}`;
  totalProdutosEl.textContent = `Total de produtos: ${totalProdutos}`;
  valorTotalEl.textContent = `Valor total do estoque: R$ ${valorTotal.toFixed(2)}`;
}

// Remover produto
function removerProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderizarTabela();
}

// Renderizar tabela
function renderizarTabela() {
  tabelaBody.innerHTML = "";

  produtos.forEach(p => {
    const tr = document.createElement("tr");

    // Nome
    const tdNome = document.createElement("td");
    tdNome.textContent = p.nome;
    tr.appendChild(tdNome);

    // Quantidade
    const tdQtd = document.createElement("td");
    tdQtd.textContent = p.quantidade;
    tr.appendChild(tdQtd);

    // Preço
    const tdPreco = document.createElement("td");
    tdPreco.textContent = p.preco.toFixed(2);
    tr.appendChild(tdPreco);

    // Total
    const tdTotal = document.createElement("td");
    tdTotal.textContent = (p.quantidade * p.preco).toFixed(2);
    tr.appendChild(tdTotal);

    // Ações
    const tdAcoes = document.createElement("td");
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerProduto(p.id);
    tdAcoes.appendChild(btnRemover);
    tr.appendChild(tdAcoes);

    // Status
    const tdStatus = document.createElement("td");
    tdStatus.textContent = p.quantidade <= 10 ? "Falta" : "Ok";
    tdStatus.style.color = p.quantidade <= 10 ? "red" : "green";
    tr.appendChild(tdStatus);

    tabelaBody.appendChild(tr);
  });

  atualizarTotais();
}

// ============================
// Inicialização
// ============================
renderizarTabela();
