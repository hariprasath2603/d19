var body 			  = $('#bb8body');
var head 			  = $('#bb8head');
var shadow 		  = $('#bb8shadow');
var outline 		= $('#bb8outline');
var width 		  = $(window).width() / 2;
var speedMulti  = 1.5;
var rotateMulti = 15;
var speed;
var floorLine1  = $('.floor_line1'),
		floorLine2  = $('.floor_line2'),
		floorLine3  = $('.floor_line3');

$(document).on("mouseenter", function() {
	// Start the animation if the user is active
	roll.play();
	floorMove1.play();
	floorMove2.play();
	floorMove3.play();
})
$(document).on("mousemove", function(event) {
	// Start the animation if the user is active
	floorMove1.play();
	floorMove2.play();
	floorMove3.play();
	roll.play();
	speed = event.pageX / width;
	speed = speed * speedMulti;
	if (speed > 3) {
		speed = 3;
	}
	roll.timeScale(speed)
	TweenMax.to(head,0,{
		rotation: speed * rotateMulti,
		transformOrigin: "50% 180%",
	})
	// Animate the floor lines
	floorMove1.timeScale(speed)
	floorMove2.timeScale(speed)
	floorMove3.timeScale(speed)
});

// Build the animation to scroll the floor
var floorMove1 = TweenMax.to(floorLine1,2,{
	strokeDashoffset: 600,
	ease:Linear.easeNone,
	repeat: -1
});

var floorMove2 = TweenMax.to(floorLine2,2,{
	strokeDashoffset: 280,
	ease:Linear.easeNone,
	repeat: -1
});

var floorMove3 = TweenMax.to(floorLine3,2,{
	strokeDashoffset: 280,
	ease:Linear.easeNone,
	repeat: -1
});

floorMove1.pause();
floorMove2.pause();
floorMove3.pause();

// Build animation to roll BB-8's body
var roll = TweenMax.to(body,2,{
	rotation: 360,
	transformOrigin: "50% 50%",
	ease:Linear.easeNone,
	repeat:-1
});
roll.pause();

// Making BB-8 jump on click
function jump(element,height) {
	var jump = TweenMax.to(element,0.2,{
		y: -height,
		ease: Power2.easeOut,
		onComplete: function() {
			TweenMax.to(element,0.5,{
				y: 0,
				ease: Bounce.easeOut
			});
		}
	});
}
$(document).on("click", function(){
	var bodyHeight = 50;
	jump(body,bodyHeight);
	jump(shadow,bodyHeight);
	jump(outline,bodyHeight);
	jump(head,85);
  // 	Play BB-8 sound
	var $rand = Math.floor(Math.random() * 5) + 1;
	$('#audio-'+$rand).get(0).play();
});