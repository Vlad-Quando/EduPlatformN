let isClearing = false;

function searchText() {
    document.getElementById("body").style.backgroundColor = "rgba(73, 90, 122, 0.826)";
    document.getElementById("form").style.filter = "blur(10px)";
    document.getElementById("search-window").style.display = "block";

    options = document.querySelector(".text-list");
    options.innerHTML = "";
    allTexts.forEach(element => {
        let div = document.createElement('div');
        div.className = "search-option";
        div.setAttribute("onclick", "selectSearch(event)");

        let p = document.createElement('p');
        p.className = "option-label";
        p.innerHTML = element[0].innerHTML;

        let chbox = document.createElement('input');
        chbox.id = "searched-text";
        chbox.name = "text";
        chbox.value = element[1].value;
        chbox.type = "checkbox";
        chbox.setAttribute("onclick", "selectSearch(event)");

        div.appendChild(p);
        div.appendChild(chbox);

        options.appendChild(div);
    });
}

function closeSearch() {
    document.getElementById("search-window").style.display = "none";
    document.getElementById("body").style.backgroundColor = "rgba(45, 80, 144, 0.826)";
    document.getElementById("form").style.filter = "none";
    document.getElementById("search-field").value = "";
}

function clearSearchField() {
    isClearing = true;
    document.getElementById("search-field").value = "";

    options = document.querySelector(".text-list");
    options.innerHTML = "";
    allTexts.forEach(element => {
        let div = document.createElement('div');
        div.className = "search-option";
        div.setAttribute("onclick", "selectSearch(event)");

        let p = document.createElement('p');
        p.className = "option-label";
        p.innerHTML = element[0].innerHTML;

        let chbox = document.createElement('input');
        chbox.id = "searched-text";
        chbox.name = "text";
        chbox.value = element[1].value;
        chbox.type = "checkbox";
        chbox.setAttribute("onclick", "selectSearch(event)");

        div.appendChild(p);
        div.appendChild(chbox);

        options.appendChild(div);
    });
    isClearing = false;
}

function selectSearch(event) {
    let chbox;
    let textOptions = document.querySelectorAll(".text-option");
    if (event.target.tagName == "INPUT") {
        chbox = event.target;
        textSelected = document.getElementById("text-selected");
        if(chbox.checked) {
            for(let i = 0; i < textOptions.length; i++) {
                if(textOptions[i].value !== chbox.value) {
                    textOptions[i].checked = false;
                } else {
                    textOptions[i].checked = true;
                    textSelected.innerHTML = chbox.value;
                }
            }
        } else {
            for(let i = 0; i < textOptions.length; i++) {
                textOptions[i].checked = false;
            }
            textOptions[0].checked = true;
            textSelected.innerHTML = textOptions[0].value;
        }
        checkAllSelected();
    } else {
        chbox = event.target.querySelector('input[type="checkbox"]');
        textSelected = document.getElementById("text-selected");
        if (chbox.checked) {
            chbox.checked = false;
            textSelected.innerHTML = textOptions[0].value;
        } else {
            chbox.checked = true;
            textSelected.innerHTML = chbox.value;
        }
    }

    for(let i = 0; i < textOptions.length; i++) {
        if (textSelected.innerHTML === textOptions[i].value) {
            textOptions[i].checked = true;
        }
        else {
            textOptions[i].checked = false;
        }
    }
    
    let options = document.querySelectorAll("#searched-text");
    if (chbox.checked) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value != chbox.value) {
                options[i].checked = false;
            }
        }
    }
}

function levensheinLength(str1, str2) {
    let sToReturn = str2;
    let n = str1.length;
    let m = str2.length;
    if (n > m) {
        s1 = str1;
        str1 = str2;
        str2 = s1;
        sToReturn = str1;

        interm_n = n;
        n = m;
        m = interm_n;
    }

    currentRow = [...Array(n + 1).keys()];
    for (let i = 1; i < m + 1; i++) {
        let previousRow = currentRow;
        currentRow = [i].concat([...Array(n).fill(0)]);
        // console.log(currentRow);
        for (let j = 1; j < n + 1; j++) {
            let add_var = previousRow[j] + 1;
            let delete_var = currentRow[j - 1] + 1;
            let change_var = previousRow[j - 1];

            if (str1[j - 1] !== str2[i - 1]) {
                change_var += 3;
            }
            currentRow[j] = Math.min(add_var, delete_var, change_var);
        }
    }
    return [currentRow[n], sToReturn];
}

function handleSearch(field) {
    if (!isClearing) {
        
        let options = document.querySelectorAll(".text-option");
        let levLengthsOptions = Array();
        let includeOptions = Array();
        for (let i = 0; i < options.length; i++) {
            let res = levensheinLength(field.value.trim().toLowerCase(), options[i].value.toLowerCase());
            levLengthsOptions.push(res);

            if (options[i].value.toLowerCase().includes(field.value.trim().toLowerCase())) {
                includeOptions.push([0, options[i].value]);
            }
        }

        levLengthsOptions.sort((a, b) => a[0] - b[0]);
        let resultOptions = includeOptions.concat(levLengthsOptions.slice(0, 4));
        resultOptions = resultOptions.map((item) => item[1]);
        resultOptions = resultOptions.map((item) => {
            let newItem = item[0].toUpperCase() + item.slice(1);
            return newItem;
        });
        let uniqResOptions = [...new Set(resultOptions)];

        options = document.querySelector(".text-list");
        options.innerHTML = "";
        uniqResOptions.forEach(element => {
            let div = document.createElement('div');
            div.className = "search-option";
            div.setAttribute("onclick", "selectSearch(event)");

            let p = document.createElement('p');
            p.className = "option-label";
            p.innerHTML = element;

            let chbox = document.createElement('input');
            chbox.id = "searched-text";
            chbox.name = "text";
            chbox.value = element[1];
            chbox.type = "checkbox";
            chbox.setAttribute("onclick", "selectSearch(event)");

            div.appendChild(p);
            div.appendChild(chbox);

            options.appendChild(div);
        });
    }
}
