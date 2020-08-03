window.addEventListener('load', () => {

    var input = document.querySelector('#text-search');
    var buscar = document.querySelector('#search');
    var error = document.querySelector('#error');
    var infom = document.querySelector('#info');
    var random = document.querySelector('#random');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var prevResponsive = document.querySelector('#prev');
    var nextResponsive = document.querySelector('#next');

    var id_pokemon;


    function errorMessage() {
        input.value = '';
        info.style.display = 'none';
        error.style.display = 'inline';
        infom.style.display = 'none';
        prev.style.display = 'none';
        next.style.display = 'none';
        prevResponsive.style.display = 'none';
        nextResponsive.style.display = 'none';
    }
    function infoPkm() {
        input.value = '';
        error.style.display = 'none';
        infom.style.display = 'none';
    }

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'js/pokedex.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    var info = document.querySelector('.datos-pokemon');
    var name = document.querySelector('#name');
    var imgpkm = document.querySelector('#img-pkm');
    var type = document.querySelector('#type');
    var base = document.querySelector('.base');

    function handleColor(tipo) {
        if (tipo == 'Grass') {
            return '#78C850';
        } else if (tipo == 'Poison') {
            return '#A040A0';
        } else if (tipo == 'Normal') {
            return '#A8A878';
        } else if (tipo == 'Fighting') {
            return '#C03028';
        } else if (tipo == 'Flying') {
            return '#A890F0';
        } else if (tipo == 'Ground') {
            return '#E0C068';
        } else if (tipo == 'Rock') {
            return '#B8A038';
        } else if (tipo == 'Bug') {
            return '#A8B820';
        } else if (tipo == 'Ghost') {
            return '#705898';
        } else if (tipo == 'Steel') {
            return '#B8B8D0';
        } else if (tipo == 'Fire') {
            return '#F08030';
        } else if (tipo == 'Water') {
            return '#6890F0';
        } else if (tipo == 'Electric') {
            return '#F8D030';
        } else if (tipo == 'Psychic') {
            return '#F85888';
        } else if (tipo == 'Ice') {
            return '#98D8D8';
        } else if (tipo == 'Dragon') {
            return '#7038F8';
        } else if (tipo == 'Dark') {
            return '#705848';
        } else if (tipo == 'Fairy') {
            return '#EE99AC';
        }
    }

    var id_actual;
    var pokedx;
    var busqueda;

    function init(id) {

        loadJSON(function (response) {
            // Parse JSON string into object
            pokedx = JSON.parse(response);
            id_actual = buscarPkm(pokedx, id);


            if (id_actual == 1) {
                next.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual + 1);
                });
                nextResponsive.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual + 1);
                });
            } else if (id_actual == 809) {
                prev.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual - 1);
                });
                prevResponsive.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual - 1);
                });
            }
            else {
                prev.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual - 1);
                });
                next.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual + 1);  
                });
                prevResponsive.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual - 1);
                });
                nextResponsive.addEventListener('click', () => {
                    id_actual = buscarPkm(pokedx, id_actual + 1);
                });
            }

            buscar.addEventListener('click', () => {
                busqueda = input.value;

                if(busqueda == ''){
                    errorMessage();
                }else if (isNaN(busqueda)) {
                    id_actual = buscarPkm(pokedx, busqueda);
                    if(id_actual == undefined){
                        errorMessage();
                    }else{
                        infoPkm();
                    }
                } else if (parseInt(busqueda, 10) < 1 || parseInt(busqueda, 10) > 809) {
                    errorMessage();
                } else {
                    id_actual = buscarPkm(pokedx, busqueda);
                    infoPkm();
                }
            });

            input.addEventListener('keypress', (e) => {
                busqueda = input.value;
                if (e.code == 'Enter') {
                    if(busqueda == ''){
                        errorMessage();
                    }else if (isNaN(busqueda)) {
                        id_actual = buscarPkm(pokedx, busqueda);
                        if(id_actual == undefined){
                            errorMessage();
                        }else{
                            infoPkm();
                        }
                    } else if (parseInt(busqueda, 10) < 1 || parseInt(busqueda, 10) > 809) {
                        errorMessage();
                    } else {
                        id_actual = buscarPkm(pokedx, busqueda);
                        infoPkm();
                    }
                }
            });

            random.addEventListener('click', () => {
                infom.style.display = 'none';
                random_number = Math.floor(Math.random() * 809) + 1;
                id_actual = buscarPkm(pokedx, random_number);
            });

        });

    }

    function buscarPkm(pokedex, id) {
        for (var pokemon in pokedex) {
            if (pokedex[pokemon].id == id || pokedex[pokemon].name.english.toLowerCase() == id || pokedex[pokemon].name.english == id || pokedex[pokemon].name.english.toUpperCase() == id) {

                error.style.display = 'none';
                info.style.display = 'flex';
                type.innerHTML = '';
                base.innerHTML = '';
                id_pokemon = pokedex[pokemon].id;

                if (window.outerWidth >= 526) {
                    prev.style.display = 'inline';
                    next.style.display = 'inline';
                    prevResponsive.style.display = 'none';
                    nextResponsive.style.display = 'none';
                } else {
                    prev.style.display = 'none';
                    next.style.display = 'none';
                    prevResponsive.style.display = 'inline';
                    nextResponsive.style.display = 'inline';
                }

                window.addEventListener('resize', () => {
                    if (info.style.display == 'flex') {
                        if (window.outerWidth >= 526) {
                            prev.style.display = 'inline';
                            next.style.display = 'inline';
                            prevResponsive.style.display = 'none';
                            nextResponsive.style.display = 'none';
                        } else {
                            prev.style.display = 'none';
                            next.style.display = 'none';
                            prevResponsive.style.display = 'inline';
                            nextResponsive.style.display = 'inline';
                        }
                    }

                })



                var number;

                if (pokedex[pokemon].id > 0 && pokedex[pokemon].id < 10) {
                    imgpkm.setAttribute('src', '../images/00' + pokedex[pokemon].id + '.png');
                    number = '00' + pokedex[pokemon].id;
                } else if (pokedex[pokemon].id >= 10 && pokedex[pokemon].id < 100) {
                    imgpkm.setAttribute('src', '../images/0' + pokedex[pokemon].id + '.png');
                    number = '0' + pokedex[pokemon].id;
                } else {
                    imgpkm.setAttribute('src', '../images/' + pokedex[pokemon].id + '.png');
                    number = pokedex[pokemon].id;
                }
                name.innerHTML = number + ` - ` + pokedex[pokemon].name.english;

                for (var tipo in pokedex[pokemon].type) {
                    type.innerHTML += `<li style='background-color:${handleColor(pokedex[pokemon].type[tipo])}'>` + pokedex[pokemon].type[tipo] + `</li>`;

                }
                var bar = 1;
                for (var stat in pokedex[pokemon].base) {
                    base.innerHTML += stat + ': ' + pokedex[pokemon].base[stat] +
                        `</br><progress class='stat-bar bar-${bar}' value="${pokedex[pokemon].base[stat]}" max="256"></progress></br>`;
                    bar++;
                }

                break;
            }
        }
        return id_pokemon;
    }

    init();


});