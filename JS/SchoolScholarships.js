getscholarship()
    .catch(error => {
        console.error(error);
    })

async function getscholarship() {
    const schlist = await fetch('https://yp-test-2.herokuapp.com/api/scholarship/active/?page=1')
    const resp = await schlist.json()

    for (var i = 0; i < resp.results.length; i++) {

        var main = document.getElementById('maincontainer')
        main.setAttribute("class", "row col l10 m9")

        var subcont = document.createElement('div')
        subcont.setAttribute("class", "col s12 m12 l4")
        main.appendChild(subcont)

        var card = document.createElement('div')
        card.setAttribute("class", "card")
        subcont.appendChild(card)

        var cardcontent = document.createElement('div')
        cardcontent.setAttribute("class", "card-content")
        card.appendChild(cardcontent)

        var title = document.createElement('span')
        title.setAttribute("class", "card-title black-text cardtitle truncate")
        title.setAttribute("style", "padding-bottom: 1.5vmin; margin-bottom: 2.7vmin; border-bottom: 0.2vmin solid rgb(226, 226, 226); line-height: 3.7vmin; font-size: 3vmin")
        title.innerHTML = resp.results[i].title
        cardcontent.appendChild(title)

        var content = document.createElement('div')
        content.setAttribute("class", "row")
        cardcontent.appendChild(content)

        var image = document.createElement('img')
        image.setAttribute("class", "col s4 m4 l4 offset-m4 offset-s4")
        image.src = resp.results[i].img
        content.appendChild(image)

        if (resp.results[i].image == null) {
            image.style.display = "none"
        }

        var award = document.createElement('p')
        award.setAttribute("class", "cardaward")
        award.innerHTML = `Amount: ${resp.results[i].award}`
        content.appendChild(award)

        if(resp.results[i].award == null){
            award.innerHTML = "Amount: Information not available"
            content.appendChild(award)
        }

        var updated = document.createElement('p')
        updated.setAttribute("class", "truncate updated")
        updated.innerHTML = `Updated on : ${resp.results[i].updated_on}`
        cardcontent.appendChild(updated)

        if(resp.results[i].updated_on == null) {
            updated.innerHTML = "Updated on : Information not available"
            content.appendChild(updated)
        }

        var br = document.createElement('br')
        cardcontent.appendChild(br)

        var deadline = document.createElement('p')
        deadline.setAttribute("class", "truncate deadline")
        deadline.innerHTML = `Deadline : ${resp.results[i].deadline}`
        cardcontent.appendChild(deadline)

        if(resp.results[i].deadline == null) {
            deadline.innerHTML = "Deadline : Information not available"
            content.appendChild(deadline)
        }

        var action = document.createElement('div')
        action.setAttribute("class", "card-action")
        card.appendChild(action)

        var details = document.createElement('a')
        details.href = "aboutscholarship.html"
        details.innerHTML = "View Details"
        action.appendChild(details)
    }
}