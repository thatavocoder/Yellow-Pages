const url = 'https://yp-test-2-new.herokuapp.com'

activeUrl = url + '/api/scholarship/active'
async function fetchActive() {
    const res = await fetch(activeUrl);
    const activeData = await res.json()
    return activeData;
}
fetchActive().then(activeData => {
    console.log(activeData)
    for (var i = 0; i < activeData.results.length; i++) {

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
        title.innerHTML = activeData.results[i].title
        cardcontent.appendChild(title)

        var content = document.createElement('div')
        content.setAttribute("class", "row")
        cardcontent.appendChild(content)

        var image = document.createElement('img')
        image.setAttribute("class", "col s4 m4 l4 offset-m4 offset-s4")
        image.src = activeData.results[i].img
        content.appendChild(image)

        if (activeData.results[i].image == null) {
            image.style.display = "none"
        }

        var award = document.createElement('p')
        award.setAttribute("class", "cardaward")
        award.innerHTML = `Amount: ${activeData.results[i].award}`
        content.appendChild(award)

        if (activeData.results[i].award == null) {
            award.innerHTML = "Amount: Information not available"
            content.appendChild(award)
        }

        var updated = document.createElement('p')
        updated.setAttribute("class", "truncate updated")
        updated.innerHTML = `Updated on : ${activeData.results[i].updated_on}`
        cardcontent.appendChild(updated)

        if (activeData.results[i].updated_on == null) {
            updated.innerHTML = "Updated on : Information not available"
            content.appendChild(updated)
        }

        var br = document.createElement('br')
        cardcontent.appendChild(br)

        var deadline = document.createElement('p')
        deadline.setAttribute("class", "truncate deadline")
        deadline.innerHTML = `Deadline : ${activeData.results[i].deadline}`
        cardcontent.appendChild(deadline)

        if (activeData.results[i].deadline == null) {
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
})

async function fetchFilterFields() {
    const filterUrl = url + '/api/scholarship/filterFields'
    const res = await fetch(filterUrl);
    const data = await res.json()
    return data;
}
fetchFilterFields().then(data => {
    console.log(data)

    if (data.state.length == 0) {
        document.getElementById('state').setAttribute("disabled", "true")
    }
    const stateDD = document.getElementById('states');
    for (var i = 0; i < data.state.length; i++) {
        var options = document.createElement('option')
        options.value = data.state[i].name
        options.innerHTML = data.state[i].name
        stateDD.appendChild(options)
    }

    if (data.category.length == 0) {
        document.getElementById('category').setAttribute("disabled", "true")
    }
    const categoryDD = document.getElementById('categories');
    for (var i = 0; i < data.category.length; i++) {
        var options = document.createElement('option')
        options.value = data.category[i].name
        options.innerHTML = data.category[i].name
        categoryDD.appendChild(options)
    }


    if (data.class.length == 0) {
        document.getElementById('class').setAttribute("disabled", "true")
    }
    const classDD = document.getElementById('classes');
    for (var i = 0; i < data.class.length; i++) {
        var options = document.createElement('option')
        options.value = data.class[i].name
        options.innerHTML = data.class[i].name
        classDD.appendChild(options)
    }


    if (data.type.length == 0) {
        document.getElementById('type').setAttribute("disabled", "true")
    }
    const typeDD = document.getElementById('types');
    for (var i = 0; i < data.type.length; i++) {
        var options = document.createElement('option')
        options.value = data.type[i].name
        options.innerHTML = data.type[i].name
        typeDD.appendChild(options)
    }


    if (data.religion.length == 0) {
        document.getElementById('religion').setAttribute("disabled", "true")
    }
    const religionDD = document.getElementById('religions');
    for (var i = 0; i < data.religion.length; i++) {
        var options = document.createElement('option')
        options.value = data.relgion[i].name
        options.innerHTML = data.religion[i].name
        religionDD.appendChild(options)
    }

    if (data.course.length == 0) {
        document.getElementById('course').setAttribute("disabled", "true")
    }
    const courseDD = document.getElementById('courses');
    for (var i = 0; i < data.course.length; i++) {
        var options = document.createElement('option')
        options.value = data.course[i].name
        options.innerHTML = data.course[i].name
        courseDD.appendChild(options)
    }

    if (data.gender.length == 0) {
        document.getElementById('gender').setAttribute("disabled", "true")
    }
    const genderDD = document.getElementById('genders');
    for (var i = 0; i < data.gender.length; i++) {
        var options = document.createElement('option')
        options.value = data.gender[i].name
        options.innerHTML = data.gender[i].name
        genderDD.appendChild(options)
    }

    const submitForm = document.addEventListener('submit', clickSubmit)
})

function clickSubmit() {
    const searchForm = document.querySelector('form');
    const state = document.getElementById('states').selectedIndex;
    const svalue = state.text
    console.log(svalue)
    const category = document.querySelector('category');
    const classes = document.querySelector('class');
    const type = document.querySelector('type');
    const religion = document.querySelector('religion');
    const course = document.querySelector('course');
    const gender = document.querySelector('gender');
}

/*

const searchForm = document.querySelector('form');
const state = document.querySelector('state');
const category = document.querySelector('category');
const sclass = document.querySelector('sclass');
const stype = document.querySelector('stype');
const religion = document.querySelector('religion');
const course = document.querySelector('course');
const gender = document.querySelector('gender');

for (var i = 0; i < activeData.results.length; i++) {

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
    title.innerHTML = activeData.results[i].title
    cardcontent.appendChild(title)

    var content = document.createElement('div')
    content.setAttribute("class", "row")
    cardcontent.appendChild(content)

    var image = document.createElement('img')
    image.setAttribute("class", "col s4 m4 l4 offset-m4 offset-s4")
    image.src = activeData.results[i].img
    content.appendChild(image)

    if (activeData.results[i].image == null) {
        image.style.display = "none"
    }

    var award = document.createElement('p')
    award.setAttribute("class", "cardaward")
    award.innerHTML = `Amount: ${activeData.results[i].award}`
    content.appendChild(award)

    if (activeData.results[i].award == null) {
        award.innerHTML = "Amount: Information not available"
        content.appendChild(award)
    }

    var updated = document.createElement('p')
    updated.setAttribute("class", "truncate updated")
    updated.innerHTML = `Updated on : ${activeData.results[i].updated_on}`
    cardcontent.appendChild(updated)

    if (activeData.results[i].updated_on == null) {
        updated.innerHTML = "Updated on : Information not available"
        content.appendChild(updated)
    }

    var br = document.createElement('br')
    cardcontent.appendChild(br)

    var deadline = document.createElement('p')
    deadline.setAttribute("class", "truncate deadline")
    deadline.innerHTML = `Deadline : ${activeData.results[i].deadline}`
    cardcontent.appendChild(deadline)

    if (activeData.results[i].deadline == null) {
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

*/