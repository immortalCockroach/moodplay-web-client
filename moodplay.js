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

  paper.install(window);
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
      init: function() {
          this.is_touch_device = 'ontouchstart' in document.documentElement;
          this.canvas = document.getElementById('canvas');
          this.cw = document.documentElement.clientWidth;
          this.ch = parseInt(document.documentElement.clientHeight * 0.8);
          this.canvas.width = this.cw;
          this.canvas.height = this.ch;
          this.label = document.getElementById('label');
          this.draw();
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
          paper.setup('canvas')
              //ctx.clearRect(0, 0, cw, ch);

          //var list = [];
          for (var y = 0; y < this.ch; y += ystep) {
              var left = this.interpolateColor(this.tl, this.bl, y / this.ch);
              var right = this.interpolateColor(this.tr, this.br, y / this.ch);
              for (var x = 0; x < this.cw; x += xstep) {
                  var color = this.interpolateColor(left, right, x / this.cw);
                  /*ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
                  ctx.fillRect(x, y, xstep + 1, ystep + 1);*/
                  var rectangle = new Rectangle(new Point(x, y), new Size(xstep + 1, ystep + 1));
                  var pathr = new Path.Rectangle(rectangle);
                  pathr.fillColor = new Color(color.r / 256, color.g / 256, color.b / 256);
              }
          }


          if (this.marker) {
              ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
              ctx.beginPath();
              ctx.arc(this.marker.x, this.marker.y, 20, 0, Math.PI * 2, true);
              ctx.fill();
              //ctx.translate(this.marker.x, this.marker.y);
              ctx.save();
              ctx.font = "16px Arial";
              ctx.textAlign = 'center';
              ctx.fillStyle = "rgb(255,255,255)";

              this.textLength = ctx.measureText(this.marker.title);
              //alertify.log(this.marker.x+' '+this.textLength.width);
              if (this.marker.y < this.ch / 2) {
                  if (this.marker.x < this.textLength.width / 2) {
                      ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y + 35);
                  } else if (this.marker.x > this.cw - this.textLength.width / 2) {
                      ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y + 35);
                  } else {
                      ctx.fillText(this.marker.title, this.marker.x, this.marker.y + 35);
                  }
              } else {
                  if (this.marker.x < this.textLength.width / 2) {
                      ctx.fillText(this.marker.title, this.marker.x + this.textLength.width / 2, this.marker.y - 25);

                  } else if (this.marker.x > this.cw - this.textLength.width / 2) {
                      ctx.fillText(this.marker.title, this.marker.x - this.textLength.width / 2, this.marker.y - 25);
                  } else {
                      ctx.fillText(this.marker.title, this.marker.x, this.marker.y - 25);
                  }
              }

              ctx.restore();
          }

          // if(!start)
          //{
          //  ctx.save();
          //  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          //ctx.fillRect(0, 0, cw, ch);
          //ctx.translate(cw/2, ch/2-50);
          //      ctx.font = "16px Arial";
          //      ctx.fillStyle = "rgb(255,255,255)";
          //      ctx.textAlign = 'center';
          //      ctx.fillText("Find the emotional direction on the canvas and click the word tag to send your expected emotion. The visualisation screen shown on stage would display the emotion instruction that most audience' expectation. Notice that you shouldn't send the instruction so frequently.", 0, 0);  
          //      ctx.restore();
          //    }
      },
      drawCircle: function(x, y, text,circleArray,textArray) {
          var myCircle = new Path.Circle(new Point(x, y), 20);
          myCircle.fillColor = 'black';
          myCircle.opacity=0.5;
          circleArray.push(myCircle);
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
                      alert("Query error: " + request.status + " " + request.responseText);
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
          Application.sendRequest(MB_URI + mbid + "?inc=artist-credits&fmt=json", Application.processMBResponse);
          var uri = AUDIO_BASE_URI + path.replace(".wav", ".mp3");
          Application.processAudioResponse(uri);
      },

      processAudioResponse: function(fileuri) {
          AudioPlayer.loadTrack(fileuri);
      },

      processMBResponse: function(json) {
          var dict = jQuery.parseJSON(json);
          var title = dict.title;
          var artist = dict['artist-credit'][0].artist.name;
          Application.showMetadata(title, artist);
      },

      onMouseUp: function(x, y,circleArray,textArray) {
          //    if(!start)
          //    return;
          if (!clicked)
              clicked = true;
          //if ((new Date() - this.lastClick) > 1000) {
          this.setMarker(x, y);
          this.xclick = x;
          this.yclick = y;

          this.drawCircle(x, y, this.marker.title,circleArray,textArray);
          //this.sendPosition(event);
          //this.draw();
          //this.lastClick = new Date();
          //}
      },


      sendSPARQLQuery: function(event) {
          if (!clicked)
              return;
          Application.clear();
          var x = this.xclick / this.cw;
          var y = 1 - this.yclick / this.ch;
          var v = Application.linlin(x, 0.0, 1.0, limits.vmin, limits.vmax);
          var a = Application.linlin(y, 0.0, 1.0, limits.amin, limits.amax);
          var uri = MOOD_URI + COORD_SERVICE + "?valence=" + v + "&arousal=" + a;
          this.sendRequest(uri, this.processMoodResponse);
      },

      linlin: function(val, inmin, inmax, outmin, outmax) {
          if (val <= inmin) return outmin;
          if (val >= inmax) return outmax;
          return (val - inmin) / (inmax - inmin) * (outmax - outmin) + outmin;
      },

      setMarker: function(pX, pY) {
          this.marker = {
              x: pX,
              y: pY,
              title: 'null'
          };

          var x = pX / this.cw;
          var y = 1 - pY / this.ch;

          this.label.innerHTML = 'Click to send';
          this.marker.title = this.findMood(x, y);
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

      clear: function() {
          $("#filename").text("");
          $("#title").text("");
          $("#artist").text("");
      },

      fadeTrack: function(path) {
          $("#filename").text(path);
      },

      showMetadata: function(title, artist) {
          $("#title").text(title);
          $("#artist").text(artist);
      }


  };

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
  $(window).load(function() {
      // Create a simple drawing tool:
      var split = 10;
      var tool = new Tool();
      var path;
      var circleArray=[];
      var textArray=[];
      // Define a mousedown and mousedrag handler

      /*    var textItem = new PointText({
              content: 'Click and drag to draw a line.',
              point: new Point(20, 30),
              fillColor: 'black',
          });*/

      tool.onMouseDown = function(event) {
              // If we produced a path before, deselect it:
              if (path) {
                  path.selected = false;
                  path.remove();
                  var circleArrayLength=circleArray.length;
                  for(var j=0;j<=circleArrayLength-1;j++){
                    circleArray[j].remove();

                  }
                  circleArray=[];
                  textArray=[];
              }

              // Create a new path and set its stroke color to black:
              path = new Path({
                  segments: [event.point],
                  strokeColor: 'blue',
                  // Select the path, so we can see its segment points:
                  fullySelected: true
              });
          }
          // While the user drags the mouse, points are added to the path
          // at the position of the mouse:
      tool.onMouseDrag = function(event) {
          path.add(event.point);

          // Update the content of the text item to show how many
          // segments it has:
          //textItem.content = 'Segment count: ' + path.segments.length;
      }

      // When the mouse is released, we simplify the path:
      tool.onMouseUp = function(event) {
          var len = parseInt(path.length);
          //alert(len);
          //alert(parseInt(3.5));
          //var segmentCount = path.segments.length;

          // When the mouse is released, simplify it:
          //alert(len/split);
          path.flatten(parseInt(len / (split - 2)));

          // Select the path, so we can see its segments:
          path.fullySelected = true;

          var array = path.segments;
          var arrlen = array.length;
          for (var i = 0; i <= arrlen - 1; i++) {
              var pointOfSeg = array[i].point;
              Application.onMouseUp(pointOfSeg.x, pointOfSeg.y,circleArray,textArray);
          }
          /*var newSegmentCount = path.segments.length;
          var difference = segmentCount - newSegmentCount;
          var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
          textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';*/
      }
  });
