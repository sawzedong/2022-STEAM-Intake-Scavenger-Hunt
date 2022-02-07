var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  changeLink()
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  changeLink()
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
        code1b();
        code2b();
        changeLink()
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


function code1a() {
    if($('#code1a').val() === '') {
        $('#txt1a').text('___');
    } else {
        $('#txt1a').text($('#code1a').val());
    }
}

function code1b() {
    if($('#code1b').val() === '') {
        $('#txt1b').text('_');
    } else {
        $('#txt1b').text($('#code1b').val());
    }
}

function code2a() {
    if($('#code2a').val() === '') {
        $('#txt2a').text('___');
    } else {
        $('#txt2a').text($('#code2a').val());
    }
}

function code2b() {
    if($('#code2b').val() === '') {
        $('#txt2b').text('_');
    } else {
        $('#txt2b').text($('#code2b').val());
    }
}

function changeLink() {
    var l1 = $('#txt1a').text() + $('#txt1b').text();
    var l2 = $('#txt2a').text() + $('#txt2b').text();
    $('#link').val(l1 + '-' + l2);
}

$(function() {
    code1a();
    code1b();
    code2a();
    code2b();
    changeLink();
});

$('#code1a').on("input", function() {
    code1a();
    changeLink();
})

$('#code1b').on("change", function() {
    code1b();
    changeLink();
})

$('#code2a').on("input", function(){
    code2a();
    changeLink();
})

$('#code2b').on("change", function() {
    code2b();
    changeLink();
})

