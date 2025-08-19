// ============================
// Estoque.js
// ============================

// Selecionando elementos do DOM
const formEstoque = document.getElementById("formEstoque");
const nomeInput = document.getElementById("nome");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const tabelaProdutos = document.getElementById("tabelaProdutos").querySelector("tbody");

// Recuperando produtos do Local Storage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Variáveis para edição
let editandoId = null;

// ============================
// Funções
// ============================

// Salvar produtos no Local Storage
function salvarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Adicionar produto
function adicionarProduto(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const preco = Number(precoInput.value);

    if (!nome || !quantidade || !preco) return;

    const novoProduto = {
        id: Date.now(),
        nome,
        quantidade,
        preco
    };

    produtos.push(novoProduto);
    salvarLocalStorage();
    renderizarTabela();

    // Limpar formulário
    nomeInput.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
}

// Remover produto
function removerProduto(id) {
    produtos = produtos.filter(p => p.id !== id);
    salvarLocalStorage();
    renderizarTabela();
}

// Iniciar edição
function editarProduto(id) {
    editandoId = id;
    renderizarTabela();
}

// Salvar edição
function salvarEdicao(id) {
    const qtdInput = document.getElementById(`quantidade-${id}`);
    const precoInput = document.getElementById(`preco-${id}`);

    const novaQuantidade = Number(qtdInput.value);
    const novoPreco = Number(precoInput.value);

    produtos = produtos.map(p =>
        p.id === id ? { ...p, quantidade: novaQuantidade, preco: novoPreco } : p
    );

    editandoId = null;
    salvarLocalStorage();
    renderizarTabela();
}

// Cancelar edição
function cancelarEdicao() {
    editandoId = null;
    renderizarTabela();
}

// Renderizar tabela
function renderizarTabela() {
    tabelaProdutos.innerHTML = "";

    produtos.forEach(p => {
        const tr = document.createElement("tr");

        // Nome
        const tdNome = document.createElement("td");
        tdNome.textContent = p.nome;
        tr.appendChild(tdNome);

        // Quantidade
        const tdQtd = document.createElement("td");
        if (editandoId === p.id) {
            const inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.id = `quantidade-${p.id}`;
            inputQtd.value = p.quantidade;
            tdQtd.appendChild(inputQtd);
        } else {
            tdQtd.textContent = p.quantidade;
        }
        tr.appendChild(tdQtd);

        // Preço
        const tdPreco = document.createElement("td");
        if (editandoId === p.id) {
            const inputPreco = document.createElement("input");
            inputPreco.type = "number";
            inputPreco.id = `preco-${p.id}`;
            inputPreco.value = p.preco.toFixed(2);
            tdPreco.appendChild(inputPreco);
        } else {
            tdPreco.textContent = p.preco.toFixed(2);
        }
        tr.appendChild(tdPreco);

        // Total
        const tdTotal = document.createElement("td");
        tdTotal.textContent = (p.quantidade * p.preco).toFixed(2);
        tr.appendChild(tdTotal);

        // Ações
        const tdAcoes = document.createElement("td");
        if (editandoId === p.id) {
            const btnSalvar = document.createElement("button");
            btnSalvar.textContent = "Salvar";
            btnSalvar.onclick = () => salvarEdicao(p.id);

            const btnCancelar = document.createElement("button");
            btnCancelar.textContent = "Cancelar";
            btnCancelar.onclick = cancelarEdicao;

            tdAcoes.appendChild(btnSalvar);
            tdAcoes.appendChild(btnCancelar);
        } else {
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.onclick = () => editarProduto(p.id);

            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.onclick = () => removerProduto(p.id);

            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnRemover);
        }
        tr.appendChild(tdAcoes);

        tabelaProdutos.appendChild(tr);
    });
}

// ============================
// Eventos
// ============================
formEstoque.addEventListener("submit", adicionarProduto);

// Renderização inicial
renderizarTabela();
