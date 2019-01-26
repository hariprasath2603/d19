var sea = document.querySelector('.sea');
var sand = document.querySelector('.sand');
var peach = document.querySelector('.peach');
var dot = document.querySelector('.dot');
var container = document.querySelector('.container');
var status = document.querySelector('.status');
var statusText = document.querySelector('.status__text');
var statusRight = document.querySelector('.status__right');

var intro = new TimelineMax({ delay: 0.3 });
var aim = new TimelineMax({ paused: true });

intro.timeScale(1.5);
intro.set(container, { opacity: 1 }, 0);


intro.fromTo(sea, 5, { strokeDashoffset: 0 }, { strokeDashoffset: 2000, ease: Power2.easeInOut }, 0);
intro.fromTo(sand, 5, { strokeDashoffset: 0 }, { strokeDashoffset: 200, ease: Expo.easeInOut }, 0);
intro.fromTo(peach, 5, { strokeDashoffset: -75 }, { strokeDashoffset: -320, ease: Power3.easeInOut }, 0);

intro.fromTo(sea, 5, { strokeDasharray: '1 30' }, { strokeDasharray: '2 30', ease: Power2.easeInOut }, 0);
intro.fromTo(sand, 5, { strokeDasharray: '30 35' }, { strokeDasharray: '20 45', ease: Expo.easeInOut }, 0);
intro.fromTo(peach, 5, { strokeDasharray: '40 60' }, { strokeDasharray: '30 180', ease: Power3.easeInOut }, 0);

intro.fromTo(sea, 5, { strokeWidth: 20 }, { strokeWidth: 5, ease: Power2.easeInOut }, 0);
intro.fromTo(sand, 5, { strokeWidth: 10 }, { strokeWidth: 70, ease: Expo.easeInOut }, 0);
intro.fromTo(peach, 5, { strokeWidth: 16 }, { strokeWidth: 110, ease: Power3.easeInOut }, 0);

intro.fromTo(sea, 2, { attr: { r: 0 } }, { attr: { r: 300 }, ease: Power2.easeOut }, 0);
intro.fromTo(sand, 2, { attr: { r: 0 } }, { attr: { r: 340 }, ease: Expo.easeOut }, 0);
intro.fromTo(peach, 2, { attr: { r: 0 } }, { attr: { r: 240 }, ease: Power3.easeOut }, 0);

intro.fromTo(sea, 5, { attr: { r: 300 } }, { attr: { r: 340 }, ease: Power2.easeInOut }, 0);
intro.fromTo(sand, 5, { attr: { r: 340 } }, { attr: { r: 280 }, ease: Expo.easeInOut }, 0);
intro.fromTo(peach, 5, { attr: { r: 240 } }, { attr: { r: 340 }, ease: Power3.easeInOut }, 0);

intro.fromTo(sea, 5, { rotation: 0 }, { rotation: -1000, transformOrigin: 'center', ease: Expo.easeInOut }, 0);
intro.fromTo(sand, 5, { rotation: 0 }, { rotation: -180, transformOrigin: 'center', ease: Power3.easeInOut }, 0);
intro.fromTo(peach, 5, { rotation: 0 }, { rotation: 180, transformOrigin: 'center', ease: Power3.easeInOut }, 0);

intro.fromTo(dot, 4, { attr: { r: 0 } }, { attr: { r: 5 }, ease: Power2.easeInOut }, 0);
intro.to(dot, 2, { strokeWidth: 3, ease: Expo.easeInOut }, 4);
// aim.to(dot, 0.3, {strokeWidth: 1, ease: Expo.easeInOut}, 0)



intro.eventCallback('onComplete', function (_) {
	document.body.addEventListener('mousedown', function (_) {
		aim.timeScale(0.7);
		aim.play();
		setStatus('locking target');
	});

	document.body.addEventListener('mouseup', function (_) {
		aim.timeScale(1.2);
		aim.reverse();
		setStatus('unlocking');
	});

	TweenMax.to(statusRight, 0.5, { opacity: 1, delay: 0.05 });
	TweenMax.from(statusRight, 0.6, { y: 10, ease: Power2.easeOut });
	setStatus('ready');
});

aim.eventCallback('onComplete', function (_) {
	setStatus('target locked');
});

aim.eventCallback('onReverseComplete', function (_) {
	setStatus('ready');
});

setStatus('booting...');


function setStatus(s) {
	var statusChange = new TimelineMax();
	statusChange.to(statusText, 0.3, { opacity: 0, onComplete: function onComplete(_) {
			statusText.textContent = s;
		} }, 0);
	statusChange.to(statusText, 0.3, { y: 10, ease: Power2.easeIn }, 0);

	statusChange.to(statusText, 0.3, { y: 0, ease: Power2.easeOut }, 0.3);
	statusChange.to(statusText, 0.3, { opacity: 1 }, 0.3);
}