import $ from '../core';

$.prototype.accordionTriad = function(
                            head = '.accordion__head',
                            action = '.accordion__action',
                            content = '.accordion__content',
                            headActive = 'accordion__head-active',
                            actionActive = 'accordion__action-active',
                            contentActive = 'accordion__content-active'
                        ) {
    for (let i = 0; i < this.length; i++) {

        $(this[i]).find(action).click(()=> {
            $(this[i]).find(head).toggleClass(headActive);
            $(this[i]).find(content).toggleClass(contentActive);
            $(this[i]).find(content).toggleClass('fadeIn');
            $(this[i]).find(action).toggleClass(actionActive);
        })
    }
};
$('.triad__grid.accordion').accordionTriad();
