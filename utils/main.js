import { animais } from "./dados.js";

const listaAnimais = document.getElementById("lista-animais");

// Popular a lista de animais na div #lista-animais
for (const animal of animais) {
    listaAnimais.innerHTML +=
        `<div class="animal" data-nome="${animal.nome}">
            <div class="animal-conteudo">
                <div class="imagem-holder">
                    <div class="imagem-back"></div>
                    <img src="./imagens/${animal.nome.toLowerCase()}.png" alt="${animal.nome}">
                </div>
                <div class="nome">
                    <span>${animal.nome}</span>
                </div>
            </div>
        </div>`
}

// Cria um array para guardar todos os elementos criados na div #lista-animais
const todosAnimais = listaAnimais.getElementsByClassName('animal');

// Adiciona um evento para "escutar" o evento keyup do campo de busca/filtro.
document.getElementById("input-filtrar").addEventListener("keyup", (e) => {

    // Guarda o valor do campo de busca/filtro em uam variável
    const filtro = e.target.value.toLowerCase();

    // Faz um loop em todos os animais do arquivo dados.js
    for (let i = 0; i < animais.length; i++) {
        // Guarda o nome do animal da div atual no loop
        const nomeAnimal = todosAnimais[i].getAttribute('data-nome').toLowerCase();

        // Compara se o nome do animal da div atual contém o texto digitado no campo busca/filtro
        if (!nomeAnimal.includes(filtro)) {
            // Se não tiver, altera a propriedade "display" do css da div para "none" que faz ele ser escondido.
            todosAnimais[i].style.display = 'none';
        } else {
            // Do contrário, remove o valor da propriedade "display" para que ele deixe de ser escondido.
            todosAnimais[i].style.display = '';

        }
    }
})

// O ideal seria criar um botão para cada animal mas neste caso eu preferi adicionar um evento de escuta de "click" para cada animal.
// Aqui eu faço um loop em todos eles
document.querySelectorAll(".animal").forEach(animal => {

    // Para cada div animal que encontro eu adiciono o evento de escuta "click"
    animal.addEventListener("click", (e) => {

        // E ao clicar eu incluo as seguintes funções:

        // Pego o nome do animal.
        const animalSelecionado = animais.find(a => a.nome == e.target.getAttribute('data-nome'))

        // Altero o conteúdo do span que está dentro da div .nome que por sua vez está dentro da div .modal-content para o nome do animal.
        document.querySelector(".modal-content .nome span").textContent = animalSelecionado.nome;

        // Altero o src da imagem do modal para o caminho da imagem do animal em questão.
        document.querySelector(".modal-imagem img").src = `./imagens/${animalSelecionado.nome.toLowerCase()}.png`;

        // Altero o texto da descrição do animal no modal.
        document.querySelector(".modal-content .descricao p").textContent = animalSelecionado.descrição;

        // Altero o valor do objeto "adotavel" dentro do objeto animal.
        document.querySelector(".modal-content .adotavel p").textContent = animalSelecionado.adotavel.valor;

        // Altero o motivo de ser ou não adotável.
        document.querySelector(".modal-content .adotavel-motivo p").textContent = animalSelecionado.adotavel.motivo;

        // Depois de atribuir todos os valores para as divs, altero a propriedade do modal para "block" para fazer com que ele seja mostrado.
        modal.style.display = "block";
    })
})

// Crio uma variável para guardar uma referência ao nosso modal
const modal = document.getElementById("meuModal");

// Crio uma variável para guardar uma referência ao botão fechar modal
const botaoFechar = document.getElementsByClassName("close")[0];

// Adiciono uma função ao evento click do botão fechar para que ele altere a propriedade do nosso modal para "none", fazendo ele ser escondido
botaoFechar.onclick = function () {
    modal.style.display = "none";
}

// Adiciono uma função no window para que sempre que eu clicar fora do modal ele se esconda.
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}