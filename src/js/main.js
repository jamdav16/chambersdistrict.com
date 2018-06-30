var moveLeft = null, 
    moveRight = null, 
    bodyEle = document.scrollingElement || document.documentElement;

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
    var hometp = document.querySelector("section.home").style.marginTop;

    if(bodyEle.scrollLeft == 0 || bodyEle.scrollTop != 0 || document.querySelector("section.home").style.marginTop == '65vh') {
        document.getElementById("larr__arrow").style.display = 'none';
    } else {
        document.getElementById("larr__arrow").style.display = 'block';
    }
    if((bodyEle.clientWidth + bodyEle.scrollLeft) == bodyEle.scrollWidth || bodyEle.scrollTop != 0 || document.querySelector("section.home").style.marginTop == '65vh') {
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

//
//
//

document.querySelectorAll('[data-go]').forEach(function(elem) {
    if(elem.dataset.go == 'rooftop-bar') {

        elem.addEventListener('click', function(event) {
            scrollTo(0, 500, 'lr');
            setTimeout(function(){ scrollTo(0, 500); }, 500);

            document.querySelector('[data-go="' + this.dataset.go + '"]').classList.add('selected');

            setTimeout(function(){
                document.querySelector("section.home").style.marginTop = '65vh';
                arrowUpdate();
            }, 1000);

            setTimeout(function(){
                document.querySelector(".content__rooftop-bar").style.height = '60%';
            }, 2000);

            event.preventDefault();
        });

    } else {

        elem.addEventListener('click', function(event) {
            var section = document.querySelector("section."+this.dataset.go);

            // history.pushState({}, this.innerText, this.href);

            document.querySelector('[data-go="rooftop-bar"]').classList.remove('selected');
            
            if(document.querySelector(".content__rooftop-bar").style.height == '60%') {
                document.querySelector(".content__rooftop-bar").style.height = '0';
            }

            if(document.querySelector("section.home").style.marginTop == '65vh') {
                document.querySelector("section.home").style.marginTop = '0px';
                
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