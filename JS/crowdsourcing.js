top.visible_div_id = 'north';

function toggle_visibility(id) {
    var old_e = document.getElementById(top.visible_div_id);
    old_e.style.display = 'none';
    var new_e = document.getElementById(id);
    console.log('new', new_e, 'block');
    new_e.style.display = 'block';
    top.visible_div_id = id
}