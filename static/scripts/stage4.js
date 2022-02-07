var list = document.getElementById('list')
var base, base1, randomized, dragging, draggedOver;

const genRandom = (array) => {
    base = array.slice()
    base1 = [base[1], base[0]]
    base1.push.apply(base1, array.slice(2));
    randomized = array.slice()
    renderItems(randomized)

    $('#txt').val(array.slice().join("*"))
}

const renderItems = (data) =>{
    list.innerText = ''
    data.forEach(item => {
        var node = document.createElement("li");    
        node.draggable = true
        node.addEventListener('drag', setDragging) 
        node.addEventListener('dragover', setDraggedOver)
        node.addEventListener('drop', compare)
        node.innerText = item
        list.appendChild(node)
    })
}

const compare = (e) =>{
    $('.wrong').removeClass('wrong')

    var index1 = randomized.indexOf(dragging);
    var index2 = randomized.indexOf(draggedOver);
    randomized.splice(index1, 1)
    randomized.splice(index2, 0, dragging)

    console.log(randomized)
    renderItems(randomized)

    var txt = randomized.join("*");
    txt = 'Start infinite loop of all the steps below*' + txt;
    txt = txt + '*Else, if light value is ok: carry out step below*Drive straight'

    $('#txt').val(txt)
};


const setDraggedOver = (e) => {
    e.preventDefault();
    draggedOver = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
}

const setDragging = (e) => {
    dragging = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
}

$(function() {
    genRandom([
        'If light value is low then: carry out step below', 
        'Motor A speed increase',
        'Motor C speed increase',
        'Input light sensor data',
        'If light value is high then: carry out step below'
    ])
});