// Div Handlers
let game_window;
let game_screen;
let onScreenAsteroid;
let onScreenPortal;
let onScreenSheild;

// Difficulty Helpers
let astProjectileSpeed = 3;          // easy: 1, norm: 3, hard: 5

// Game Object Helpers
let currentAsteroid = 1;
let currentPortal = 1;
let currentSheild = 1;
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 5;                // Speed of the person
let vaccineOccurrence = 20000;       // Vaccine spawns every 20 seconds
let vaccineGone = 5000;              // Vaccine disappears in 5 seconds
let maskOccurrence = 15000;          // Masks spawn every 15 seconds
let maskGone = 5000;                 // Mask disappears in 5 seconds

// Movement Helpers
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;
var falsey_key = false;

// Main
$(document).ready(function () { // means excute this code when the elements in dom was loaded 
  // ====== Startup ====== 
  game_window = $('.game-window'); // press any key anywhere on the browser
  game_screen = $("#actual_game");
  onScreenAsteroid = $('.curAstroid');
  onScreenPortal = $('.portal');

  onScreenSheild = $('.sheild');
  spaceship = $(".spaceship");

  $(window).keydown(KeyPressRouter);
  //video code
  maxPersonPosX = game_window.width() - spaceship.width();
  maxPersonPosY = game_window.height() - spaceship.height();
  // TODO: ADD MORE
  // // Example: Spawn an asteroid that travels from one border to another
  game_screen.hide();
});

function play_begin() {
  console.log("hello");
  $('#tutorial_page').show();
  $('#landing-page').hide();
  $('.game-window').hide();
}

function get_ready() {
  $('.get_ready').show();

}
var danger_range = 20;
var dangerrrrrr_fucklyprev = 0;
var score_num = 0;
var sheild_idk = false;

function asterhide() {
  $('#space').show();
}
function empty() {

}

function start_game() {
  $('#tutorial_page').hide();
  $('#actual_game').show();
  $('#space').hide();
  $('.get_ready').show();
  document.getElementById("danger_num").innerHTML = danger_range;
  var level_num = 1;
  document.getElementById("level_num").innerHTML = level_num;
  document.getElementById("score_num").innerHTML = score_num;

  setTimeout(asterhide, 3000);
  //for asteroids
  setTimeout(function () {
    var intervalId;
    var plswork = false;
    if (danger_range == 10 && (plswork == false)) {
      intervalId = window.setInterval(function () {
        spawn();
        astProjectileSpeed = 1;
      }, 1000);
    }
    else if (danger_range == 30 && (plswork == false)) {
      intervalId = window.setInterval(function () {
        spawn();
        astProjectileSpeed = 5;
      }, 600);
    }
    else {
      if ((plswork == false)) {
        intervalId = window.setInterval(function () {
          spawn();
          astProjectileSpeed = 3;
        }, 800);
      }
    }
    var x_stopnum = 40;
    var intervalId2 = window.setInterval(function () {
      var aster_list = $('div[id^="a-"]');
      var shace = $("#discovery");
      for (var i = 0; i < aster_list.length; i++) {
        if (isColliding($(aster_list[i]), $(shace)) == true) {
          if (sheild_idk == false) {
            console.log("inside");
            falsey_key = true;
            astProjectileSpeed = 0;
            astProjectileSpeed = 0;
            var image = document.getElementById('space');
            image.src = "src/player/player_touched.gif";
            clearInterval(intervalId);
            clearInterval(intervalId3);
            clearInterval(intervalId7);
            clearInterval(intervalId4);
            clearInterval(intervalId8);
            clearInterval(intervalId2);
            plswork == true;
            // clearInterval(astermovement);
            $(aster_list[i]).remove();
            x_stopnum = 0;
            //  astProjectileSpeed = 0;
            var audio = document.getElementById("spaceypoo");
            audio.volume = volume_level;
            audio.play();
            // var image = document.getElementById('space');
            // image.src = "src/player/player_touched.gif";

            var intervalId16567 = window.setTimeout(function () {
              document.getElementById("score_pres").innerHTML = score_num;
              $('#actual_game').hide();
              $('#score_page').show();
              clearInterval(intervalId);
              clearInterval(intervalId3);
              clearInterval(intervalId7);
              clearInterval(intervalId4);
              clearInterval(intervalId8);
              console.log("inside");
            }, 2000);
            clearInterval(intervalId);
            return;
            //clear all the intervals from  that
          }
          else {
            sheild_idk = false
            var image = document.getElementById('space');
            image.src = "src/player/player.gif";
            $(aster_list[i]).remove();
          }
        }
      }
    }, 10);

    //for portals
    var intervalId3 = window.setInterval(function () {
      let objectString1 = "<div id = 'portals" + currentPortal + "' class = 'portal' > <img src = 'src/port.gif'/></div>";
      onScreenPortal.append(objectString1);
      this.id = $('div[id^="portals"]');
      var shace = $("#discovery");
      // current x, y position of this Asteroid
      var x_sizedsa = maxPersonPosX - 64;
      var y_sizeasd = maxPersonPosY - 64;
      this.pur_x = getRandomNumber(0, x_sizedsa); // number of pixels from right
      this.pur_y = getRandomNumber(0, y_sizeasd); // number of pixels from top
      this.id.css("top", this.pur_y);
      this.id.css("left", this.pur_x);
      //there is a random incrase of danger level after a few seconds 
      function hide() {
        ($('div[id^="portals"]')).remove();
      }
      setTimeout(hide, 5000);
    }, 20000);


    var intervalId7 = window.setInterval(function () {
      //let objectString1 = "<div id = 'portals" + currentPortal + "' class = 'portal' > <img src = 'src/port.gif'/></div>";  
      var thigy = $('div[id^="portals"]');
      var shace = $("#discovery");
      if (thigy.length > 0) {
        if (isColliding($(thigy), $(shace)) == true) {
          var audio = document.getElementById("fuckword");
          audio.volume = volume_level;
          audio.play();
          level_num = level_num + 1;
          danger_range = danger_range + 2;
          document.getElementById("level_num").innerHTML = level_num;
          document.getElementById("danger_num").innerHTML = danger_range;
          astProjectileSpeed = astProjectileSpeed * 1.02;
          onScreenPortal.empty();
          console.log("work");
        }
      }
    }, 100);

    //for sheilds
    var intervalId4 = window.setInterval(function () {
      //currentSheild
      let objectString2 = "<div id = 'sheilds" + currentSheild + "'class = 'sheild' > <img src = 'src/shield.gif'/></div>";
      if (sheild_idk == false) {
        onScreenSheild.append(objectString2);
        this.id = $('div[id^="sheilds"]');
        // current x, y position of this Asteroid
        var x_sijkze = maxPersonPosX - 64;
        var y_sinmnze = maxPersonPosY - 64;
        this.sur_x = getRandomNumber(0, x_sijkze); // number of pixels from right
        this.sur_y = getRandomNumber(0, y_sinmnze); // number of pixels from top
        this.id.css("top", this.sur_y);
        this.id.css("left", this.sur_x);
        // onScreenSheild.append(objectString2);

        function hide1() {
          ($('div[id^="sheilds"]')).remove();
        }
        setTimeout(hide1, 5000);
      }
    }, 15000);

    var intervalId8 = window.setInterval(function () {
      var thigy = $('div[id^="sheilds"]');
      var shace = $("#discovery");
      // var shace = $("#space");
      if (thigy.length > 0) {
        if (isColliding($(thigy), $(shace)) == true) {
          var audio = document.getElementById("fuckword");
          audio.volume = volume_level;
          audio.play();
          var image = document.getElementById('space');
          image.src = "src/player/player_shielded.gif";
          audio.play();
          sheild_idk = true;
          onScreenSheild.empty();
          // onScreenPortal.empty();
        }
      }
    }, 100);

    //score
    var intervalId5 = window.setInterval(function () {
      document.getElementById("score_num").innerHTML = score_num;
      score_num = score_num + x_stopnum;
    }, 500);
  }, 3050);
}

var volume_level = .50;
function setting_begin() {
  $('#setting_page').show();
  if (easy_true == false && hard_true == false) {
    $("#normal_but").css("border-color", "yellow");
    $('#easy_but').css({ "border-color": "" });
    $('#hard_but').css({ "border-color": "" });
  }
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    output.innerHTML = this.value;
    volume_level = this.value / 100;
  }
}

var easy_true = false;
function easy() {
  console.log("easy");
  //$('.easyfix').show();
  $("#easy_but").css("border-color", "yellow");
  $('#normal_but').css({ "border-color": "" });
  $('#hard_but').css({ "border-color": "" });
  danger_range = 10;
  easy_true = true;
  document.getElementById("danger_num").innerHTML = danger_range;
}

var normal_true = false;
function medium() {
  console.log("normal");
  $("#normal_but").css("border-color", "yellow");
  $('#easy_but').css({ "border-color": "" });
  $('#hard_but').css({ "border-color": "" });
  danger_range = 20;
  normal_true = true;
  document.getElementById("danger_num").innerHTML = danger_range;
}

var hard_true = false;
function hard() {
  console.log("hello");
  $("#hard_but").css("border-color", "yellow");
  $('#normal_but').css({ "border-color": "" });
  $('#easy_but').css({ "border-color": "" });
  danger_range = 30;
  hard_true = true;
  document.getElementById("danger_num").innerHTML = danger_range;
}

function close_set() {
  $('#setting_page').hide();
}
function startover() {
  $('#landing-page').show();
  $('#landing-page').appendTo('.outer-container');
  $('#score_page').hide();
  $('#setting_page').hide();
  $('#tutorial_page').hide();
  $('.get_ready').hide();
  $('#setting_page').hide();
  var aster_list = $('div[id^="a-"]');
  for (var i = 0; i < aster_list.length; i++) {
    aster_list[i].remove();
  }
  var image = document.getElementById('space');
  image.src = "src/player/player.gif";
  score_num = 0;
  x_stopnum = 40;
  falsey_key = false;
  if (easy_true == true) {
    danger_range = 10;
  }
  else if (hard_true == true) {
    danger_range = 30;
  }
  else {
    danger_range = 20;
  }
}

// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
}

//ROCKET VIDEO POVIDED CODE
var spaceship;
var SPACESHIP_MOVEMENT = 50;
var maxSpaceShipPosX = 1280;
var maxSpaceShipPosY = 500;

var KEYS = {
  left: 37,
  right: 39,
  up: 38,
  down: 40,
  spacebar: 32,
  shift: 16
}

function KeyPressRouter(event) {
  switch (event.which) {
    case KEYS.up:
    case KEYS.down:
    case KEYS.left:
    case KEYS.right:
      console.log("Arrow key pressed");
      moveRocket(event.which);
      break;
    case KEYS.spacebar:
      break;
    case KEYS.shift:
      break;
    default:
      console.log("INVALID");
      break;
  }
}
//change use an interval
function moveRocket(direction) {
  if (falsey_key === false) {
    var image = document.getElementById('space');
    clearInterval(defim);
    switch (direction) {
      case KEYS.left:
        console.log("moving left");
        var newPos = parseInt(spaceship.css("left")) - SPACESHIP_MOVEMENT;
        if (sheild_idk == true) {
          image.src = "src/player/player_shielded_left.gif";
        }
        else {
          image.src = "src/player/player_left.gif";
        }
        if (newPos < 0) {
          newPos = 0;
        }
        spaceship.css("left", newPos);
        break;
      case KEYS.up:
        console.log("moving up");
        var newPos = parseInt(spaceship.css("top")) - SPACESHIP_MOVEMENT;
        if (sheild_idk == true) {
          image.src = "src/player/player_shielded_up.gif";
        }
        else {
          image.src = "src/player/player_up.gif";
        }
        if (newPos < 0) {
          newPos = 0;
        }
        spaceship.css("top", newPos);
        break;
      case KEYS.down:
        console.log("moving down");
        var newPos = parseInt(spaceship.css("top")) + SPACESHIP_MOVEMENT;
        if (sheild_idk == true) {
          image.src = "src/player/player_shielded_down.gif";
        }
        else {
          image.src = "src/player/player_down.gif";
        }
        if (newPos > maxSpaceShipPosY) {
          newPos = maxPersonPosY;
        }
        spaceship.css("top", newPos);
        break;
      case KEYS.right:
        console.log("movinv right");
        var newPos = parseInt(spaceship.css("left")) + SPACESHIP_MOVEMENT;
        if (sheild_idk == true) {
          image.src = "src/player/player_shielded_right.gif";
        }
        else {
          image.src = "src/player/player_right.gif";
        }
        if (newPos > maxPersonPosX) {
          newPos = maxPersonPosX;
        }
        spaceship.css("left", newPos);
        break;
    }
    var defim = window.setTimeout(function () {
      if ((sheild_idk == true) && (falsey_key == false)) {
        image.src = "src/player/player_shielded.gif";
      }
      else if ((falsey_key == false)) {
        image.src = "src/player/player.gif";
      }
    }, 1000);
  }
}

class Asteroid {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAstroid' > <img src = 'src/asteroid.png'/></div>";
    onScreenAsteroid.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  if (falsey_key == false) {
    let asteroid = new Asteroid();
    setTimeout(spawn_helper(asteroid), 0);
  }
}

function spawn_helper(asteroid) {
  if (falsey_key == false) {
    let astermovement = setInterval(function () {
      // update asteroid position on screen
      asteroid.updatePosition();

      // determine whether asteroid has reached its end position, i.e., outside the game border
      if (asteroid.hasReachedEnd()) {
        asteroid.id.remove();
        clearInterval(astermovement);
      }
    }, AST_OBJECT_REFRESH_RATE);
  }
}

function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}


function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}




