  //client width & client height
  /*  var cw;
    var ch;*/
  //var start = false;
  var clicked = false;
  //
  /*  var xclick;
    var yclick;*/

  //var this.textLength;

  var limits;

  var configNumber = 4;
  var MOOD_URI = "http://localhost:8080/";
  var LIMITS_SERVICE = "coordinateLimits";
  var COORD_SERVICE = "findNearestMoodTrack";
  var AUDIO_SERVICE = "loadAudioFile";
  var AUDIO_BASE_URI = "http://localhost/ilmaudio/mp3/"

  var MB_URI = "http://musicbrainz.org/ws/2/recording/";

  var context;
  var fadeTime = 5;
  var offset = 30;
  var duration = 60;

  var moodSet = new Set();
  var randomDisplayMood = new Set();
  var musicArray = [];
  paper.install(window);
  var trackNumber = 10;
  var mode;
  /*  var audioJs = ['js/jquery.jplayer.min.js', 'js/jplayer.playlist.min.js'];
    var audioCss = ['css/jplayer.blue.monday.css'];*/

  var Application = {
      moods: [
          ['pathetic', 0.12, 0.27, 0, 0],
          ['dark', 0.12, 0.38, 0, 0],
          ['apocalyptic', 0.12, 0.49, 0, 0],
          ['harsh', 0.04, 0.63, 0, 0],
          ['terror', 0.02, 0.56, 0, 0],
          ['depressive', 0.21, 0.20, 0, 0],
          ['cold', 0.32, 0.40, 0, 0],
          ['scary', 0.22, 0.69, 0, 0],
          ['melancholy', 0.38, 0.11, 0, 0],
          ['sad', 0.41, 0.09, 0, 0],
          ['deep', 0.46, 0.24, 0, 0],
          ['haunting', 0.35, 0.26, 0, 0],
          ['neutral', 0.5, 0.5, 0, 0],
          ['angry', 0.36, 0.78, 0, 0],
          ['brutal', 0.26, 0.90, 0, 0],
          ['slow', 0.54, 0.10, 0, 0],
          ['dreamy', 0.50, 0.16, 0, 0],
          ['epic', 0.54, 0.33, 0, 0],
          ['nostalgia', 0.60, 0.23, 0, 0],
          ['pure', 0.58, 0.38, 0, 0],
          ['free', 0.60, 0.43, 0, 0],
          ['sexy', 0.60, 0.57, 0, 0],
          ['quirky', 0.63, 0.77, 0, 0],
          ['chill', 0.71, 0.00, 0, 0],
          ['mellow', 0.68, 0.09, 0, 0],
          ['soft', 0.74, 0.18, 0, 0],
          ['smooth', 0.82, 0.21, 0, 0],
          ['sweet', 0.75, 0.36, 0, 0],
          ['pleasure', 0.80, 0.46, 0, 0],
          ['party', 0.825, 0.8, 0, 0],
          ['energetic', 0.73, 0.65, 0, 0],
          ['fun', 0.83, 0.68, 0, 0],
          ['humour', 0.77, 0.79, 0, 0],
          ['laid back', 0.86, 0.14, 0, 0],
          ['easy', 0.95, 0.22, 0, 0],
          ['soulful', 0.94, 0.27, 0, 0],
          ['uplifting', 0.90, 0.44, 0, 0],
          ['happy', 0.92, 0.52, 0, 0],
          ['upbeat', 0.91, 0.55, 0, 0]
      ],
      songs: [
          ['music/1/ACDC - Evil Walks.mp3', 0.875, 0.875, 'Evil Walks', 'AC/DC'],
          ['music/1/Fall Out Boy - Immortals - End Credit版.mp3', 0.625, 0.875, 'Immortals', 'Fall Out Boy'],
          ['music/1/My Chemical Romance - Na Na Na(Na Na Na Na Na Na Na Na Na) - 单曲.mp3', 0.625, 0.625, 'UNKNOWN', 'UNKNOWN'],
          ['music/1/Oasis - Stop Crying Your Heart Out.mp3', 0.875, 0.625, 'Stop Crying Your Heart Out', 'Oasis'],
          ['music/1/Iceloki - Entrance.mp3', 0.75, 0.75, 'Entrance', 'Iceloki'],
          ['music/2/Avril Lavigne - Fly.mp3', 0.375, 0.875, 'UNKNOWN', 'UNKNOWN'],
          ['music/2/Linkin Park - in the End.mp3', 0.125, 0.875, 'in the End', 'Linkin Park'],
          ['music/2/Mariah Carey - Hero.mp3', 0.125, 0.625, 'Hero', 'Mariah Carey'],
          ['music/2/戴佩妮 - 辛德瑞拉.mp3', 0.375, 0.625, '辛德瑞拉', '戴佩妮'],
          ['music/2/Ani - Biotonic.mp3', 0.25, 0.75, 'Biotonic', 'Ani'],
          ['music/3/Led Zeppelin - In the Light.mp3', 0.375, 0.375, 'In the Light', 'Led Zeppelin'],
          ['music/3/Taylor Swift - State Of Grace.mp3', 0.125, 0.375, 'State Of Grace', 'Taylor Swift'],
          ['music/3/Taylor Swift - The Moment I Knew.mp3', 0.125, 0.125, 'The Moment I Knew', 'Taylor Swift'],
          ['music/3/曲婉婷 - 快活.mp3', 0.375, 0.125 , '快活', '曲婉婷'],
          ['music/3/V.K克 - Wings Of Piano.mp3', 0.25, 0.25, 'Wings Of Piano', 'V.K克'],
          ['music/4/George Ezra - Bust.mp3', 0.875, 0.375, 'Bust', 'George Ezra'],
          ['music/4/容祖儿 - 花千树.mp3', 0.625, 0.375, '花千树', '容祖儿'],
          ['music/4/宋冬野 - 斑马,斑马.mp3', 0.625, 0.125, '斑马,斑马', '宋冬野'],
          ['music/4/周杰伦 - 明明就.mp3', 0.875, 0.125 , '明明就', '周杰伦'],
          ['music/4/Rabpit - Sanctity.mp3', 0.75, 0.25, 'Sanctity', 'Rabpit']
      ],

      init: function() {
          mode = 'draw';
          this.is_touch_device = 'ontouchstart' in document.documentElement;
          this.canvas = document.getElementById('canvas');
          this.cw = document.documentElement.clientWidth;
          this.ch = parseInt(document.documentElement.clientHeight * 0.8);
          this.canvas.width = this.cw;
          this.canvas.height = this.ch;
          this.label = document.getElementById('label');
          this.draw();
          this.showRandomMoods();
          this.lastClick = new Date();

          window.onresize = function() {
              Application.init();
          }

          if (this.is_touch_device) {
              /*              this.canvas.addEventListener('touchstart', function(event) {
                                Application.onMouseUp(event.targetTouches[0]);
                            });*/

          } else {
              /*this.canvas.addEventListener('click', function(event) {
                  Application.onMouseUp(event);
              });*/
          }

          var uri = MOOD_URI + LIMITS_SERVICE + "?configNumber=" + configNumber;
          this.sendRequest(uri, this.processLimitsResponse);

          Application.playlist = Array();

          try {
              window.AudioContext = window.AudioContext || window.webkitAudioContext;
              context = new AudioContext();
          } catch (e) {
              throw new Error('Web Audio API not supported.');
          }

          AudioPlayer.init();

      },

      tl: {
          r: 200,
          g: 0,
          b: 0
      },
      tr: {
          r: 200,
          g: 150,
          b: 0
      },
      bl: {
          r: 0,
          g: 50,
          b: 100
      },
      br: {
          r: 200,
          g: 230,
          b: 80
      },

      markers: new Set(),


      interpolateColor: function(a, b, x) {
          return {
              r: Math.floor(a.r + (b.r - a.r) * x),
              g: Math.floor(a.g + (b.g - a.g) * x),
              b: Math.floor(a.b + (b.b - a.b) * x)
          };
      },

      draw: function() {
          var xstep = this.cw / 50;
          var ystep = this.ch / 50;
          // var ctx = this.canvas.getContext("2d");
          paper.setup('canvas');
          //ctx.clearRect(0, 0, cw, ch);

          //var list = [];
          for (var y = 0; y < this.ch; y += ystep) {
              var left = this.interpolateColor(this.tl, this.bl, y / this.ch);
              var right = this.interpolateColor(this.tr, this.br, y / this.ch);
              for (var x = 0; x < this.cw; x += xstep) {
                  var color = this.interpolateColor(left, right, x / this.cw);
                  //ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
                  //ctx.fillRect(x, y, xstep + 1, ystep + 1);
                  var rectangle = new Rectangle(new Point(x, y), new Size(xstep + 1, ystep + 1));
                  var pathr = new Path.Rectangle(rectangle);
                  var newcolor = new Color(color.r / 256, color.g / 256, color.b / 256);
                  pathr.style = {
                      fillColor: newcolor
                  };

              }
          }
      },

      drawCircleAndText: function(x, y, circleArray, textArray) {
          var myCircle = new Path.Circle(new Point(x, y), 20);
          myCircle.fillColor = 'black';
          myCircle.opacity = 0.5;
          circleArray.push(myCircle);
          var moodText;
          var ctx = this.canvas.getContext("2d");
          this.textLength = ctx.measureText(this.marker.title);
          if (y < this.ch / 2) {
              if (x < this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y + 35);
                  moodText = new PointText(new Point(x + this.textLength.width / 2, y + 35));
              } else if (x > this.cw - this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y + 35);
                  moodText = new PointText(new Point(x - this.textLength.width / 2, y + 35));

              } else {
                  //ctx.fillText(this.marker.title, this.marker.x, this.marker.y + 35);
                  moodText = new PointText(new Point(x, y + 35));
              }
          } else {
              if (x < this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y - 25);
                  moodText = new PointText(new Point(x + this.textLength.width / 2, y - 25));
              } else if (x > this.cw - this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y - 25);
                  moodText = new PointText(new Point(x - this.textLength.width / 2, y - 25));
              } else {
                  //ctx.fillText(this.marker.title, this.marker.x, this.marker.y - 25);
                  moodText = new PointText(new Point(x, y - 25));
              }
          }
          moodText.content = this.marker.title;
          moodText.fillColor = 'white';
          moodText.fontFamily = 'Arial';
          moodText.fontSize = '16px';
          moodText.justification = 'center';
          textArray.push(moodText);
      },

      showRandomMoods: function() {
          this.generateRandomSerial();
          var mood, text, x, y;
          for (var i of randomDisplayMood) {
              mood = this.moods[i];
              text = mood[0];
              x = mood[1];
              y = mood[2];
              this.drawRandomMood(text, x * this.cw, (1 - y) * this.ch);
          }
      },

      drawRandomMood: function(text, x, y) {
          var myCircle = new Path.Circle(new Point(x, y), 12);
          var randR = Math.random();
          var randG = Math.random();
          var randB = Math.random();
          var newcolor = new Color(randR, randG, randB);
          myCircle.fillColor = newcolor;
          myCircle.opacity = 0.5;
          var moodText;
          var ctx = this.canvas.getContext("2d");
          this.textLength = ctx.measureText(text);
          if (y < this.ch / 2) {
              if (x < this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y + 35);
                  moodText = new PointText(new Point(x + this.textLength.width / 2, y + 35));
              } else if (x > this.cw - this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y + 35);
                  moodText = new PointText(new Point(x - this.textLength.width / 2, y + 35));

              } else {
                  //ctx.fillText(this.marker.title, this.marker.x, this.marker.y + 35);
                  moodText = new PointText(new Point(x, y + 35));
              }
          } else {
              if (x < this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y - 25);
                  moodText = new PointText(new Point(x + this.textLength.width / 2, y - 25));
              } else if (x > this.cw - this.textLength.width / 2) {
                  //ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y - 25);
                  moodText = new PointText(new Point(x - this.textLength.width / 2, y - 25));
              } else {
                  //ctx.fillText(this.marker.title, this.marker.x, this.marker.y - 25);
                  moodText = new PointText(new Point(x, y - 25));
              }
          }
          moodText.content = text;
          moodText.fillColor = 'white';
          moodText.fontFamily = 'Arial';
          moodText.fontSize = '10px';
          moodText.justification = 'center';
      },

      generateRandomSerial: function() {
          var moodsLen = this.moods.length;
          var generateNum = parseInt(moodsLen / 4);
          while (randomDisplayMood.size < generateNum) {
              var randomNum = Math.round((moodsLen - 0) * Math.random());
              if (!randomDisplayMood.has(randomNum)) {
                  randomDisplayMood.add(randomNum);
              }
          }
          //alert("generateOk"+randomDisplayMood.size);
      },

      sendRequest: function(uri, callback) {
          var request = new XMLHttpRequest();
          request.open('GET', uri, true);
          request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          request.onreadystatechange = function() {
              if (request.readyState == 4) {
                  if (request.status == 200) {
                      callback(request.responseText);
                  } else {
                      //alert("Query error: " + request.status + " " + request.responseText);
                      //window.location.href="audioplayer.html"
                  }
              }
          };
          request.send(null);
      },

      processLimitsResponse: function(json) {
          var dict = jQuery.parseJSON(json);
          limits = {};
          limits.vmin = parseFloat(dict[0].vmin.value);
          limits.vmax = parseFloat(dict[0].vmax.value);
          limits.amin = parseFloat(dict[0].amin.value);
          limits.amax = parseFloat(dict[0].amax.value);
      },

      processMoodResponse: function(json) {
          var dict = jQuery.parseJSON(json);
          var mbid = dict[0].mbid.value;
          var path = dict[0].path.value;
          // add basic info of song in 'musicArray'
          Application.sendRequest(MB_URI + mbid + "?inc=artist-credits&fmt=json", Application.processMBResponse);
          var uri = AUDIO_BASE_URI + path.replace(".wav", ".mp3");
          musicArray[musicArray.length - 1].setUri(uri);
          Application.processAudioResponse(uri);
      },

      processAudioResponse: function(fileuri) {
          AudioPlayer.loadTrack(fileuri);

      },

      processMBResponse: function(json) {
          var dict = jQuery.parseJSON(json);
          var title = dict.title;
          var artist = dict['artist-credit'][0].artist.name;
          var song = new Song(title, artist);
          musicArray.push(song);
          Application.showMetadata(title, artist);
      },

      MouseUp: function(x, y, circleArray, textArray) {
          //    if(!start)
          //    return;
          if (!clicked)
              clicked = true;
          //if ((new Date() - this.lastClick) > 1000) {
          this.setMarker(x, y);
          this.xclick = x;
          this.yclick = y;

          this.drawCircleAndText(x, y, circleArray, textArray);
          //this.sendPosition(event);
          //this.draw();
          //this.lastClick = new Date();
          //}
      },


      sendSPARQLQuery: function(event) {
          if (!clicked)
              return;
          //
          mode = 'play';
          var s = new Song('1', '2');
          s.setUri('music/Iceloki - Entrance.mp3');
          musicArray.push(s);

          $('#moodGround').css("z-index", "-1");
          $('#moodGround').fadeTo("slow", 0.4);

          $('#jp_container_1').fadeIn(1000);
          $('#jquery_jplayer_1').fadeIn(10, musicUriReady);
          /*          for (var mood of this.markers) {
                        var x = mood.x / this.cw;
                        var y = 1 - mood.y / this.ch;
                        var v = Application.linlin(x, 0.0, 1.0, limits.vmin, limits.vmax);
                        var a = Application.linlin(y, 0.0, 1.0, limits.amin, limits.amax);
                        var uri = MOOD_URI + COORD_SERVICE + "?valence=" + v + "&arousal=" + a;
                        this.sendRequest(uri, this.processMoodResponse);
                    }*/
      },

      linlin: function(val, inmin, inmax, outmin, outmax) {
          if (val <= inmin) return outmin;
          if (val >= inmax) return outmax;
          return (val - inmin) / (inmax - inmin) * (outmax - outmin) + outmin;
      },

      setMarker: function(pX, pY) {
          this.marker = {
              title: 'null'
          };

          this.label.innerHTML = 'Click to send';
          this.marker.title = this.findMood(pX / this.cw, 1 - pY / this.ch);
          // Notice:当mood之前未出现时加入集合,此处markers中的Marker的x,y没有经过转换,之后需要转换
          if (!moodSet.has(this.marker.title)) {
              moodSet.add(this.marker.title);
              this.markers.add(new Marker(pX, pY, this.marker.title));
          }
      },

      findMood: function(x, y) {
          var distance = 1;
          var index = null;

          for (var i = 0; i < this.moods.length; i++) {
              var mood = this.moods[i];
              var dx = Math.abs(mood[1] - x);
              var dy = Math.abs(mood[2] - y);
              var d = Math.sqrt(dx * dx + dy * dy);

              if (d < distance) {
                  distance = d;
                  index = i;
              }
          }

          return this.moods[index][0];
      },

      setNoOfTracks: function() {
          var num = parseInt(document.getElementById('noOfTracks').value);
          if (isNaN(num) || num <= 0) {
              alert('Input must be a integer and greater than 0');
          } else {
              trackNumber = num;
              alert('Tracks is set to:' + num);
          }
      },

      clear: function() {
          $("#filename").text("");
          $("#title").text("");
          $("#artist").text("");
          moodSet.clear();
          //randomDisplayMood.clear();
          this.markers.clear();
          console.log('clear');
      },

      fadeTrack: function(path) {
          $("#filename").text(path);
      },

      showMetadata: function(title, artist) {
          $("#title").text(title);
          $("#artist").text(artist);
      }

      /*      deleteCssAndJS: function() {
                var link = document.getElementsByTagName('head')[0];
                for (var i = 0; i <= 4; i++) {
                    link.removeChild(link.children[0]);
                }
                for (i = 0; i <= 1; i++) {
                    link.removeChild(link.children[1]);
                }
            },

            addCssAndJs: function() {
                var link = document.getElementsByTagName('head')[0];
                var jqueryjs = link.children[0];
                var moodjs = link.children[1];
                var node;
                for (css of audioCss) {
                    node = document.createElement('link');
                    node.rel = 'stylesheet';
                    node.href = css;
                    link.insertBefore(node, jqueryjs);
                }
                for (js of audioJs) {
                    node = document.createElement('script');
                    node.type = 'text/javascript';
                    node.src = js;
                    link.insertBefore(node, moodjs);
                }
                node = document.createElement('script');
                node.type = 'text/javascript';
                node.src = 'js/player.js';
                link.appendChild(node);

            }*/


  };

  function Song(title_, artist_) {
      this.title = title_;
      this.artist = artist_;
      this.setUri = function(uri_) {
          this.mp3 = uri_;
      }
  }

  function Marker(x_, y_, title_) {
      this.x = x_;
      this.y = y_;
      this.title = title_;
  }

  var AudioPlayer = {
      init: function() {
          AudioPlayer.enabled = true;
          AudioPlayer.current = null;
          AudioPlayer.tracks = {};
      },

      loadTrack: function(filename) {
          var request = new XMLHttpRequest();
          request.open('GET', filename, true);
          request.responseType = 'arraybuffer';

          request.onload = function() {
              context.decodeAudioData(request.response, function(buffer) {
                  if (AudioPlayer.enabled) {
                      track = {
                          "filename": filename
                      };
                      Application.playlist.push(track);
                      AudioPlayer.createSource(buffer, filename);
                  }
              }, function(err) {
                  throw new Error(err);
              });
          }

          request.send();
      },

      createSource: function(buffer, filename) {
          var source = context.createBufferSource();
          source.buffer = buffer;
          source.loop = true;
          var track = {
              "buffer": buffer,
              "source": source,
              "filename": filename
          };
          track.gainNode = context.createGain();
          source.connect(track.gainNode);
          track.gainNode.gain.value = 0.0;
          track.gainNode.connect(context.destination);
          AudioPlayer.tracks[filename] = track;
          track.source.start(0.0, offset, duration);
          if (AudioPlayer.current != null) {
              AudioPlayer.crossFadeTracks(AudioPlayer.current, track);
          } else {
              AudioPlayer.fadeInTrack(track);
          }
      },

      crossFadeTracks: function(trackOut, trackIn) {
          trackOut.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime);
          trackOut.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + fadeTime);

          trackIn.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
          trackIn.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime + fadeTime);

          AudioPlayer.current = trackIn;

      },

      fadeInTrack: function(track) {
          track.gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
          track.gainNode.gain.linearRampToValueAtTime(1.0, context.currentTime + fadeTime);

          AudioPlayer.current = track;
      }

  }

  /*  function returnMoodGround(event) {
        console.log('test');
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
    }*/

  $(window).load(function() {
      // Create a simple drawing tool:
      var tool = new Tool();
      var path;
      var transparentPath;
      var circleArray = [];
      var textArray = [];
      // Define a mousedown and mousedrag handler

      /*    var textItem = new PointText({
              content: 'Click and drag to draw a line.',
              point: new Point(20, 30),
              fillColor: 'black',
          });*/

      tool.onMouseDown = function(event) {
              musicArray = [];

              // If we produced a path before, deselect it:
              if (path) {
                  path.selected = false;
                  path.remove();
                  transparentPath.remove();
                  var circleArrayLength = circleArray.length;
                  for (var j = 0; j <= circleArrayLength - 1; j++) {
                      circleArray[j].remove();
                      textArray[j].remove();
                  }
                  circleArray = [];
                  textArray = [];
              }

              // Create a new path and set its stroke color to black:
              path = new Path({
                  segments: [event.point],
                  strokeColor: 'black',
                  strokeWidth: 30,
                  // Select the path, so we can see its segment points:
                  strokeCap: 'round',
                  strokeJoin: 'round',
                  opacity: 0.5,
                  fullySelected: false
              });
          }
          // While the user drags the mouse, points are added to the path
          // at the position of the mouse:
      tool.onMouseDrag = function(event) {
          if (!isNaN(trackNumber) && trackNumber >= 2) {
              path.add(event.point);
              path.smooth({
                  type: 'geometric',
                  factor: 0.4
              });
          }

          // Update the content of the text item to show how many
          // segments it has:
          //textItem.content = 'Segment count: ' + path.segments.length;
      }

      // When the mouse is released, we simplify the path:
      tool.onMouseUp = function(event) {
          if (!isNaN(trackNumber) && trackNumber >= 2) {

              transparentPath = path.clone();
              transparentPath.opacity = 0.2;
              //alert('before simplify:'+path.segments.length);
              path.simplify(trackNumber / 3);
              var len = parseInt(path.length);
              //alert('after simplify:'+path.segments.length);
              if (typeof(trackNumber) == 'undefined' || isNaN(parseInt(trackNumber))) {
                  alert('Tracks number is wrong,please reset it.');
                  return;
              }
              //alert(len);
              //alert(parseInt(3.5));
              //var segmentCount = path.segments.length;

              // When the mouse is released, simplify it:
              //alert(len/split);
              if (trackNumber >= 3) {
                  path.flatten(parseInt(len / (trackNumber - 2)));
              } else {
                  if (trackNumber == 2) {
                      path.flatten(len + 1);
                  }
              }
              //alert('before flatten:'+path.length);
          }
          // Select the path, so we can see its segments:
          path.fullySelected = false;

          var array = path.segments;
          var arrlen = array.length;
          path.remove();
          for (var i = 0; i <= arrlen - 1; i++) {
              var pointOfSeg = array[i].point;
              Application.MouseUp(pointOfSeg.x, pointOfSeg.y, circleArray, textArray);
          }

          //之后将清空和跳转写成回调函数 请求音乐完成后回调

          /*          var circleArrayLength = circleArray.length;
                    if (circleArrayLength > 0) {
                        for (var j = 0; j <= circleArrayLength - 1; j++) {
                            circleArray[j].remove();
                            textArray[j].remove();
                        }
                    }
                    circleArray = [];
                    textArray = [];*/


          /*          $("#moodGround").fadeOut(1000);
                    var node = document.createElement('link');
                    node.rel = 'stylesheet';
                    node.href = 'css/reset.css';
                    var head = document.getElementsByTagName('head')[0];
                    head.removeChild(head.children[1]);
                    head.insertBefore(node, head.children[1]);
                    $("#musicPlayer").fadeIn(2000);*/
          /*var newSegmentCount = path.segments.length;
          var difference = segmentCount - newSegmentCount;
          var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
          textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';*/
      }
  });
