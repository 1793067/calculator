function toCount() {
  let table = document.getElementById("headerTable"),
      rows = table.rows,
      form = document.forms[0],
      Pmax = +form.Pmax.value,
      reliability = +form.reliability.value;

      console.log(reliability)

  let obj = [
    { check: (cols) => ~cols[1]?.innerText.indexOf('Реклоузеры') || ~cols[1]?.innerText.indexOf('пункты') || ~cols[1]?.innerText.indexOf('учета'),
      parameters: (cols) => ({price:+cols[2]?.textContent, capacity:null, count:+cols[4]?.querySelector('input').value}),
      operation: function(cols, price, capacity, count, Psum) {let rest = cols[5].innerHTML.match(/<.*>/); let value = (price * count).toFixed(5); cols[5].innerHTML = value + rest; return +value} },

    { check: (cols) => ~cols[1]?.innerText.indexOf('линии'),
      parameters: (cols) => ({price:+cols[2]?.textContent, capacity:+cols[3]?.querySelector('input').value, count:null}),
      operation: function(cols, price, capacity, count, Psum) {let rest = cols[5].innerHTML.match(/<.*>/); let value = cols[5].innerHTML = (price * capacity).toFixed(5); cols[5].innerHTML = value + rest; return +value} },

    { check: (cols) => ~cols[1]?.innerText.indexOf('подстанции'),
      parameters: (cols) => ({price:+cols[2]?.textContent, capacity:+cols[3]?.querySelector('input').value, count:+cols[4]?.querySelector('input').value}),
      operation: function(cols, price, capacity, count, Psum) {let rest = cols[5].innerHTML.match(/<.*>/); let value = ((reliability < 3 ? 2 : 1) * Pmax/Psum * price * capacity * count).toFixed(5); cols[5].innerHTML = value + rest; return +value} },
  ];

  function scan(rows, fn) {
    for (let i = 2; i < rows.length; i++) { // перебираем все строки
      let cols = rows[i].querySelectorAll('td'); // получаем столбцы
      fn(cols);
    }
  };

  let Psum = 0;
  scan(rows, (cols) => {
    if(~cols[1]?.innerText.indexOf('подстанции')) {
      let {count, capacity} = obj.find(elem => elem.check(cols)).parameters(cols)
      Psum += count * capacity;
    };
  });

  // console.log(Psum);
  let sum = 0;
  scan(rows, (cols) => {
    let prop = obj.find(elem => elem.check(cols));
    if (prop) {
      let {price, capacity, count} = prop.parameters(cols);
      // console.log(`
      //   Pmax: ${Pmax}
      //   Psum: ${Psum}
      //   price: ${price}
      //   capacity: ${capacity}
      //   count: ${count}
      //   `);
        sum += prop.operation(cols, price, capacity, count, Psum);
        cols[0].innerHTML = ("2."+i+'.') + cols[5].innerHTML.match(/<.*>/);
        i++;
    }
  }, i=1)

  let sumRow = table.querySelectorAll('.header');

  let paper = sumRow[0].querySelectorAll('td')[5];
  let build = sumRow[1].querySelectorAll('td')[5];
  let upsidePrice = sumRow[2].querySelector('input');
  let result = sumRow[sumRow.length - 1].querySelectorAll('td')[1];

  build.innerHTML = (sum + build.innerHTML.match(/<.*>/)).toFixed(5);

  result.innerHTML = (sum + +paper.innerHTML + result.innerHTML.match(/<.*>/) + (+upsidePrice?.value || 0)).toFixed(5);

}
