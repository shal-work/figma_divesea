import scrolling from '../components/scrolling';
import SliderClass from '../components/slider-class';
import SliderClassVertical from '../components/slider-class-vertical';
import tnAtom from '../components/tn-atom';
import formsUpload from '../components/forms';

// Через стили анимации fadeInLeft в режиме animation-fill-mode: forwards (Лучший)
// работа с бургером по старому
// Добавляем класс active, для замены бургера на крестик (это в css)
// удаляем меню после click по пункту меню
// $('.header__burger').on('click', function() {
//     $('.header').toggleClass("fadeIn--open");
// });

// $('.menu').on('click', function() {
//     $('.header').toggleClass("fadeIn--open");
// });
// $('.btn-divesea').on('click', function() {
//     $('.header').toggleClass("fadeIn--open");
// });

$('.header__burger').on('click', () => {toggleBurger()});
$('.menu').on('click', () => {toggleBurger()});
$('.btn-divesea').on('click', () => {toggleBurger()});
$('.header__btn').on('click', () => {toggleBurger()});
function toggleBurger () {
    $('.header').toggleClass("fadeIn--open");
    $('.page').toggleClass('none-scroll');
}

let cHero1, cFirst, cHero2, cWeekly;

try {
    cFirst = new SliderClass ({
        selector: '.illustration',
        inner: '.illustration__inner',
        slides: '.illustration__slides',
        items: '.illustration__item',
        btnsNext: '[data-slide="next"]',
        btnsPrev: '[data-slide="prev"]',
        indicators: ''
      }
    );
} catch (error) {}

try {
    cHero1 = new SliderClass ({
        selector: '.hero__grid',
        inner: '.hero__active-inner',
        slides: '.hero__active-slides',
        items: '.hero__active-item',
        btnsNext: '[data-slide="next"]',
        btnsPrev: '[data-slide="prev"]',
        indicators: ''
      }
    );
} catch (error) {}

try {
    cHero2 = new SliderClassVertical ({
        selector: '.hero__grid',
        inner: '.hero__following-inner',
        slides: '.hero__following-slides',
        items: '.hero__following-item',
        btnsNext: '[data-slide="next"]',
        btnsPrev: '[data-slide="prev"]',
        indicators: ''
      }
    );
} catch (error) {}

try {
    cWeekly = new SliderClass ({
        selector: '.weekly',
        inner: '',
        slides: '.weekly__slides',
        items: '.card',
        btnsNext: '[data-slide="next"]',
        btnsPrev: '[data-slide="prev"]',
        indicators: ''
      }
    );
} catch (error) {}

$('.btn-unleash').click(() => {
    $('.community').fadeToggle(500, 'flex');
    $('.questions').fadeToggle(500, 'block');
})

window.addEventListener('DOMContentLoaded', (e) => {
    try {
        cFirst.render();
    } catch (error) {}
    try {
        cHero1.render();
    } catch (error) {}
    try {
        cHero2.render();
    } catch (error) {}
    try {
        cWeekly.render();
    } catch (error) {}
    try {
        tnAtom();
    } catch (error) {}
    try {
        formsUpload();
    } catch (error) {}
});
let widthWidow = 0;
window.addEventListener('resize', (e) => {
    if (widthWidow !== e.target.outerWidth) {
        try {
            tnAtom();
        } catch (error) {}
    }
});

//для карточки card Perperzon сердечко красное
$('.card__icon-heart').on('click', () => {
    $('.card__icon-heart').toggleClass("card__icon-heart-red");
});


//для попуп
$('.history').hide();
$('.discover-product__btn').on('click', (e) => {
    e.preventDefault();
    $(['.popup-baner']).addClass('popup-baner-active');
    $('.main').toggleClass('blur');
    $('.page').toggleClass('none-scroll');
});

$(`[data-btn="popup"]`).on('click', (e) => {
    e.preventDefault();
    $('.popup-baner').removeClass('popup-baner-active');
    $('.main').toggleClass('blur');
    $('.page').toggleClass('none-scroll');
    $('.history').show();
});
$(`[data-btn="popup-in"]`).on('click', (e) => {
    e.preventDefault();
    $('.history').show();
    let input = document.querySelectorAll('.popup__bid');
    for (let index = 0; index < input.length; index++) {
        input[index].value = '';
    }
});



// $.prototype.tab = function(active='') {

$.prototype.inputChange = (inputName, inputNameActive ) => {
    let input = document.querySelector(inputName);
    if (input.value.length > 0) {
        $(inputName).addClass(inputNameActive);
    } else {
        $(inputName).removeClass(inputNameActive);
    }
};


$('.sell__name').on('input', function(e) { 
    $(this).inputChange('.sell__name', 'sell__wrap-active');
})
$('.sell__description').on('input', function(e) { 
    $(this).inputChange('.sell__description', 'sell__wrap-active');
})
$('.sell__bid').on('input', function(e) { 
    $(this).inputChange('.sell__bid', 'sell__wrap-active');
})
$('.sell__tags').on('input', function(e) { 
    $(this).inputChange('.sell__tags', 'sell__wrap-active');
})
$('.sell__size').on('input', function(e) { 
    $(this).inputChange('.sell__size', 'sell__wrap-active');
})


$('.sell__royalty').click( function() {
    $(this).addClass('sell__wrap-active');
})

$('.sell__token').click( function() {
    $(this).addClass('sell__wrap-active');
})
$('.sell__in').click( function() {
    $(this).addClass('sell__wrap-active');
})

$('.unleash__btn').click( function() {
    $(this).toggleClass('unleash__btn-un');
    if($(this).html() == 'Follow') {
        $(this).html('Unfollow');
    } else {
        $(this).html('Follow');
    }
})


