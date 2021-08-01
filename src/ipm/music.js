var musics = [
    { title: 'Baby', author: 'Justin Bieber', font: '19pt'},
    { title: 'A Cabritinha', author: 'Quim Barreiros', font: '12pt'},
    { title: 'Clint Eastwood', author: 'Gorillaz', font: '11pt'},
    { title: 'Alvalade Chama por Mim', author: 'Capit\u00E3o Fausto', font: '10pt'}
];

function musicEvent() {
    clearTimeout(timerMusic1);
    clearTimeout(timerMusic2);
    
    var x = Math.floor((Math.random() * 10) + 1);
    if(x < 3) timerMusic1 = window.setTimeout(function(){ goTo("search-music4");}, 5000);
    else {
        timerMusic1 = window.setTimeout(function(){ goTo("search-music3");}, x * 900);
        timerMusic2 = window.setTimeout(chooseMusic, x * 900);
    }

    console.log("timerMusic1: " + timerMusic1);
    
    goTo("search-music2");
}

function chooseMusic() {
    var m = randomIntFromInterval(0, 3);
    document.getElementById("songtitle").innerHTML = musics[m].title;
    document.getElementById("songauthor").innerHTML = musics[m].author;
    document.getElementById("songtitle").style.fontSize = musics[m].font;
}
