import $ from '../core';

$.prototype.tab = function(active='') {
    // debugger
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', () => { //можно .click()
            $(this[i])
               .addClass(active) //добавляем активный класс
               .removeAttribute('aria-selected') // удаляем атрибут aria-selected="true"
               .setAttribute('aria-selected', true) //назначаем false для атрибута aria-selected
               .siblings() //находим всех соседей исключая текущий
               .removeClass(active) //удаляем активный класс у всех соседей
               .removeAttribute('aria-selected') // удалячем атрибут aria-selected="true" у всех соседей
               .setAttribute('aria-selected', false) //назначаем false для атрибута aria-selected у всех соседей
               //теперь надо перейти к контенту
               .closest('.tab') //обратимся к родителю по имени tab и потом от него найдем контенкт
               .find('.tab__content')//найде  у родителя класс контента
               .removeClass('tab__content--active')//убирем класс активности у всех элементов
               .removeAttribute('tabindex') //удаляем атрибут  tabindex="0"
               //.index() -  номер элемента по порядку
               .eq($(this[i]).index())//узнаем номер элемента среди tab-content, 
               .setAttribute('tabindex', 0) //добавляем атрибут tabindex="0"
               .addClass('tab__content--active'); //добавляем ему класс активности
        });
    }
};

// $('[data-tab-explore] .btn').tab('explore__item--active');
$('[data-tab-explore] .btn').tab('tab__btn--active');
// $('[data-tabpanel] .btn').tab('explore__item--active');
$('[data-tabpanel] .btn').tab('tab__btn--active');
$('[data-tab-person] .btn').tab('person__tab-btn--active');


