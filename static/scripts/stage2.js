function code1() {
    if($('#code1').val() === '') {
        $('#txt1').text('___');
    } else {
        $('#txt1').text($('#code1').val());
    }
}

function code2() {
    if(typeof $('input[name=code2]:checked', '#code2').val() === "undefined") {
        $('#txt2').text('___');
    } else {
        $('#txt2').text($('input[name=code2]:checked', '#code2').val());
    }
}

function changeLink() {
    l1 = $('#txt1').text();
    l2 = $('#txt2').text();
    $('#link').val(l1 + '-' + l2);
}

$(function() {
    code1();
    code2();
    changeLink();
});

$('#code1').on("input", function() {
    code1();
    changeLink();
})

$('#code2').change(function(){
    code2();
    changeLink();
})

