function fnExcelReport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('headerTable'); // id of table
    let rows = Array.prototype.slice.call(tab.rows);
    for(j = 0 ; j < rows.length ; j++)
    {

        if (j < 2 || j == rows.length - 1) {
          tab_text = tab_text + rows[j].innerHTML+"</tr>"
        }

        else {
          let tds = Array.prototype.slice.call(rows[j].querySelectorAll('td'));
          tab_text = tab_text + tds.map(td => `<td>${td.querySelector('input')?.value || td.innerHTML}</td>`).join('') + "</tr>"
        }

        tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    //tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    //tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"Count.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
};
