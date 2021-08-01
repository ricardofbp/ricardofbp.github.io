function Message (message, sent, time) {
    this.message = message;
    this.sent = sent;
    this.time = time;
    this.recent = false;
    
    this.getMessage = function() {
        return this.message;
    };
    
    this.wasSent = function() {
        return this.sent;
    };
    
    this.getTime = function() {
        return this.time;
    };
    
    this.getRecent = function() {
        return this.recent;
    };
}


var contactMessages = { "Rodrigo": [] , "Andr\u00E9": [], "Catarina": [], "Afonso": [], "Manuel": [], "Ana":[], "Beltrano":[] };

var contacts =  ["Afonso", "Ana", "Andr\u00E9", "Beltrano", "Catarina", "Manuel", "Rodrigo"];

var predefinedMessages = ['Ok', 'Sim', 'N\u00E3o', 'Talvez', 'Vem ter comigo', 'Estou a ir'];

function updateTextNotification() {
    if (textNotification) document.getElementById("text-notification").style.visibility = "inherit";
    else document.getElementById("text-notification").style.visibility = "hidden";
}

function textEvent() {
    updatePersonText();
    goTo('text');
}

function recentTextEvent(person) {
   // if(checkLongPress2()) return;
    gPersonText = person;
    console.log("RTE: G: "+ gPersonText + " : " + person);
    updatePersonText();
    goTo('text');
    
}


function sendText(message) {
    if (checkLongPress2()) return;
    
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    m = checkTime(m);
    h = checkTime(h)
    var time = h + ":" + m;
    
    var message = new Message(message, true, time);
    contactMessages[gPersonText].push(message);
    
    goTo('text');
    
}

function receiveText() {
    var x = randomIntFromInterval(0,6);
    var person = contacts[x];
    var y = randomIntFromInterval(4,5);
    
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    m = checkTime(m);
    h = checkTime(h)
    var time = h + ":" + m;
    
    var message = new Message(predefinedMessages[y], false, time);
    contactMessages[person].push(message);
    console.log("WAS SENT?:" + message.wasSent());
    textNotification = true;
    updateTextNotification();
}


function printRecentTexts() {
    var flag = true;
    
    document.getElementById("recent-texts-list-wrapper").innerHTML = "";
    
    for(var i = 0; i < contacts.length; i++) {
        var messagesList = contactMessages[contacts[i]];
        
        if (messagesList.length != 0) {
            
            flag = false;
            
           // console.log("person: " + person + " contactsi: "+ contacts[i]);
            
            var listEl = document.createElement('div');
            listEl.className = 'list-element';

            var listEl2 = document.createElement("LI");
            console.log("PRT: " + contacts[i]);
            
            var aux = function(p) {
                recentTextEvent(p);
            }
            
            listEl2.addEventListener("click", aux.bind(this, contacts[i]));
            
            
            var texterName = document.createElement('div');
            texterName.className = 'texter-name';
            var textNode = document.createTextNode(contacts[i]);
            texterName.appendChild(textNode);
            
            var recentText = document.createElement('div');
            recentText.className = 'most-recent-text';
            textNode = document.createTextNode(messagesList[(messagesList.length) - 1].getMessage());
            recentText.appendChild(textNode);
            
            listEl2.appendChild(texterName);
            listEl2.appendChild(recentText);
            listEl.appendChild(listEl2);
            
            document.getElementById('recent-texts-list-wrapper').appendChild(listEl);
            
        }
    }
    
    if (flag) {
        var noMess = document.createElement('div');
        noMess.className = 'none-found';
        var text = document.createTextNode("Sem mensagens recentes");
        noMess.appendChild(text);
        
        document.getElementById('recent-texts-list-wrapper').appendChild(noMess);
    }
    
    else {
        $("#recent-texts-list").mCustomScrollbar({
            theme:"minimal",
            scrollbarPosition: "inside",
            autoHideScrollbar: false
        });
    }
}

function printMessages() {
    
    var messageList = contactMessages[gPersonText];

    var newText = "";

    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].wasSent()) {
            newText += "<div><div class='message sent'><li>" + messageList[i].getMessage() + "</li></div><div class='message-time-sent'>" + messageList[i].getTime() + "</div></div>";
        }
        if (!(messageList[i].wasSent())) {
           newText += "<div><div class='message received'><li>" + messageList[i].getMessage() + "</li></div><div class='message-time-received'>" + messageList[i].getTime() + "</div></div>";
        }
        

    }
    
    newText += "<li><img src='assets/plus.svg' id='new-message-icon' onclick=" + '"' + "goTo('predefined-messages')" + '"'+ "></li>"
    document.getElementById("messages-list").innerHTML = newText;

}

function updatePersonText() {
    document.getElementById('texting-name').innerHTML = gPersonText;
}

function contactEvent(person) {
    if(person == 'Andr\u00E9') person = 'Andre';
    gPersonCall = person;
    gPersonText = person;
    document.getElementById('profile-name').innerHTML = person;
    goTo('profile');
    var gps = document.createElement('IMG');
    gps.id = "profile-gps";
    gps.src = "";
    gps.className = 'icon';
    gps.addEventListener("click", function(){
        goTo("map-app");
        map.setFocus({scale: 5, x: personCoords[person][0]/1000, y: personCoords[person][1]/1000}); 
    });
    console.log("gps update: " + person + " " + personCoords[person][0] + " " + personCoords[person][1]);
    //document.getElementById('profile').appendChild(gps);
    
}

function updatePersonCall() {
    document.getElementById('calling-name1').innerHTML = gPersonCall;
    document.getElementById('calling-name2').innerHTML = gPersonCall;
    document.getElementById('calling-name3').innerHTML = gPersonCall;
    document.getElementById('calling-name4').innerHTML = gPersonCall;
    document.getElementById('calling-name5').innerHTML = gPersonCall;
    document.getElementById('profile-name').innerHTML = gPersonCall;
}

function updateRecentCalls(receiver, success) {

    if (document.getElementById("no-recent-calls").innerHTML == "Sem chamadas recentes") document.getElementById("no-recent-calls").innerHTML = "";
    
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    h = checkTime(h)
    var time = h + ":" + m;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    day = checkTime(day);
    month = months[month];
    date = day + "  " + month + " - " + time;
    
    var listEl = document.createElement('div');
    listEl.className = 'list-element';
    
    listEl.addEventListener("click", function(){
        goTo("profile");                        
    });

    var listEl2 = document.createElement("LI");

    var callerName = document.createElement('div');
    callerName.className = 'caller-name'
    var text = document.createTextNode(gPersonCall);
    callerName.appendChild(text);
    
    var displayDate = document.createElement("div");
    displayDate.className = 'call-date';
    var text2 = document.createTextNode(date);
    displayDate.appendChild(text2);
    
    var icon = document.createElement("IMG");
    icon.className = 'call-arrow';
    
    listEl2.appendChild(callerName);
    listEl2.appendChild(icon);
    listEl2.appendChild(displayDate);
    
    listEl.appendChild(listEl2);
    document.getElementById('recent-calls-list-wrapper').insertBefore(listEl, document.getElementById('recent-calls-list-wrapper').childNodes[0]);

    if (receiver && success) {
        icon.src = 'assets/arrow11.svg'
    }
    
    if (receiver && !success) {
        
        icon.src = 'assets/arrow10.svg'
    }
    
    if (!receiver && success) {
        icon.src = 'assets/arrow01.svg'
    }
    
    if (!receiver && !success) {
        icon.src = 'assets/arrow00.svg'
    }

    $("#recent-calls-list").mCustomScrollbar({
        theme:"minimal",
        scrollbarPosition: "inside",
        autoHideScrollbar: false
    });
    
}

function redCall(reciever, success) {
    clearInterval(callTimer);
    goTo("profile");
    clearAllTimeouts();
    updateRecentCalls(reciever, success);
}

function greenCall(reciever, success) {
    goTo("call2");
    //clearInterval(callTimer);
    clearAllTimeouts();
    updateRecentCalls(reciever, success);
    var date = new Date();
    var sec = 0;
    var min = 0;
    var handler = function() {
        if (++sec === 60) {
            sec = 0;
            if (++min === 60) min = 0;
        }
        document.getElementById("call-time").innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    };
    callTimer = setInterval(handler, 1000);
    handler();
    }

function receiveCall() {
    if (currentScreen == "call4") return; 
    var x = randomIntFromInterval(0, contacts.length-1);
    gPersonCall = contacts[x];
    gPersonText = contacts[x]
    console.log
    updatePersonCall(gPersonCall);
    updatePersonText(gPersonText);
    goTo('call4');
    x = randomIntFromInterval(6, 10);
    timerCall = window.setTimeout(function(){ greenCall(0, 0); goTo("call5")}, x*1000);
 
}

function callEvent() {
    clearTimeout(timerCall);
    updatePersonCall();
    goTo('call1');
    
    var x = Math.floor((Math.random() * 10) + 1);
    if(x < 3) timerCall = window.setTimeout(function(){ greenCall(1, 0); goTo("call3")}, 5000);
    else {
        
        timerCall = window.setTimeout(function(){ greenCall(1, 1);}, x * 1200);
    }
}