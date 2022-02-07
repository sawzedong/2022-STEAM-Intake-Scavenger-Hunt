$(':checkbox').change(function() {
    $('.q1wrong').removeClass('q1wrong')
})

checked = []
function render() {
    for(var i = 0; i < 9; i++) {
        if(checked[i]) {
            $('#'+i.toString()).addClass('clicked')
        } else {
            $('#'+i.toString()).removeClass('clicked')
        }
    }
}
function handleInput() {
    txt = ''
    for(var i = 0; i < 9; i++) {
        if(checked[i]) {
            txt += '1'
        } else {
            txt += '0'
        }
    }
    $('#q2txt').val(txt);
}
$(function() {
    for(var i = 0; i < 9; i++) {
        checked.push(false)
    }
    render();
    handleInput();
})

$('td').on("click", function(event) {
    $('.q2wrong').removeClass('q2wrong')
    k = event.currentTarget.id;
    console.log(k)
    checked[parseInt(k)] = !checked[parseInt(k)];
    console.log(checked[parseInt(k)])
    render();
    handleInput();
})