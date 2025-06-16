const prompt = require('prompt-sync')()

// Exercício 1 - Verifica se uma data é válida
function exercicio1() {
    function ehAnoBissexto(ano) {
        return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)
    }

    function ehDataValida(dia, mes, ano) {
        const diasPorMes = [31, ehAnoBissexto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        return mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasPorMes[mes - 1]
    }

    let dia = Number(prompt('Digite o dia: '))
    let mes = Number(prompt('Digite o mês: '))
    let ano = Number(prompt('Digite o ano: '))

    if (ehDataValida(dia, mes, ano)) {
        console.log('A data é válida.')
    } else {
        console.log('Data inválida.')
    }
}

// Exercício 2 - Jogo de Adivinhação
function exercicio2() {
    const numeroSecreto = Math.floor(Math.random() * 100) + 1
    let tentativa, tentativas = 0

    console.log('Tente adivinhar o número entre 1 e 100!')

    do {
        tentativa = Number(prompt('Seu palpite: '))
        tentativas++

        if (tentativa < numeroSecreto) {
            console.log('Mais alto...')
        } else if (tentativa > numeroSecreto) {
            console.log('Mais baixo...')
        } else {
            console.log(`Parabéns! Você acertou em ${tentativas} tentativas.`)
        }
    } while (tentativa !== numeroSecreto)
}

// Exercício 3 - Palavras únicas de uma frase
function exercicio3() {
    let frase = prompt('Digite uma frase: ')
    let palavras = frase.toLowerCase().split(' ')
    let unicas = []

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i]
        if (palavras.indexOf(palavra) === palavras.lastIndexOf(palavra)) {
            unicas.push(palavra)
        }
    }

    console.log('Palavras únicas:', unicas)
}

// Exercício 4 - Fatorial Recursivo
function exercicio4() {
    function fatorial(n) {
        if (n < 0) throw new Error('Número negativo não possui fatorial!')
        if (n === 0) return 1
        return n * fatorial(n - 1)
    }

    let numero = Number(prompt('Digite um número: '))
    try {
        console.log(`Fatorial de ${numero} é: ${fatorial(numero)}`)
    } catch (erro) {
        console.log('Erro:', erro.message)
    }
}

// Exercício 5 - Função debounce
function exercicio5() {
    function debounce(fn, delay) {
        let timeout
        return function (...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => fn(...args), delay)
        }
    }

    let escrever = debounce((mensagem) => {
        console.log('Executando função:', mensagem)
    }, 2000)

    escrever(prompt('Digite algo (aguarde 2 segundos para executar): '))
}

// Exercício 6 - Função memoize
function exercicio6() {
    function memoize(fn) {
        const cache = {}
        return function (...args) {
            const chave = JSON.stringify(args)
            if (cache[chave]) {
                console.log('Resultado do cache!')
                return cache[chave]
            }
            const resultado = fn(...args)
            cache[chave] = resultado
            return resultado
        }
    }

    const soma = (a, b) => {
        console.log('Somando...')
        return a + b
    }

    const somaMemo = memoize(soma)

    console.log(somaMemo(5, 3)) // Calcula
    console.log(somaMemo(5, 3)) // Usa cache
}

// Exercício 7 - Ordenar produtos por preço
function exercicio7() {
    let produtos = [
        { nome: 'Leite', preco: 5 },
        { nome: 'Pão', preco: 3 },
        { nome: 'Café', preco: 10 }
    ]

    let nomesOrdenados = produtos
        .sort((a, b) => a.preco - b.preco)
        .map(produto => produto.nome)

    console.log('Produtos ordenados por preço:', nomesOrdenados)
}

// Exercício 8 - Somar vendas por cliente
function exercicio8() {
    let vendas = [
        { cliente: 'Ana', total: 200 },
        { cliente: 'Bruno', total: 150 },
        { cliente: 'Ana', total: 100 },
        { cliente: 'Carlos', total: 50 }
    ]

    let resultado = vendas.reduce((acc, venda) => {
        acc[venda.cliente] = (acc[venda.cliente] || 0) + venda.total
        return acc
    }, {})

    console.log('Total vendido por cliente:', resultado)
}

// Exercício 9 - Converter entre objeto e pares
function exercicio9() {
    function paresParaObjeto(pares) {
        return Object.fromEntries(pares)
    }

    function objetoParaPares(obj) {
        return Object.entries(obj)
    }

    const pares = [['nome', 'Lucas'], ['idade', 30]]
    const obj = paresParaObjeto(pares)
    const deVolta = objetoParaPares(obj)

    console.log('Objeto:', obj)
    console.log('Pares novamente:', deVolta)
}

function menuExerciciosNovos() {
    let opcao
    do {
        console.log('\n===== MENU DE EXERCÍCIOS NOVOS =====')
        console.log('1 - Verificar se a data é válida')
        console.log('2 - Jogo de adivinhação (número secreto)')
        console.log('3 - Encontrar palavras únicas na frase')
        console.log('4 - Fatorial com função recursiva')
        console.log('5 - Função debounce (atraso na execução)')
        console.log('6 - Função memoize (cache de resultados)')
        console.log('7 - Produtos ordenados por preço')
        console.log('8 - Somar vendas por cliente')
        console.log('9 - Conversão entre objeto e pares')
        console.log('0 - Sair')

        opcao = Number(prompt('Escolha um exercício: '))

        switch (opcao) {
            case 1:
                exercicio1()
                break
            case 2:
                exercicio2()
                break
            case 3:
                exercicio3()
                break
            case 4:
                exercicio4()
                break
            case 5:
                exercicio5()
                break
            case 6:
                exercicio6()
                break
            case 7:
                exercicio7()
                break
            case 8:
                exercicio8()
                break
            case 9:
                exercicio9()
                break
            case 0:
                console.log('Saindo do menu...')
                break
            default:
                console.log('Opção inválida! Tente novamente.')
        }
    } while (opcao !== 0)
}

menuExerciciosNovos()
