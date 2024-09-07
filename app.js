function pesquisar(palavraPesquisada = null) {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");
    // Verifica se uma palavra foi passada como parâmetro
    if (palavraPesquisada) {
        campoPesquisa = palavraPesquisada.toLowerCase();
    } else {
        // Obtém a palavra do campo de pesquisa como antes
        campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();
    }
    // se campoPesquisa for uma string sem nada
    if (!campoPesquisa) {
        section.innerHTML = "<p>Você precisa digitar alguns ingredientes</p>"
        return 
    }

    // Transforma o campoPesquisa todo em letras minusculas, para não ter problemas com a pesquisa
    campoPesquisa = campoPesquisa.toLowerCase();

    // Divide as palavras, para que se possa pesquisar pelos ingredientes que quiser ao mesmo tempo
    const separadores = /[,; /]/g;
    const palavrasChave = campoPesquisa.toLowerCase().split(separadores);

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = ``;
    let titulo = ``; 
    let tempo = ``;
    let ingredientes = ``;
    let tags = ``;
    let porcao = ``

    /// Itera sobre cada dado da lista de dados
    for (let dado of dados) {
    let todasAsPalavrasEncontradas = true;

    // Verifica se todas as palavras-chave estão presentes
    for (const palavra of palavrasChave) {
        if (!dado.titulo.toLowerCase().includes(palavra) &&
        !dado.ingredientes.toLowerCase().includes(palavra) &&
        !dado.tags.toLowerCase().includes(palavra)) {
            todasAsPalavrasEncontradas = false;
            break;
        }
    }

    if (todasAsPalavrasEncontradas) {
        // Adiciona o resultado aos resultados
        resultados += 
        `<div class="item-resultado">
            <a href="${dado.link}" target="_blank">
                <img src="${dado.imagem}">
            </a>
            <h2>${dado.titulo}</h2>
            <ul class="ingredientes-meta"> ${dado.ingredientes.split(',').map(ingrediente =>
                `<li>${ingrediente.trim()}</li>`).join('')}
            </ul>
            <p class="tempo-meta">Tempo médio de preparo: ${dado.tempo} ----- Porções: ${dado.porcao}</p>
            <a href=${dado.link} target="_blank">Modo de preparo</a>
        </div>`;
        }
    }

    // se campoPesquisa não for encontrado em dados
    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>"
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}