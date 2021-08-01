var previousScreen = "block-screen";
var currentScreen = "block-screen";
var timerMusic1 = null;
var timerMusic2 = null;
var timerCall = null;
var gPersonCall;
var gPersonText;
var dragTime;
var textNotification = false;
var callNotification = false;
var callTimer;

var months = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


function contactsToHTML() {
    var i;
    for(i = 0; i < contacts.length; i++) {
        document.getElementById('contacts-list').innerHTML += "<div class='list-element' onclick='contactEvent(" + '"' + contacts[i] + '"' + ")'><li>" + contacts[i] + "</li></div>";
    }
}

function checkLongPress1() {
    dragTime = new Date().getTime();
    console.log("longpress1");
}

function checkLongPress2() {
    console.log("longpress2");
    var endTime = new Date().getTime();
    
    if (endTime - dragTime < 250) {
        console.log('< 250');
        longpress = false;
    } else if (endTime - dragTime >= 300) {
        console.log('>= 300');
        return true;
    }
}

function currentApp() {
    switch (currentScreen) {
        case "search-music1":
        case "search-music2":
        case "search-music3":
        case "search-music4":
            return "search-music";
            break;
        case "contacts":
            return "contacts";
            break;
        case "block-screen":
            return "block-screen";
            break;
        case "call1":  
        case "call2":  
        case "call3":
        case "call4":
            return "call";
            break;
        default:
            return;
            break;
    } 
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function clearAllTimeouts() {
    clearTimeout(timerMusic1);
    clearTimeout(timerMusic2);
    clearTimeout(timerCall);
}       

function goTo(screen) {
    clearInterval(callTimer);
    previousScreen = currentScreen;
    currentScreen = screen;
    
    document.getElementById(previousScreen).style.visibility = "hidden";
    document.getElementById(currentScreen).style.visibility = "visible";
    console.log("From: " + previousScreen + " to: " + currentScreen);

    if(screen == 'profile') clearAllTimeouts();
    if(screen == 'text') {
        console.log(gPersonText);
        printMessages();
    }
    if(previousScreen == 'map-app') map.clearSelectedRegions();

    if(screen == 'recent-texts') {
        printRecentTexts();
        textNotification = false;
        updateTextNotification();
    }
    

}


function mainscreenButton() {
    clearAllTimeouts();
    clearInterval(callTimer);
    current = currentApp();
    
    if(current == "search-music" || current == "help") {
        goTo('main-screen2');
    }
    else if(currentScreen == "main-screen1" || currentScreen == "main-screen2") {
        goTo("block-screen");
    }
    else if(currentScreen == "call1" || currentScreen == "call2") {
        redCall(1, 0);
        goTo("main-screen1");
    }
    else if(currentScreen =="call4") {
        redCall(0, 0);
        goTo("main-screen1");
    }
    else {
        goTo('main-screen1');
    }
    
    document.getElementById(previousScreen).style.visibility = "hidden";
}

function backButton() {
    clearAllTimeouts();
    clearInterval(callTimer);

    switch(currentScreen) {
        case "search-music3":
        case "search-music4":
            goTo("search-music1");
            break;
        case "search-music2":
            goTo("search-music1");
            break;
        case "search-music1":
        case "help":
            goTo("main-screen2");
            break;
        case "contacts":
        case "map-app":
            goTo("main-screen1");
            break;
        case "profile":
           if(previousScreen == 'map-legend') goTo('map-legend');
            else {goTo('contacts');}
            break;
        case "call1":
        case "call2":
        case "call3":
            goTo("profile");
            break;
        case "predefined-messages":
            goTo("text");
            break;
        case "text":
            if(previousScreen == "recent-texts" || previousScreen == "predefined-messages") {
                goTo("recent-texts");
            }
            else { goTo("profile"); }
            break;
        case "map-legend":
            goTo('map-app');
            break;
        default:
            goTo("main-screen1");
            break;
    }
    
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  // add a zero in front of numbers<10
  m = checkTime(m);
  h = checkTime(h)
  document.getElementById('time').innerHTML = h + ":" + m;
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();

  month = months[month]
  document.getElementById('date').innerHTML = day + " " + month + "  " + year;

  t = setTimeout(function() {
    startTime()
  }, 500);
}
startTime();

function updateScrollbars() {
    $("#recent-calls-list").mCustomScrollbar({
        theme:"minimal",
        scrollbarPosition: "inside"
    });

    $("#recent-texts-list").mCustomScrollbar({
        theme:"minimal",
        scrollbarPosition: "inside"
    });
}

$("#help-list").mCustomScrollbar({
    autoHideScrollbar: false,
    theme:"minimal",
    scrollbarPosition: "inside",
    autoHideScrollbar: false
});

$("#contacts-list").mCustomScrollbar({
    autoHideScrollbar: false,
    theme:"minimal",
    scrollbarPosition: "inside",
    autoHideScrollbar: false
});

$("#predefined-messages-list").mCustomScrollbar({
    autoHideScrollbar: false,
    theme:"minimal",
    scrollbarPosition: "inside",
    autoHideScrollbar: false
});

$("#map-legend-list").mCustomScrollbar({
    autoHideScrollbar: false,
    theme:"minimal",
    scrollbarPosition: "inside",
    autoHideScrollbar: false
});

