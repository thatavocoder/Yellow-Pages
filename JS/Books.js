var url = 'https://yp-test-2-new.herokuapp.com/api/bookbanks/active/?'
var scholarships;
var page = 1
var modal = document.querySelector('.modal')
var modalTitle = document.querySelector('.modal-title')
var modalDetails = document.querySelector('.modal-body')
var displayItems = ['books', 'state', 'district', 'address', 'content', 'contact', 'site_url']

getscholar(url, page = 1)
    .catch(error => {
        console.log(error)
    })

async function getscholar(url, page = 1) {
    url += `page=${page}`
    const schlist = await fetch(url)
    const resp = await schlist.json()
    scholarships = {
        ...resp
    }
    console.log(resp);
    createCard(scholarships)
    createPagination(scholarships.count)
}

async function getfields(url) {

    var filterFields = 'https://yp-test-2-new.herokuapp.com/api/bookbanks/filterFields/'
    var fields = await fetch(filterFields)
    var b = await fields.json()

    var state = document.getElementById('states')
    for (var i = 0; i < b['state'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['state'][i].name
        state.appendChild(option)
    }
    var district = document.getElementById('districts')
    for (var i = 0; i < b['district'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['district'][i].name
        district.appendChild(option)
    }
    var books = document.getElementById('books')
    for (var i = 0; i < b['books'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['books'][i].name
        books.appendChild(option)
    }
}

getfields()

var form = document.getElementById("filterForm");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    url = "https://yp-test-2-new.herokuapp.com/api/bookbanks/filter/?"
    var filterVal = {
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        books: document.getElementById('book').value
    }
    for (const property in filterVal) {
        if (filterVal[property] == '') {
            continue
        }
        url += `${property}=${filterVal[property]}&`
    }
    console.log(url)
    getscholar(url).catch(error => {
        console.log(error)
    })
});

function createCard(resp) {

    var main = document.getElementById('maincontainer')
    main.setAttribute("class", "row col l10 m9")
    main.innerHTML = ''

    if (resp.results.length == 0) {
        main.innerHTML = 'Oops! Nothing to show!'
        main.style.textAlign = 'center'
    }
    else {
        for (var i = 0; i <= resp.results.length - 1; i++) {

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

            if (resp.results[i].award == null) {
                award.innerHTML = "Amount: Information not available"
                content.appendChild(award)
            }

            var updated = document.createElement('p')
            updated.setAttribute("class", "truncate updated")
            updated.innerHTML = `Updated on : ${resp.results[i].updated_on}`
            cardcontent.appendChild(updated)

            if (resp.results[i].updated_on == null) {
                updated.innerHTML = "Updated on : Information not available"
                content.appendChild(updated)
            }

            var br = document.createElement('br')
            cardcontent.appendChild(br)

            var deadline = document.createElement('p')
            deadline.setAttribute("class", "truncate deadline")
            deadline.innerHTML = `Deadline : ${resp.results[i].deadline}`
            cardcontent.appendChild(deadline)

            if (resp.results[i].deadline == null) {
                deadline.innerHTML = "Deadline : Information not available"
                content.appendChild(deadline)
            }

            var action = document.createElement('div')
            action.setAttribute("class", "card-action")
            card.appendChild(action)

            var details = document.createElement('a')
            details.id = resp.results[i].id
            details.setAttribute('class', 'modal-trigger')
            details.href = '#!'
            details.innerHTML = "View Details"
            action.appendChild(details)
        }
        document.querySelectorAll('.modal-trigger').forEach(item => {
            item.addEventListener('click', event => {
                modal.classList.add('modal-show')
                var scholarshipDetail
                for (var i = 0; i < resp.results.length; i++) {
                    if (item.id == resp.results[i].id) {
                        scholarshipDetail = resp.results[i]
                        break;
                    }
                }
                console.log(scholarshipDetail)
                modalTitle.innerHTML = scholarshipDetail.title
                modalDetails.innerHTML = ''
                for (var j = 0; j < displayItems.length; j++) {
                    var details = document.createElement('p')
                    var dethead = document.createElement('span')
                    dethead.style.fontWeight = 'bold'
                    dethead.innerHTML = `${displayItems[j]}: `
                    details.appendChild(dethead)
                    var deets = document.createElement('span')
                    deets.innerHTML = scholarshipDetail[displayItems[j]]
                    details.appendChild(deets)                    
                    modalDetails.appendChild(details)
                }
            })
        })
    }
}

btnClose = document.getElementById('btnClose')
btnClose.addEventListener('click', () => {
    modal.classList.remove('modal-show')
})

function createPagination(count) {
    var totalPages = Math.ceil(count / 5)
    console.log(totalPages)
    var pageCont = document.getElementById('pagination')
    pageCont.innerHTML = ''

    if (totalPages > 0) {
        for (var i = 1; i <= totalPages; i++) {
            btn = document.createElement('li')
            btn.setAttribute('class', 'waves-effect pagebtn')
            pageCont.appendChild(btn)
            var btna = document.createElement('a')
            btna.innerHTML = `${i}`
            btna.setAttribute('class', 'pageBtn')
            btn.appendChild(btna)
        }
    }
    document.querySelectorAll('.pageBtn').forEach(item => {
        item.addEventListener('click', event => {
            getscholar(url, item.innerHTML)
        })
    })
}

var search = document.getElementById("search");
search.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1
    url = "https://yp-test-2-new.herokuapp.com/api/bookbanks/search/?"
    var filterVal = {
        q: document.getElementById('search-elem').value,
    }
    for (const property in filterVal) {
        if (filterVal[property] == '') {
            url=url
        }

        url += `${property}=${filterVal[property]}&`

    }

    getscholar(url).catch(error => {
        console.log(error)
    })

});