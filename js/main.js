// mediaslider();
// function mediaslider(){
//   if (container.clientWidth < 1025)
//   {
//     slidesToShow = 2;
//     slidesToScroll = 2;
//   }
//   else if (container.clientWidth<=480)
//         {
//           slidesToShow = 1;
//           slidesToScroll = 1;
//         }
// }
// const itemWidth = track.clientWidth / slidesToShow;
// const itemWidth = container.clientWidth / slidesToShow;
//---------------------------------КАРУСЕЛЬ
let position = 0;
const slidesToShow = 3;
const slidesToScroll = 3;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
});

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkBtns();

//---------------------------------КАРУСЕЛЬ2
const $slider = document.querySelector('[data-slider="Slider"]');
const slider = new Slider($slider, {
  loop: true,
  autoplay: true,
  interval: 5000,
  refresh: true,
});
//---------------------------------ПЛАВНАЯ ПРОКРУТКА К СЕКЦИИ
// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 400,
      framesCount = 20;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    e.preventDefault(); // убираем стандартное поведение
    
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      let scrollBy = coordY / framesCount; // считаем на сколько скроллить за 1 такт
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента  и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy); // то скроллим на к-во пикселей, которое соответствует одному такту
      } else {
        window.scrollTo(0, coordY); // иначе добираемся до элемента и выходим из интервала
        clearInterval(scroller);
      }
    }, animationTime / framesCount); // время интервала равняется частному от времени анимации и к-ва кадров
  });
});

//---------------------------------ПРОКРУТКА В НАЧАЛО
const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOfset || document.documentElement.scrollTop;

const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength / height);

  if (dashoffset==0){
    scrollUp.style.color = 'rgb(150, 115, 55)'
  }
  else {
    scrollUp.style.color = '#fff'
  }

  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

window.addEventListener('scroll', () => {
  updateDashoffset()

  if (getTop() > offset){
    scrollUp.classList.add('scroll-up--active');
  } else {
    scrollUp.classList.remove('scroll-up--active');
  }
});

scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//---------------------------------АНИМАЦИЯ ПРИ СКРОЛЕ
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0){
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(){
    for (let index = 0; index < animItems.length; index++){
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight){
        animItemPoint =  window.innerHeight - window.innerHeight / animStart; 
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')){
          animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  setTimeout(() => {
    animOnScroll();
  }, 300)
}

//---------------------------------МЕНЮ
const menu = document.querySelectorAll('.menu__btn');
[].forEach.call(menu,function(el){
  el.addEventListener('click', function (e){
    e.preventDefault();
    this.classList.toggle("menu__btn--active");
    document.querySelector('.menu__list').classList.toggle("menu__list--active");
  });
});
// const menu = document.querySelector('.menu__btn');
// menu.addEventListener('click', function(e) {
//   e.preventDefault();
//   menu.classList.toggle("menu__btn--active");
//   document.querySelector('.menu__list').classList.toggle("menu__list--active");
//   document.querySelector('.header__inner').classList.toggle("header__inner--active");
// });

