document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});


document.addEventListener('DOMContentLoaded', function() {
    var collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {
        accordion: false
    });
});