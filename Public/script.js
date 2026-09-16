// Seleção dos elementos do DOM
const inputTarefa = document.getElementById('input-id');
const botaoAdicionar = document.querySelector('button');
const listaTarefas = document.querySelector('.to-do-list');
const pLimit = document.getElementById('limit');
const pMinimum = document.getElementById('minimum');

// Função para atualizar o placeholder dinamicamente
function atualizarPlaceholder() {
    const totalTarefas = listaTarefas.querySelectorAll('li').length;

    if (totalTarefas > 0) {
        inputTarefa.placeholder = "Digite uma nova tarefa...";
    } else {
        inputTarefa.placeholder = "Digite uma tarefa...";
    }
}

// Valida os caracteres em tempo real enquanto o usuário digita (limite de 50)
inputTarefa.addEventListener('input', () => {
    if (inputTarefa.value.length > 50) {
        pLimit.textContent = "Aviso: O limite máximo é de 50 caracteres!";
    } else {
        pLimit.textContent = ""; // Limpa se estiver dentro do limite
    }
});

// Função principal para adicionar a tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();
    const totalTarefas = listaTarefas.querySelectorAll('li').length;

    // Erro 1: Se o cara tentar clicar em adicionar puramente (vazio)
    if (textoTarefa === "") {
        pLimit.textContent = "Aviso: Adicione uma tarefa";
        return;
    }

    // Bloqueia a inserção se o usuário já tiver atingido o limite de 20 tarefas
    if (totalTarefas >= 20) {
        pMinimum.textContent = "Aviso: Você atingiu o limite máximo de 20 tarefas!";
        return;
    }

    // Impede a adição se o texto passar de 50 caracteres
    if (textoTarefa.length > 50) {
        return; 
    }

    // Cria o item da lista <li>
    const novoItem = document.createElement('li');
    
    // Cria o parágrafo <p> para o texto
    const paragrafoTexto = document.createElement('p');
    paragrafoTexto.textContent = textoTarefa;
    
    // Cria o botão X de remoção
    const botaoRemover = document.createElement('span');
    botaoRemover.className = 'remove-btn';
    botaoRemover.innerHTML = '&times;'; // Gera o caractere "×"

    // Adiciona o evento para remover a tarefa ao clicar no X
    botaoRemover.addEventListener('click', () => {
        novoItem.remove();
        
        // Verifica a quantidade atual de itens para gerenciar o aviso de 20 itens
        const tarefasRestantes = listaTarefas.querySelectorAll('li').length;
        if (tarefasRestantes < 20) {
            pMinimum.textContent = ""; 
        }
        
        atualizarPlaceholder();
    });
    
    // Une a estrutura colocando o <p> e o <span> dentro do <li>
    novoItem.appendChild(paragrafoTexto);
    novoItem.appendChild(botaoRemover);
    
    // Adiciona o item completo à sua lista <ul>
    listaTarefas.appendChild(novoItem);

    // Limpa o campo de entrada e reseta o aviso de erro/caracteres
    inputTarefa.value = "";
    pLimit.textContent = "";

    // Atualiza o placeholder baseado na nova quantidade de tarefas
    atualizarPlaceholder();

    // Se atingiu o limite máximo de 20 tarefas agora, mostra o aviso imediatamente
    if (listaTarefas.querySelectorAll('li').length === 20) {
        pMinimum.textContent = "Aviso: Você atingiu o limite máximo de 20 tarefas!";
    }
}

// Evento de clique no botão Adicionar
botaoAdicionar.addEventListener('click', (evento) => {
    evento.preventDefault();
    adicionarTarefa();
});

// Evento para permitir adicionar a tarefa pressionando a tecla 'Enter'
inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Executa a função uma vez ao carregar a página para definir o placeholder inicial
atualizarPlaceholder();
