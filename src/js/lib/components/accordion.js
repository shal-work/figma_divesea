import $ from '../core';

$.prototype.accordion = function(headActive = 'accordion-head--active', contentActive = 'accordion__content--active', paddings = 40) {
// $.prototype.accordion = function(headActive = 'faq-active', textActive = 'faq-text-active', titltActive = 'faq-title-active', ) {
    // for (let i = 0; i < this.length; i++) {
    //     $(this[i]).click(() => {
    //         $(this[i]).toggleClass(headActive);
    //         // console.log( $(this[i]).find('.questions__faq-text'));
    //         $(this[i]).find('.questions__faq-text').toggleClass(textActive);
    //         $(this[i]).find('.questions__faq-title').toggleClass(titltActive);

    //     });
    // }

    // по уроку Модуль-10
    // for (let i = 0; i < this.length; i++) {
    //     $(this[i]).click(() => {
    //         $(this[i]).toggleClass(headActive);
    //         $(this[i].nextElementSibling).toggleClass(contentActive); //найти у this[i] следюущий за ним элемент
    //         if (this[i].classList.contains(headActive)) {
    //             this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + paddings + "px";
    //         } else {
    //             this[i].nextElementSibling.style.maxHeight = "0px";
    //         }
    //     });
    // }


    // Структура аккодреона изменилась из-за написания по БЭМ (h2 + button)
    for (let i = 0; i < this.length; i++) {
        $(this[i]).click(() => {
            $(this[i]).toggleClass(headActive);
            $(this[i]).closest('.accordion').find('.accordion__content').toggleClass(contentActive); //обратимся к родителю по имени .accordion и потом у него найдем контенкт .questions__content и токлим в нем класс
            let content = $(this[i]).closest('.accordion').find('.accordion__content')[0];
            if (this[i].classList.contains(headActive)) {
                content.style.maxHeight = content.scrollHeight + paddings + "px";
                // можно так
                // const atom = document.querySelectorAll('.accordion__content');
                // atom[0].style.maxHeight = atom[0].scrollHeight + paddings + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        });
    }

};



$('.questions__faq .accordion__btn').accordion();
// $('.person__vector').accordion('person-head--active', 'accordion__content--active', 40);
// $('.person__wrap .accordion__btn').accordion('person-head--active', 'accordion__content--active', 40);
$('.person__wrap .accordion__btn').accordion('person-head--active'); //можно так



// $.prototype.accordion2 = function(headActive = 'accordion-head--active', contentActive = 'accordion__content--active', paddings = 40) {
//     // Структура аккодреона изменилась из-за написания по БЭМ (h2 + button)
//     for (let i = 0; i < this.length; i++) {
//         $(this[i]).click(() => {
//             $(this[i]).toggleClass(headActive);
//             $(this[i]).closest('.accordion').find('.accordion__content').toggleClass(contentActive); //обратимся к родителю по имени .accordion и потом у него найдем контенкт.questions__content и токлим в нем класс
//             let content = $(this[i]).closest('.accordion').find('.accordion__content')[0];
//             // debugger
//             if (this[i].classList.contains(headActive)) {
//                 content.style.maxHeight = content.scrollHeight + paddings + "px";
//                 // можно так
//                 // const atom = document.querySelectorAll('.accordion__content');
//                 // atom[0].style.maxHeight = atom[0].scrollHeight + paddings + "px";
//             } else {
//                 content.style.maxHeight = "0px";
//             }
//         });
//     }
// };
// $('.person__wrap .accordion__btn').accordion2('person-head--active', 'accordion__content--active', 40);