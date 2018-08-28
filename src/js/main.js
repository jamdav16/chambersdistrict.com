var moveLeft = null, 
    moveRight = null, 
    bodyEle = document.scrollingElement || document.documentElement;

window.onload = function(e){ 
    document.getElementsByClassName("loading")[0].classList.add('hide');
    document.getElementsByClassName("front-shop")[0].classList.add('loaded');
    document.getElementsByClassName("building")[0].classList.add('loaded');
    document.getElementsByClassName("rooftop-bar")[0].classList.add('loaded');
    document.getElementsByClassName("background__sky")[0].classList.add('loaded');
}

//
//
//

function scrollTo(to, duration, direction) {

    to = (direction && direction == 'lr' ? to + 20 : to)
    
    var start = (direction && direction == 'lr' ? bodyEle.scrollLeft : bodyEle.scrollTop),
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function() {        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        if(direction && direction == 'lr') {
            bodyEle.scrollLeft = val;
        } else {
            bodyEle.scrollTop = val;
        }
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

//
//
//

// Detect if its a mobile device
var isMobile = window.matchMedia("only screen and (max-width: 640px)");

if (!isMobile.matches) {

    document.getElementById("rarr__arrow").addEventListener("mouseover", function() {
        moveRight = setInterval(function () {
            if((bodyEle.clientWidth + bodyEle.scrollLeft) <= bodyEle.scrollWidth) {
                bodyEle.scrollLeft += 2;
            }
        }, 0);
    });
    
    document.getElementById("rarr__arrow").addEventListener("mouseout", function() {
        clearInterval(moveRight);
    });
    
    document.getElementById("larr__arrow").addEventListener("mouseover", function() {
        moveLeft = setInterval(function () {
            if((bodyEle.clientWidth + bodyEle.scrollLeft) <= bodyEle.scrollWidth) {
                bodyEle.scrollLeft -= 2;
            }
        }, 0);
    });
    
    document.getElementById("larr__arrow").addEventListener("mouseout", function() {
        clearInterval(moveLeft);
    });
    
    function arrowUpdate() {
        if(bodyEle.scrollLeft == 0 || bodyEle.scrollTop != 0 || document.querySelector("section.home").style.marginTop == '65vh' || document.querySelector("section.home").style.marginLeft == '70vw') {
            document.getElementById("larr__arrow").style.display = 'none';
        } else {
            document.getElementById("larr__arrow").style.display = 'block';
        }
        if((bodyEle.clientWidth + bodyEle.scrollLeft) == bodyEle.scrollWidth || bodyEle.scrollTop != 0 || document.querySelector("section.home").style.marginTop == '65vh' || document.querySelector("section.home").style.marginLeft == '70vw') {
            document.getElementById("rarr__arrow").style.display = 'none';
        } else {
            document.getElementById("rarr__arrow").style.display = 'block';
        }
    }
    
    window.onscroll = function (e) {
        var elements = document.querySelectorAll('section');
        for (var i = 0; i < elements.length; i++) {
            
            if(elements[i].offsetLeft == bodyEle.scrollLeft && elements[i].offsetTop == bodyEle.scrollTop) {
                document.querySelector('[data-go="' + elements[i].className + '"]').classList.add('selected');
            } else {
                document.querySelector('[data-go="' + elements[i].className + '"]').classList.remove('selected');
            }
            arrowUpdate();
        }
    }
    
    var myitem = window;
    if (window.addEventListener) {
        window.addEventListener("mousewheel", MouseWheelHandler, false);
        window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    } else {
        window.attachEvent("onmousewheel", MouseWheelHandler);
    }
    
    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    
        if(document.querySelector("section.home").style.marginTop != '65vh' && document.querySelector("section.home").style.marginLeft != '70vw' && bodyEle.scrollTop == 0) {
    
            if(delta !== 1) {
                if((bodyEle.clientWidth + bodyEle.scrollLeft) <= bodyEle.scrollWidth) {
                    bodyEle.scrollLeft += 100;
                }
            } else {
                if((bodyEle.clientWidth + bodyEle.scrollLeft) <= bodyEle.scrollWidth) {
                    bodyEle.scrollLeft -= 100;
                }
            }
    
        }
    }

    //
    // DATA GO FOR DESKTOP
    //

    document.querySelectorAll('[data-go]').forEach(function(elem) {
        if(elem.dataset.go == 'about') {

            elem.addEventListener('click', function(event) {
                scrollTo(-20, 500, 'lr');
                setTimeout(function(){ scrollTo(-20, 500); }, 500);

                history.pushState({}, this.innerText, this.href);
                document.title = this.innerText.toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase() }) + ' - Chambers District Footscray';

                document.querySelectorAll('[data-go]').forEach(function(item) { item.classList.remove('selected'); });

                document.querySelector('[data-go="' + this.dataset.go + '"]').classList.add('selected');

                setTimeout(function(){
                    document.querySelector("section.home").style.marginLeft = '70vw';
                    document.querySelector("section.home").style.marginTop = '0px';
                    arrowUpdate();
                }, 1000);

                setTimeout(function(){
                    document.querySelector(".content__about").style.height = '60%';
                }, 2000);

                if(document.querySelector(".content__rooftop-bar").style.height == '60%') {
                    document.querySelector(".content__rooftop-bar").style.height = '0';
                }

                event.preventDefault();
            });

        } else if(elem.dataset.go == 'rooftop-bar') {

            elem.addEventListener('click', function(event) {
                scrollTo(-20, 500, 'lr');
                setTimeout(function(){ scrollTo(-20, 500); }, 500);

                history.pushState({}, this.innerText, this.href);
                document.title = this.innerText.toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase() }) + ' - Chambers District Footscray';

                document.querySelectorAll('[data-go]').forEach(function(item) { item.classList.remove('selected'); });

                document.querySelector('[data-go="about"]').classList.remove('selected');
                document.querySelector('[data-go="' + this.dataset.go + '"]').classList.add('selected');

                setTimeout(function(){
                    document.querySelector("section.home").style.marginTop = '65vh';
                    document.querySelector("section.home").style.marginLeft = '0px';
                    document.querySelector(".content__about").style.height = '0';
                    arrowUpdate();
                }, 1000);

                setTimeout(function(){
                    document.querySelector(".content__rooftop-bar").style.height = '60%';
                }, 2000);

                if(document.querySelector(".content__about").style.height == '60%') {
                    document.querySelector(".content__about").style.height = '0';
                }

                event.preventDefault();
            });

        } else {

            elem.addEventListener('click', function(event) {
                var section = document.querySelector("section."+this.dataset.go);

                history.pushState({}, this.innerText, this.href);
                document.title = this.innerText ? this.innerText.toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase() }) + ' - Chambers District Footscray' : 'Chambers District - Maddern Square, Footscray';

                document.querySelectorAll('[data-go]').forEach(function(item) { item.classList.remove('selected'); });
                
                if(document.querySelector(".content__rooftop-bar").style.height == '60%') {
                    document.querySelector(".content__rooftop-bar").style.height = '0';
                }

                if(document.querySelector(".content__about").style.height == '60%') {
                    document.querySelector(".content__about").style.height = '0';
                }

                if(document.querySelector("section.home").style.marginTop == '65vh' || document.querySelector("section.home").style.marginLeft == '70vw') {
                    document.querySelector("section.home").style.marginTop = '0px';
                    document.querySelector("section.home").style.marginLeft = '0px';
                    
                    setTimeout(function() {

                        if(bodyEle.scrollLeft == 0 && section.offsetLeft == 0) {
                            scrollTo(section.offsetTop, 500);
                        } else if(bodyEle.scrollLeft == 0 && section.offsetLeft > 0) {
                            scrollTo(section.offsetTop, 500);
                            setTimeout(function(){ scrollTo(section.offsetLeft, 500, 'lr'); }, 500);
                        } else {
                            scrollTo(section.offsetLeft - 20, 500, 'lr');
                            setTimeout(function(){ scrollTo(section.offsetTop, 500); }, 500);
                        }

                    }, 1000);
                } else {

                    if(bodyEle.scrollLeft == 0 && section.offsetLeft == 0) {
                        scrollTo(section.offsetTop, 500);
                    } else if(bodyEle.scrollLeft == 0 && section.offsetLeft > 0) {
                        scrollTo(section.offsetTop, 500);
                        setTimeout(function(){ scrollTo(section.offsetLeft, 500, 'lr'); }, 500);
                    } else {
                        scrollTo(section.offsetLeft - 20, 500, 'lr');
                        setTimeout(function(){ scrollTo(section.offsetTop, 500); }, 500);
                    }

                }

                event.preventDefault();
            });

        }
    });

} else {

    //
    // DATA GO FOR MOBILE
    //

    document.querySelector('.dropdown-menu').addEventListener('click', function(event) {
        if(document.querySelector('header ul').style.display === 'none' || document.querySelector('header ul').style.display === '') {
            document.querySelector('header ul').style.display = 'block';
        } else {
            document.querySelector('header ul').style.display = 'none';
        }
        event.preventDefault();
    });

    document.querySelectorAll('[data-go]').forEach(function(elem) {

        elem.addEventListener('click', function(event) {

            document.querySelectorAll('section, .content__rooftop-bar, .content__about').forEach(function(item) { item.classList.remove('sectvisib'); });

            // Close the menu
            document.querySelector('header ul').style.display = 'none';

            if(this.dataset.go == 'home') {

            } else if(this.dataset.go == 'rooftop-bar') {

                var section = document.querySelector(".content__rooftop-bar");

                section.classList.add('sectvisib');

            } else if(this.dataset.go == 'about') {

                var section = document.querySelector(".content__about");

                section.classList.add('sectvisib');

            } else {

                var section = document.querySelector("section."+this.dataset.go);

                section.classList.add('sectvisib');

            }

            event.preventDefault();

        });

    });

    document.querySelectorAll('.closemodal').forEach(function(elem) {
        
        elem.addEventListener('click', function(event) {

            document.querySelectorAll('section, .content__rooftop-bar, .content__about').forEach(function(item) { item.classList.remove('sectvisib'); });

            event.preventDefault();

        });

    });

}