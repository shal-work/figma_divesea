const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 2000) {

            if ( document.querySelector('.pageup').hasAttribute('data-show')) {
                upElem.classList.add('fadeIn');
                upElem.classList.remove('fadeOut');
            }

        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });
};

export default scrolling;
