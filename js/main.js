window.addEventListener('load', () => {

    var input = document.querySelector('#text-search');
    var buscar = document.querySelector('#search');
    var error = document.querySelector('#error');
    var infom = document.querySelector('#info');
    var random = document.querySelector('#random');

    buscar.addEventListener('click', mostrarDatos);
    input.addEventListener('keypress', mostrarDatosEnter);
    random.addEventListener('click',mostrarAleatorio);

    function mostrarDatos() {
        var busqueda = input.value;
        if (busqueda<1 || busqueda>809){
            info.style.display='none';
            input.value = '';
            error.style.display='inline';
            infom.style.display='none';
        }else{
            init(busqueda);
            input.value = '';
            error.style.display='none';
            infom.style.display='none';
        }
    }

    function mostrarDatosEnter(e) {
        var busqueda = input.value;
        if (e.code == 'Enter') {
            if (busqueda<1 || busqueda>809){
                info.style.display='none';
                input.value = '';
                error.style.display='inline';
                infom.style.display='none';
            }else{
                init(busqueda);
                input.value = '';
                error.style.display='none';
                infom.style.display='none';
            }
        }
    }

    function mostrarAleatorio(){
        infom.style.display='none';
        random_number = Math.floor(Math.random() * 809) + 1;
        init(random_number);
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

    function handleColor(tipo){
        if(tipo == 'Grass'){
            return '#78C850';
        } else if(tipo == 'Poison'){
            return '#A040A0';
        } else if(tipo == 'Normal'){
            return '#A8A878';
        } else if(tipo == 'Fighting'){
            return '#C03028';
        } else if(tipo == 'Flying'){
            return '#A890F0';
        } else if(tipo == 'Ground'){
            return '#E0C068';
        } else if(tipo == 'Rock'){
            return '#B8A038';
        } else if(tipo == 'Bug'){
            return '#A8B820';
        } else if(tipo == 'Ghost'){
            return '#705898';
        } else if(tipo == 'Steel'){
            return '#B8B8D0';
        } else if(tipo == 'Fire'){
            return '#F08030';
        } else if(tipo == 'Water'){
            return '#6890F0';
        } else if(tipo == 'Electric'){
            return '#F8D030';
        } else if(tipo == 'Psychic'){
            return '#F85888';
        } else if(tipo == 'Ice'){
            return '#98D8D8';
        } else if(tipo == 'Dragon'){
            return '#7038F8';
        } else if(tipo == 'Dark'){
            return '#705848';
        } else if(tipo == 'Fairy'){
            return '#EE99AC';
        }
    }


    function init(id) {
        
        loadJSON(function (response) {
            // Parse JSON string into object
            var pokedex = JSON.parse(response);
            for (var pokemon in pokedex) {
                if (pokedex[pokemon].id == id || 
                    pokedex[pokemon].name.english.toLowerCase() == id || 
                    pokedex[pokemon].name.english == id || 
                    pokedex[pokemon].name.english.toUpperCase() == id) {
                    error.style.display='none';
                    info.style.display = 'flex';
                    type.innerHTML='';
                    base.innerHTML='';

                    if(pokedex[pokemon].id>0 && pokedex[pokemon].id <10){
                        imgpkm.setAttribute('src','../images/00'+pokedex[pokemon].id+'.png');
                        var number = '00'+pokedex[pokemon].id;
                    }else if(pokedex[pokemon].id>=10 && pokedex[pokemon].id <100){
                        imgpkm.setAttribute('src','../images/0'+pokedex[pokemon].id+'.png');
                        var number = '0'+pokedex[pokemon].id;
                    }else{
                        imgpkm.setAttribute('src','../images/'+pokedex[pokemon].id+'.png');
                        var number = pokedex[pokemon].id;
                    }
                    name.innerHTML= number+ ` - `+pokedex[pokemon].name.english;
                
                    for (var tipo in pokedex[pokemon].type){
                        type.innerHTML+= `<li style='background-color:${handleColor(pokedex[pokemon].type[tipo])}'>`+pokedex[pokemon].type[tipo]+`</li>`;
                         
                    }
                    var bar = 1;
                    for(var stat in pokedex[pokemon].base){
                        base.innerHTML+= stat +': ' + pokedex[pokemon].base[stat]+
                                `</br><progress class='stat-bar bar-${bar}' value="${pokedex[pokemon].base[stat]}" max="256"></progress></br>`;
                        bar++;
                    }
                    break;
                }else{
                    error.style.display='inline';
                    info.style.display='none';
                }
            }
        });
    }
});