document.body.onload = function() {
    let url = new URL(window.location.href)
    let param = url.searchParams.get("voltar")

    if (param != null) {
        const voltar = document.querySelector("#voltar")
        voltar.href = `item.html?id=${param}`
    }
}

function retornaParam(nome) {
    let url = new URL(window.location.href)
    let param = url.searchParams.get(nome)

    return param
}

async function reqItem(id = "") {
    let nome = ""
    if (id == "") {
        nome = retornaParam("id")
    } else {
        nome = id
    }
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/item.json`).then(async res => {
        return await res.json()
    })

    return req.data[nome]
}

async function mostraInformacoes() {
    const main = document.querySelector("main")

    const infoItem = await reqItem()

    // console.log(infoCampeao)

    const nome = document.createElement("div")
    nome.className = "nome"


    const titulo = document.createElement("h2")
    titulo.textContent = infoItem["name"]

    const imagem = document.createElement("div")
    imagem.className = "imageItem"
    imagem.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${infoItem["image"]["full"]})`

    nome.append(titulo)
    nome.append(imagem)

    const stats = document.createElement("div")
    stats.className = "stats"

    const statsTitle = document.createElement("h3")
    statsTitle.textContent = "Stats"

    const statsText = document.createElement("p")
    statsText.innerHTML = infoItem["description"]

    stats.append(statsTitle)
    stats.append(statsText)

    const receita = document.createElement("div")
    receita.className = "receita"

    const receitaText = document.createElement("h3")
    receitaText.textContent = "Receita"

    receita.append(receitaText)

    const receitaContainer = document.createElement("div")

    const compra = document.createElement("p")
    compra.innerHTML = `<strong>Compra: </strong>${infoItem["gold"]["base"]}`

    const venda = document.createElement("p")
    venda.innerHTML = `<strong>Venda: </strong>${infoItem["gold"]["sell"]}`

    receitaContainer.append(compra)
    receitaContainer.append(venda)

    receita.append(receitaContainer)

    const descricao = document.createElement("div")
    descricao.className = "descricao"

    const descricaoTitle = document.createElement("h3")
    descricaoTitle.textContent = "Descrição"

    descricao.append(descricaoTitle)

    const descricaoText = document.createElement("p")
    descricaoText.textContent = infoItem["plaintext"] != "" ? infoItem["plaintext"] : "Não Possui"

    descricao.append(descricaoText)

    const constroi = document.createElement("div")
    constroi.className = "constroi"

    const constroiTitle = document.createElement("h3")
    constroiTitle.textContent = "Constrói Item"

    constroi.append(constroiTitle)

    const constroiContainer = document.createElement("div")
    constroiContainer.className = "constroiContainer"

    const idVoltar = infoItem["image"]["full"].split(".")[0]

    for (item in infoItem["into"]) {
        const itemReq = await reqItem(infoItem["into"][item])

        const itemContainer = document.createElement("div")
        itemContainer.className = "itemContainer"

        const id = infoItem["into"][item]

        itemContainer.onclick = function() {
            window.location.href = `item.html?id=${id}&voltar=${idVoltar}`
        }

        const itemImage = document.createElement("div")
        itemImage.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${itemReq["image"]["full"]})`

        itemContainer.append(itemImage)

        const itemTitle = document.createElement("h4")
        itemTitle.textContent = itemReq["name"]

        itemContainer.append(itemTitle)

        constroiContainer.append(itemContainer)
    }

    if (infoItem["into"] == undefined) {
        const mensagem = document.createElement("p")
        mensagem.textContent = "Não possui"

        constroiContainer.append(mensagem)
    }

    constroi.append(constroiContainer)

    const receitaItem = document.createElement("div")
    receitaItem.className = "receitaItem"

    console.log(receitaItem)

    const receitaItemTitle = document.createElement("h3")
    receitaItemTitle.textContent = "Receita Item"

    receitaItem.append(receitaItemTitle)

    const receitaItemContainer = document.createElement("div")
    receitaItemContainer.className = "receitaitemContainer"

    for (item in infoItem["from"]) {
        const itemReq = await reqItem(infoItem["from"][item])

        console.log(itemReq)

        const itemContainer = document.createElement("div")
        itemContainer.className = "itemContainer"

        const id = infoItem["from"][item]

        itemContainer.onclick = function() {
            window.location.href = `item.html?id=${id}&voltar=${idVoltar}`
        }

        const itemImage = document.createElement("div")
        itemImage.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${itemReq["image"]["full"]})`

        itemContainer.append(itemImage)

        const itemTitle = document.createElement("h4")
        itemTitle.textContent = itemReq["name"]

        itemContainer.append(itemTitle)

        receitaItemContainer.append(itemContainer)
    }

    if (infoItem["from"] == undefined) {
        const mensagem = document.createElement("p")
        mensagem.textContent = "Não possui"

        receitaItemContainer.append(mensagem)
    }

    receitaItem.append(receitaItemContainer)

    main.append(nome)
    main.append(stats)
    main.append(receita)
    main.append(descricao)
    main.append(constroi)
    main.append(receitaItem)
}

mostraInformacoes() 
