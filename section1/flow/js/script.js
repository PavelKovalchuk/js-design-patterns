var chatModule = (function () {

    // Private scope
    var leadself = 'Me: ',
        leadcomputer = "PC: ",
        aSaid = ["This is a Cyber Chat"],
        msgYes = "Yes, that's a great idea.",
        msgNo = "No, that must be a mistake.",
        aSassyStuff = ["Like mold on books, grow myths on history.",
        "She moved like a poem and smiled like a sphinx.",
        "As long as we don’t die, this is gonna be one hell of a story.",
        "She laughed, and the desert sang.",
        "You’ve got about as much charm as a dead slug."];

    function echo (message) {
        aSaid.push('<div>' + message + '</div>');

        var aSaidLength = aSaid.length,
            start = Math.max(aSaidLength - 6,0),
            out = "";
        for(var i = start; i < aSaidLength; i++){
            out += aSaid[i];
        }

        $('.advert').html(out);
        $('#talk span').text(message);
    }

    return {
        talk: function(message) {
            echo(leadself + message);
        },

        replayYesNo: function() {
            var msg = Math.random() > 0.5 ? msgYes : msgNo;
            echo(leadcomputer + msg);
        },

        saySassyStuff: function () {
            var msg = Math.random() > 0.5 ? msgYes : msgNo;
            echo(leadcomputer + msg);
        },
    };
})();

$(doc).ready(function(){
    chatModule.talk("this is great");
    chatModule.replayYesNo();
    chatModule.saySassyStuff();
});







