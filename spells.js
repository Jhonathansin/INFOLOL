async function reqSpells() {
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/summoner.json`).then(async res => {
        return await res.json()
    })

    return req.data
}

async function renderizaSpells() {
    const items = await reqSpells()

    const main = document.querySelector("main")
    
    for (item in items) {
        const parametro = item

        const card = document.createElement("div")
        card.className = "card"

        card.onclick = () => {
            window.location.href = `spell.html?spell=${parametro}`
        }

        const image = items[item]["image"]["full"]

        console.log(image)

        const bgImage = document.createElement("div")
        bgImage.className = "bgImage"
        bgImage.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${image})`

        const nome = document.createElement("h2")
        nome.textContent = `${items[item]["name"]}`
        
        card.append(bgImage)
        card.append(nome)
        
        main.append(card)
    }
}

function procuraSpells(elemento) {
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

renderizaSpells()
