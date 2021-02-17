function retornaParam(nome) {
    let url = new URL(window.location.href)
    let param = url.searchParams.get(nome)

    return param
}

function criarImagens(nome, numero) {
    let imagens = []
    for (let i = 0; i < numero; i++) {
        imagens.push(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nome}_${i}.jpg`)
    }

    return imagens
}

async function reqCampeao() {
    let nome = retornaParam("nome")
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/champion/${nome}.json`).then(async res => {
        return await res.json()
    })

    return req.data[nome]
}

const ImagensCampeao = {
   "imagens": [],
   "nomes": [],
   "default": "",
   "pos": 0,
   "imagemAtual": function() {
       return this.imagens[this.pos]
   },
   "nomeAtual": function() {
    return this.nomes[this.pos]
   },
   "proxima": function() {
       console.log(this.nomes)
       this.pos += 1

       if (this.imagens == [] || this.pos > this.imagens.length - 1) {
           this.pos = 0
       }
   },
   "anterior": function() {
       this.pos -= 1

       if (this.imagens == []) {
           this.pos = 0
       } else if (this.pos < 0) {
           this.pos = this.imagens.length - 1
       }
   }
}

function requisicaoImagem(elemento, obj, nomes,direcao="proxima") {

    fetch(`${obj.imagemAtual()}`).then(async res => {
        elemento.style.backgroundImage = `url(load.gif)`

        if (res.status != 200) {
            if (direcao == "proxima") {
                obj.proxima()
            } else if (direcao == "anterior") {
                obj.anterior()
            }
            requisicaoImagem(elemento, obj, nomes, direcao)
        } else {
            return await res.blob()
        }    
    }).then(myBlob => {
        if (myBlob != undefined) {
            
            let objectURL = URL.createObjectURL(myBlob)

            elemento.style.backgroundImage = `url(${objectURL})`
            console.log(obj.nomeAtual())
            console.log(obj.default)

            const nomeCampeao = document.createElement("h2")

            document.querySelector(".nome").innerHTML = ""

            if (obj.nomeAtual() == "default") {
                nomeCampeao.textContent = obj.default
                document.querySelector(".nome").append(nomeCampeao)
            } else {
                nomeCampeao.textContent = obj.nomeAtual()
                document.querySelector(".nome").append(nomeCampeao)
            }

            
        }
        
    })
}

async function mostraInformacoes() {
    const main = document.querySelector("main")

    const infoCampeao = await reqCampeao()

    // console.log(infoCampeao)
    const imagens = criarImagens(infoCampeao["id"],infoCampeao["skins"].length)

    const nome = document.createElement("div")
    nome.className = "nome"

    const nomes = []

    for (nomeSkin in infoCampeao["skins"]) {
        nomes.push(infoCampeao["skins"][nomeSkin]["name"])
    }

    const imagensCampeao = ImagensCampeao
    imagensCampeao.imagens = imagens

    imagensCampeao.nomes = nomes

    imagensCampeao.default = `${infoCampeao["id"]} ${infoCampeao["title"]}`
    
    const imagemCampeao = document.createElement("div")
    imagemCampeao.className = "imagemCampeao"
    // imagemCampeao.style.backgroundImage = 

    requisicaoImagem(imagemCampeao, imagensCampeao, nomes)

    const anterior = document.createElement("p")
    anterior.className = "anterior"
    anterior.textContent = "<"
    anterior.onclick = function() {
        imagensCampeao.anterior()
        
        requisicaoImagem(imagemCampeao, imagensCampeao, nomes, direcao="anterior")
    }

    const proximo = document.createElement("p")
    proximo.className = "proximo"
    proximo.textContent = ">"
    proximo.onclick = function() {
        imagensCampeao.proxima()
        
        requisicaoImagem(imagemCampeao, imagensCampeao, nomes, direcao="proxima")
    }

    imagemCampeao.append(anterior)
    imagemCampeao.append(proximo)

    const nomeTexto = document.createElement("h2")
    nomeTexto.textContent = infoCampeao["id"]

    const titulo = document.createElement("p")
    titulo.textContent = infoCampeao["title"]

    const container = document.createElement("div")
    container.className = "container"

    const info = document.createElement("div")
    info.id = "info"

    const infoTitle = document.createElement("h3")
    infoTitle.textContent = "Info"

    info.append(infoTitle)

    for (inf in infoCampeao.info) {
        const p = document.createElement("p")
        p.textContent = `${inf}: ${infoCampeao.info[inf]}`
        info.append(p)
    }

    const lore = document.createElement("div")
    lore.id = "lore"

    const loreTitle = document.createElement("h3")
    loreTitle.textContent = "Lore"

    lore.append(loreTitle)
    const loreText = document.createElement("p")
    loreText.textContent = `${infoCampeao["lore"]}`
    lore.append(loreText)

    const stats = document.createElement("div")
    stats.id="stats"

    const statsTitle = document.createElement("h3")
    statsTitle.textContent = "Stats"

    stats.append(statsTitle)

    for (stat in infoCampeao.stats) {
        const p = document.createElement("p")
        p.textContent = `${stat}: ${infoCampeao.stats[stat]}`
        stats.append(p)
    }

    const spells = document.createElement("div")
    spells.id = "spells"
    const spellsTitle = document.createElement("h2")
    spellsTitle.textContent = "Spells"

    spells.append(spellsTitle)

    const spellsContainer = document.createElement("div")

    spellsContainer.id = "spellsContainer"


    for (spell in infoCampeao["spells"]) {
        const spellContainer = document.createElement("div")

        const titleAtual = infoCampeao["spells"][spell]["name"]

        const descriptionAtual = `${infoCampeao["spells"][spell]["description"]}`

        spellContainer.onclick = function() {
            const descricao = document.querySelector("#description")
            const classAtual = this.className
            this.setAttribute("class", `${classAtual} spellSelected`)

            const divsSpell = document.querySelectorAll(".spellContainer")

            divsSpell.forEach(divSpell => {
                const tituloSiblings = divSpell.querySelector("p").textContent

                if (titleAtual != tituloSiblings) {
                    divSpell.className = classAtual
                }
            }) 

            descricao.innerHTML = descriptionAtual
        }

        spellContainer.className = "spellContainer"

        const foto = document.createElement("div")
        foto.className = "spellImage"

        fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${infoCampeao["spells"][spell]["image"]["full"]}`).then(async resp => {
            return await resp.blob()
        }).then(myBlob => {
            let url = URL.createObjectURL(myBlob)

            foto.style.backgroundImage = `url(${url})`
        })

        spellContainer.append(foto)

        const nomeSpell = document.createElement("p")
        nomeSpell.textContent = `${infoCampeao["spells"][spell]["name"]}`

        spellContainer.append(nomeSpell)

        spellsContainer.append(spellContainer)
    }

    spells.append(spellsContainer)

    const description = document.createElement("p")
    description.id = "description"

    spells.append(description)

    container.append(info)
    container.append(lore)
    container.append(stats)

    container.append(spells)

    nome.append(nomeTexto)
    nome.append(titulo)

    main.append(imagemCampeao)
    main.append(nome)
    main.append(container)

    console.log(infoCampeao)
}

mostraInformacoes() 
