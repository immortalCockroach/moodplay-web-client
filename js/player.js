var list;
var parameterObject = {
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
};

function musicUriReady() {

    //alert(musicArray.length);
    if (list == undefined) {
        //alert('undefined');
        list = new jPlayerPlaylist(parameterObject, musicArray, {
            swfPath: "../../dist/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
    } else {
        //alert('defined');
        list.setPlaylist(musicArray);
    }
}

function returnMoodGround(event) {
    if (mode == 'play') {

        // forbid the right click of context menu
        if (document.all) {
            window.event.returnValue = false;
        } // for IE  
        else {
            event.preventDefault();
        };
        mode = 'draw';
        Application.clear();

        // clear the information of play list and jump back to background
        $('#jp_container_1').fadeOut(1000);
        $('#jquery_jplayer_1').fadeOut(10);
        $('#moodGround').css("z-index", "1");
        $('#moodGround').fadeTo("slow", 1);
        list.remove();
        musicArray=[];
    }
}
