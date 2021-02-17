async function reqCampeoes() {
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/champion.json`).then(async res => {
        return await res.json()
    })

    return req.data
}

async function renderizaCampeoes() {
    const campeoes = await reqCampeoes()

    const main = document.querySelector("main")
    
    for (campeao in campeoes) {
        const parametro = campeao

        const card = document.createElement("div")
        card.className = "card"

        card.onclick = () => {
            window.location.href = `campeao.html?nome=${parametro}`
        }

        const bgImage = document.createElement("div")
        bgImage.className = "bgImage"
        bgImage.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/${campeoes[campeao]["image"]["full"]})`

        const nome = document.createElement("h2")
        nome.textContent = `${campeoes[campeao]["name"]}`

        const titulo = document.createElement("p")
        titulo.textContent = `${campeoes[campeao]["title"]}`
        
        card.append(bgImage)
        card.append(nome)
        card.append(titulo)
        
        main.append(card)
    }
}

function procuraCampeoes(elemento) {
    const cards = document.querySelectorAll(".card")

    setTimeout(function() {

        if (elemento.value.length != 0) {
            cards.forEach(card => {
                let nome = card.querySelector("h2").textContent.toLowerCase()
                if (!nome.startsWith(elemento.value)) {
                    card.style.display = "none"
                } else if(nome.startsWith(elemento.value) && card.style.display == "none") {
                    card.removeAttribute("style")
                }
                
            })
        }  else if (elemento.value == 0) {
            cards.forEach(card => {
                card.removeAttribute("style")
            })
        }
    }, 100)
}

renderizaCampeoes()
