var gallery = document.querySelector('.gallery');
var galleryItems = document.querySelectorAll('.gallery-item');
var itemWidth = 20;

var featured = document.querySelector('.featured-item');
var leftBtn = document.querySelector('.move-btn.left');
var rightBtn = document.querySelector('.move-btn.right');
var leftInterval;
var rightInterval;
var scrollRate = 0.2;
var left;

function selectItem(e) {
  if (e.target.classList.contains('active')) return;
  featured.style.backgroundImage = e.target.style.backgroundImage;
  for (var i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].classList.contains('active'))
      galleryItems[i].classList.remove('active');
  }
  e.target.classList.add('active');
}

function galleryWrapLeft() {
  var first = gallery.children[0];
  gallery.removeChild(first);
  gallery.style.left = -itemWidth + '%';
  gallery.appendChild(first);
  gallery.style.left = '0%';
}

function galleryWrapRight() {
  var last = gallery.children[gallery.children.length - 1];
  gallery.removeChild(last);
  gallery.insertBefore(last, gallery.children[0]);
  gallery.style.left = '-' + itemWidth + '%';
}

function moveLeft() {
  left = left || 0;
  leftInterval = setInterval(function() {
    gallery.style.left = left + '%';
    if (left > -itemWidth) {
      left -= scrollRate;
    } else {
      left = 0;
      galleryWrapLeft();
    }
  }, 1);
}

function moveRight() {
  if (left > -itemWidth && left < 0) {
    left = left - itemWidth;
    var last = gallery.children[gallery.children.length - 1];
    gallery.removeChild(last);
    gallery.style.left = left + '%';
    gallery.insertBefore(last, gallery.children[0]);
  }
  left = left || 0;
  leftInterval = setInterval(function() {
    gallery.style.left = left + '%';
    if (left < 0) {
      left += scrollRate;
    } else {
      left = -itemWidth;
      galleryWrapRight();
    }
  }, 1);
}

function stopMovement() {
  clearInterval(leftInterval);
  clearInterval(rightInterval);
}

leftBtn.addEventListener('mouseenter', moveLeft);
leftBtn.addEventListener('mouseleave', stopMovement);
rightBtn.addEventListener('mouseenter', moveRight);
rightBtn.addEventListener('mouseleave', stopMovement);

(function init() {
  var images = [
    'Axe Lalime_01.jpeg',
    'Axe Lalime_02.jpeg',
    'Axe Lalime_03.jpeg',
    'Axe Lalime_04.jpeg',
    'Axe Lalime_05.jpeg',
    'Axe Lalime_06.jpeg',
    'Axe Lalime_07.jpeg',
    'Axe Lalime_08.jpeg',
    'Axe Lalime_09.jpeg',
    'Axe Lalime_10.jpeg',
    'Axe Lalime_11.jpeg',
    'Axe Lalime_12.jpeg',
    'Axe Lalime_13.jpeg'
  ];
  
  featured.style.backgroundImage = 'url("' + images[0] + '")';
  
  for (var i = 0; i < galleryItems.length; i++) {
    if (images[i]) {
      galleryItems[i].style.backgroundImage = 'url("' + images[i] + '")';
      galleryItems[i].addEventListener('click', selectItem);
    }
  }
})();