var url = 'https://yp-test-2-new.herokuapp.com/api/scholarship/active/?'
var scholarships;
var page = 1

getscholar(url)
    .catch(error => {
        console.log(error)
    })

async function getscholar(url, page = 1) {
    url += `page=${page}`
    const schlist = await fetch(url)
    const resp = await schlist.json()
    console.log(resp)
    scholarships = {
        ...resp
    }
    createCard(scholarships)
    createPagination(scholarships.count)
}


async function getfields(url) {
    var filterFields = 'https://yp-test-2-new.herokuapp.com/api/scholarship/filterFields/'
    var fields = await fetch(filterFields)
    var b = await fields.json()
    var state = document.getElementById('state')
    for (var i = 0; i < b['state'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['state'][i].name
        state.appendChild(option)
    }
    var category = document.getElementById('category')
    for (var i = 0; i < b['category'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['category'][i].name
        category.appendChild(option)
    }
    var gender = document.getElementById('gender')
    for (var i = 0; i < b['gender'].length; i++) {
        var option = document.createElement('option')
        option.innerHTML = b['gender'][i].name
        gender.appendChild(option)
    }

}

getfields()

var form = document.getElementById("filterForm");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1
    url = "https://yp-test-2-new.herokuapp.com/api/scholarship/filter/?"
    var filterVal = {
        state: document.getElementById('state').value,
        category: document.getElementById('category').value,
        gender: document.getElementById('gender').value,
    }
    for (const property in filterVal) {
        if (filterVal[property] == '') {
            continue
        }

        url += `${property}=${filterVal[property]}&`

    }

    getscholar(url).catch(error => {
        console.log(error)
    })

});




function createCard(resp) {
    var cont = document.getElementById('card-container')
    cont.innerHTML = ''
    for (var i = 0; i <= resp.results.length - 1; i++) {
        var card = document.createElement('div')
        card.classList.add("card");
        var title = document.createElement('p')
        title.innerHTML = resp.results[i].title
        card.appendChild(title)
        var award = document.createElement('p')
        award.innerHTML = resp.results[i].award
        card.appendChild(award)
        var update = document.createElement('p')
        update.innerHTML = `Updated on :${resp.results[i].updated_on}`
        card.appendChild(update)
        var deadline = document.createElement('p')
        deadline.innerHTML = `Deadline :${resp.results[i].deadline}`
        card.appendChild(deadline)
        cont.appendChild(card)
    }
}

function createPagination(count) {
    var totalPages = Math.ceil(count / 5)
    console.log(totalPages)
    var pageCont = document.getElementById('pagination')
    pageCont.innerHTML = ''
    if (totalPages > 0) {
        for (var i = 1; i <= totalPages; i++) {
            btn = document.createElement('button')
            btn.innerHTML = `${i}`
            btn.setAttribute('class', 'pageBtn')
            pageCont.appendChild(btn)
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
    url = "https://yp-test-2-new.herokuapp.com/api/scholarship/search/?"
    var filterVal = {
        q: document.getElementById('search-elem').value,
    }
    for (const property in filterVal) {
        if (filterVal[property] == '') {
            continue
        }

        url += `${property}=${filterVal[property]}&`

    }

    getscholar(url).catch(error => {
        console.log(error)
    })

});