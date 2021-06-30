function addString(element){
  //console.log(element.parentNode.parentNode.parentNode.tagName)
  let {name, value} = getElementInfo(element);
  let table = document.getElementById('headerTable'); // id of table
  //console.log(tab.rows.length);
  let row = document.createElement("TR") // create row
  let sumRow = document.querySelectorAll('.header')[2];
  sumRow.insertAdjacentElement('beforeBegin', row)
  // table.appendChild(row)

  let columnCount = table.rows[2].cells.length;

  for (let i = 0; i < columnCount; i++) {
    let td = document.createElement("TD");
    td.setAttribute("style", "vertical-align:midle")
    if (i == 1) td.appendChild(document.createTextNode(name[0].toUpperCase()+name.slice(1)));
    if (i == 2) td.appendChild(document.createTextNode(value));
    if (i == 3) {
      if(name.indexOf('реклоузеры') < 0 && name.indexOf('пункты') < 0 && name.indexOf('средства') < 0) {
        let input = document.createElement('INPUT');
        input.setAttribute('name', 'capacity');
        input.setAttribute('min', '0');
        input.setAttribute('type', 'Number');
        input.setAttribute('step', '0.01');
        input.setAttribute('placeholder','...');
        td.appendChild(input);
      }
    }
    if (i == 4) {
      if(name.indexOf('линии') < 0) {
        let input = document.createElement('INPUT');
        input.setAttribute('name', 'quantity');
        input.setAttribute('min', '0');
        input.setAttribute('type', 'Number')
        input.setAttribute('placeholder','...')
        td.appendChild(input);
      }
    }
    if (i == columnCount - 1) {
      let a = document.createElement("SPAN");
      a.setAttribute("href", "#");
      a.setAttribute("class", "eraser");
      a.setAttribute("onclick", "remove(this)");
      td.appendChild(a);
    }
    row.appendChild(td)
  }
}

function remove(el) {
  var element = el;
  element.parentNode.parentNode.remove();
}

function getElementInfo(element) {
  const iter = (node, acc) => {
    if (node.id == 'cssmenu') return acc;
    // console.log(`${node.tagName} ${node.getAttribute('innerText')}`)
    if (node.tagName == 'LI') {
      acc.name = `${node.getAttribute('innerText')} ${acc.name}`
    }
    return iter(node.parentNode, acc)
  }
  return iter(element.parentNode, {name: element.getAttribute("innerText") , value: element.getAttribute("value") })
}
