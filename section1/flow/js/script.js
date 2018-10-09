var chatModule = (function () {

    // Private scope
    var _leadself = 'Me: ',
        _leadcomputer = "PC: ",
        _aSaid = ["This is a Cyber Chat"],
        _msgYes = "Yes, that's a great idea.",
        _msgNo = "No, that must be a mistake.",
        _aSassyStuff = ["Like mold on books, grow myths on history.",
        "She moved like a poem and smiled like a sphinx.",
        "As long as we don’t die, this is gonna be one hell of a story.",
        "She laughed, and the desert sang.",
        "You’ve got about as much charm as a dead slug."];

    function _echo (message) {
        _aSaid.push('<div>' + message + '</div>');

        var aSaidLength = _aSaid.length,
            start = Math.max(aSaidLength - 6,0),
            out = "";
        for(var i = start; i < aSaidLength; i++){
            out += _aSaid[i];
        }

        $('.advert').html(out);
        $('#talk span').text(message);
    }

    function talk(message) {
        _echo(_leadself + message);
    }

    function replayYesNo () {
        var msg = Math.random() > 0.5 ? _msgYes : _msgNo;
        _echo(_leadcomputer + msg);
    }

    function saySassyStuff() {
        var msg = Math.random() > 0.5 ? _msgYes : _msgNo;
        _echo(_leadcomputer + msg);
    }

    return {
        talk: talk,
        replayYesNo: replayYesNo,
        saySassyStuff: saySassyStuff,
    };
})();

$(document).ready(function(){
    chatModule.talk("this is great");
    chatModule.replayYesNo();
    chatModule.saySassyStuff();
});







