var list;

function musicUriReady() {

    if (list == undefined) {
        list = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, musicArray, {
            swfPath: "../../dist/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
    } else{
      list._initPlaylist(musicArray);
    }
}

function returnMoodGround(event) {
    if (mode == 'play') {
        if (document.all) {
            window.event.returnValue = false;
        } // for IE  
        else {
            event.preventDefault();
        };
        mode = 'draw';
        Application.clear();
        $('#jp_container_1').fadeOut(1000);
        $('#jquery_jplayer_1').fadeOut(10);
        $('#moodGround').css("z-index", "1");
        $('#moodGround').fadeTo("slow", 1);

    }
}
