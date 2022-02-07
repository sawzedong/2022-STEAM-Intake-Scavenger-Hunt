const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
function keydownevent(id, event) {
    $('.wrong').removeClass('wrong')
    var selectID = '#input' + id.toString()
    k = event.key
    if(k === 'Backspace' && $(selectID).val() === '' && id !== 1) {
        selectNewID = '#input' + (id-1).toString()
        $(selectNewID).focus()
        $(selectNewID).val('')
    } 

    if (allowedChars.includes(k.toUpperCase()) && $(selectID).val() !== '') {
        $(selectID).val('') 
    }
}

function keyupevent(id, event) {
    $('.wrong').removeClass('wrong')
    var selectID = '#input' + id.toString()
    k = event.key
    $(selectID).val($(selectID).val().toUpperCase());
    if (k !== 'Backspace' && allowedChars.includes(k.toUpperCase()) && id !== 5) {
        selectNewID = '#input' + (id+1).toString()
        $(selectNewID).focus()
    }
}

$('#input1').keyup(function(e) {
    keyupevent(1, e)
})
$('#input2').keyup(function(e) {
    keyupevent(2, e)
})
$('#input3').keyup(function(e) {
    keyupevent(3, e)
})
$('#input4').keyup(function(e) {
    keyupevent(4, e)
})
$('#input5').keyup(function(e) {
    keyupevent(5, e)
})

$('#input1').keydown(function(e) {
    keydownevent(1, e)
})
$('#input2').keydown(function(e) {
    keydownevent(2, e)
})
$('#input3').keydown(function(e) {
    keydownevent(3, e)
})
$('#input4').keydown(function(e) {
    keydownevent(4, e)
})
$('#input5').keydown(function(e) {
    keydownevent(5, e)
})

$('#clear').on("click", function() {
    $('.wrong').removeClass('wrong')
    $('input').val('')
})