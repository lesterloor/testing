$(".menu").click(function() {
   $(this)
      .parent()
      .toggleClass("close");
});
var canvas = $('canvas')[0];
var context = canvas.getContext('2d');

var Dots = [];
var ID = 0;
var colors = ['#FF9900', '#424242', '#BCBCBC', '#3299BB', '#B9D3B0', '#81BDA4', '#F88F79', '#F6AA93'];
var maximum = 100;

function Dot() {
  this.active = true;
  this.id = ID; ID++;

  this.diameter = 2 + Math.random() * 7;

  this.x = Math.round(Math.random() * canvas.width);
  this.y = Math.round(Math.random() * canvas.height);

  this.velocity = {
    x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.4,
    y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.4
  };

  this.alpha = 0.1;
  this.maxAlpha = this.diameter < 5 ? 0.3 : 0.8;
  this.hex = colors[Math.round(Math.random() * 7)];
  this.color = HexToRGBA(this.hex, this.alpha);
}

Dot.prototype = {
  Update: function() {
    if(this.alpha <= this.maxAlpha) {
      this.alpha += 0.005;
      this.color = HexToRGBA(this.hex, this.alpha);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
      this.active = false;
    }
  },

  Draw: function() {
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.moveTo(0, -this.diameter);

    for (var i = 0; i < 7; i++)
    {
      context.rotate(Math.PI / 7);
      context.lineTo(0, -(this.diameter / 2));
      context.rotate(Math.PI / 7);
      context.lineTo(0, -this.diameter);
    }

    if(this.id % 2 == 0) {
      context.stroke();
    } else {
      context.fill();
    }

    context.closePath();
    context.restore();
  }
}

function Update() {
  GenerateDots();

  Dots.forEach(function(Dot) {
    Dot.Update();
  });

  Dots = Dots.filter(function(Dot) {
    return Dot.active;
  });

  Render();
  requestAnimationFrame(Update);
}

function Render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Dots.forEach(function(Dot) {
    Dot.Draw();
  });
}

function GenerateDots() {
  if(Dots.length < maximum) {
    for(var i = Dots.length; i < maximum; i++) {
      Dots.push(new Dot());
    }
  }

  return false;
}

function HexToRGBA(hex, alpha) {
  var red = parseInt((TrimHex(hex)).substring(0, 2), 16);
  var green = parseInt((TrimHex(hex)).substring(2, 4), 16);
  var blue = parseInt((TrimHex(hex)).substring(4, 6), 16);

  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}

function TrimHex(hex) {
  return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;
}

function WindowSize(width, height) {
  if(width != null) { canvas.width = width; } else { canvas.width = window.innerWidth; }
  if(height != null) { canvas.height = height; } else { canvas.height = window.innerHeight; }

}

$(window).resize(function() {
  Dots = [];
  WindowSize();
});

WindowSize();
GenerateDots();
Update();
$(document).ready(function() {
  /* --------------------------------
 * Simple login, registration and
 * recover password form swap with
 * a basic ripple effect and a
 * simple floating label example.
 *
 * @version 1.0
 * -------------------------------- */

(function() {
	"use strict";

	/**
	 * CLASSES
	 * ------- */

	var CLASSES = {
		button: "btn",
		checkbox: "toggle__checkbox",
		container: "mainContainer",
		form: '[data-toggle="form"]',
		input: "inputfield__input",
		inputfield: "inputfield"
	};

	/**
	 * TOGGLE CLASSES
	 * -------------- */

	var IS_ACTIVE = "is-active";
	var IS_ANIMATING = "is-animating";
	var IS_DIRTY = "is-dirty";

	var CONTAINER_CLASSES = ["is-amnesia", "is-login", "is-register"];

	/**
	 * ELEMENTS
	 * -------- */

	var BUTTON = document.querySelectorAll("." + CLASSES.button);
	var CHECKBOX = document.querySelectorAll("." + CLASSES.checkbox);
	var CONTAINER = document.getElementById(CLASSES.container);
	var FORMTOGGLE = document.querySelectorAll(CLASSES.form);
	var INPUTFIELD = document.querySelectorAll("." + CLASSES.inputfield);

	/**
	 * Animation end event.
	 * @link https://davidwalsh.name/css-animation-callback
	 * @return	mixed
	 */
	var whichAnimationEvent = function() {
		var a;
		var el = document.createElement("loginfakeelement");
		var animations = {
			animation: "animationend",
			OAnimation: "oAnimationEnd",
			MozAnimation: "animationend",
			WebkitAnimation: "webkitAnimationEnd"
		};

		for (a in animations) {
			if (el.style[a] !== undefined) {
				return animations[a];
			}
		}

		return false;
	};

	/**
	 * Check if device is mobile.
	 * @link https://tympanus.net/codrops/?p=23217
	 * @return	boolean
	 */
	var mobileCheck = function() {
		var check = false;

		(function(a) {
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
			) {
				check = true;
			}
		})(navigator.userAgent || navigator.vendor || window.opera);

		return check;
	};

	// Get event type.
	var eventType = mobileCheck() ? "touchstart" : "click";
	var eventBtn = mobileCheck() ? "touchstart" : "mousedown";

	// Animation end short var.
	var animationEnd = whichAnimationEvent();

	/**
		* Toggle animation class.
		* @return	void
		*/
	var animationClassToggle = function() {
		// Add `animating` class.
		this.classList.add(IS_ANIMATING);

		// Remove `animating` class if
		// animations are not supported.
		if (!animationEnd) {
			this.classList.remove(IS_ANIMATING);

			return;
		}

		// Remove `animating` class on animation end.
		animationEnd &&
			this.addEventListener(animationEnd, function() {
				if (this.classList.contains(IS_ANIMATING)) {
					this.classList.remove(IS_ANIMATING);
				}
			});
	};

	/**
	 * Checkbox ripple event.
	 * @see checkBoxRipple	LESS/CSS
	 * @see animationClassToggle()
	 */
	[].slice.call(CHECKBOX).forEach(function(el) {
		el.addEventListener(eventBtn, animationClassToggle.bind(el));
	});

	/**
	 * Button ripple event.
	 * @see btnRipple		LESS/CSS
	 * @see animationClassToggle()
	 */
	[].slice.call(BUTTON).forEach(function(el) {
		el.addEventListener(eventBtn, animationClassToggle.bind(el));
	});

	/**
	 * Toggle forms.
	 */
	[].slice.call(FORMTOGGLE).forEach(function(el) {
		var $target = document.getElementById(el.getAttribute("data-target"));
		var $type = "is-" + el.getAttribute("data-type");

		// Add `touchstart` or `click` event.
		el.addEventListener(eventType, function(e) {
			if (e) e.preventDefault();

			// If a target doesn't exist, simply do nothing.
			if (!$target) return;

			// Find all children of target parent element.
			var children = $target.parentNode.children;

			// Remove `active` class from target siblings.
			Array.prototype.filter.call(children, function(child) {
				if (child !== $target) {
					child.classList.remove(IS_ACTIVE);
				}
			});

			// Add `active` class to target form.
			if (!$target.classList.contains(IS_ACTIVE)) {
				$target.classList.add(IS_ACTIVE);
			}

			// Remove current active container class.
			CONTAINER_CLASSES.forEach(function(c) {
				CONTAINER.classList.remove(c);
			});

			// Add new active container class.
			CONTAINER.classList.add($type);
		});
	});

	/**
	 * Inputfields.
	 */
	[].slice.call(INPUTFIELD).forEach(function(el) {
		var input = el.querySelector("." + CLASSES.input);
		/**
		 * Check input value and add/remove
		 * class accordingly.
		 * @return	void
		 */
		var checkValue = function() {
			if (input.value != "" && !el.classList.contains(IS_DIRTY)) {
				el.classList.add(IS_DIRTY);
			} else if (input.value == "" && el.classList.contains(IS_DIRTY)) {
				el.classList.remove(IS_DIRTY);
			}
		};

		// Add `input` and `change` event listeners.
		input.addEventListener("input", checkValue);
		input.addEventListener("change", checkValue);

		// Check value on content load.
		document.addEventListener("DOMContentLoaded", checkValue);
	});
})();

});
