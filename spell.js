document.body.onload = function() {
    let url = new URL(window.location.href)
    let param = url.searchParams.get("voltar")

    if (param != null) {
        const voltar = document.querySelector("#voltar")
        voltar.href = `spell.html?id=${param}`
    }
}

function retornaParam(nome) {
    let url = new URL(window.location.href)
    let param = url.searchParams.get(nome)

    return param
}

async function reqSpell(id = "") {
    let nome = ""
    if (id == "") {
        nome = retornaParam("spell")
    } else {
        nome = id
    }
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/summoner.json`).then(async res => {
        return await res.json()
    })

    return req.data[nome]
}

async function mostraInformacoes() {
    const main = document.querySelector("main")

    const infoSpell = await reqSpell()

    // console.log(infoCampeao)

    const nome = document.createElement("div")
    nome.className = "nome"

    const image = document.createElement("div")
    image.className = "imageSpell"
    image.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${infoSpell["image"]["full"]})`

    nome.append(image)

    const nomeTitle = document.createElement("h2")
    nomeTitle.textContent = infoSpell["name"]

    nome.append(nomeTitle)

    const descricao = document.createElement("div")
    descricao.className = "descricao"

    const descricaoTitle = document.createElement("h3")
    descricaoTitle.textContent = "Descrição"

    descricao.append(descricaoTitle)

    const descricaoText = document.createElement("p")
    descricaoText.textContent = infoSpell["description"]

    descricao.append(descricaoText)

    const cooldown = document.createElement("div")
    cooldown.className = "cooldown"

    const cooldownTitle = document.createElement("h3")
    cooldownTitle.textContent = "Cooldown"
    
    cooldown.append(cooldownTitle)

    const cooldownText = document.createElement("p")
    cooldownText.textContent = `${infoSpell["cooldownBurn"]}s`

    cooldown.append(cooldownText)

    const custo = document.createElement("div")
    custo.className = "custo"

    const custoTitle = document.createElement("h3")
    custoTitle.textContent = "Custo"

    custo.append(custoTitle)

    const custoText = document.createElement("p")
    custoText.textContent = infoSpell["costType"]

    custo.append(custoText)

    const range = document.createElement("div")
    range.className = "range"

    const rangeTitle = document.createElement("h3")
    rangeTitle.textContent = "Range"

    range.append(rangeTitle)

    const rangeText = document.createElement("p")
    rangeText.textContent = infoSpell["rangeBurn"]

    range.append(rangeText)

    const summonerLevel = document.createElement("div")
    summonerLevel.className = "summonerLevel"

    const summonerLevelTitle = document.createElement("h3")
    summonerLevelTitle.textContent = "Summoner Level"

    summonerLevel.append(summonerLevelTitle)

    const summonerLevelText = document.createElement("p")
    summonerLevelText.textContent = infoSpell["summonerLevel"]

    summonerLevel.append(summonerLevelText)

    main.append(nome)
    main.append(descricao)
    main.append(cooldown)
    main.append(custo)
    main.append(range)
    main.append(summonerLevel)

    console.log(infoSpell)
}

mostraInformacoes() 
