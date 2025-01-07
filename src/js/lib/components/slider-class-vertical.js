'use strict'
import SliderClass, {CLASS_INDICATOR_ACTIVE, CLASS_CONTROL_DISABLED } from './slider-class';

export default class SliderClassVertical extends SliderClass  {
	constructor(selector, inner, slides, items, btnsNext, btnsPrev, indicators ) {
        super(selector, inner, slides, items, btnsNext, btnsPrev, indicators);
	}

	reset() {
		// debugger
		this.offset = 0;
		this.slideIndex = 0;
		this.direction = 'next';
		// this.quantityInWindow = Math.round(this.inner.offsetWidth / this.items[0].offsetWidth);
		this.quantityIn= Math.round(this.inner.offsetHeight / this.items[0].offsetHeight);
		// this.widthHeight = window.getComputedStyle(this.inner).height.split('.')[0].replace(/\D/g, ''); //(2000.99222px или 2000px) выдаст 2000;
		this.widthHeight = this.inner.offsetHeight; //(2000.99222px или 2000px) выдаст 2000;
		this.width = this.widthHeight / this.quantityIn;
		this.slides.style.transform = '';

		try {
			this.indicators.forEach(dot => dot.classList.remove(CLASS_INDICATOR_ACTIVE));
			this.indicators[0].classList.add(CLASS_INDICATOR_ACTIVE);
		} catch (error) {}

		this.endIndex = this.items.length - this.quantityIn;
		// сделаем невидимой левую кнопку
		if (this.btnsPrev) {
			this.btnsPrev.classList.add(CLASS_CONTROL_DISABLED);
		}
	}
	moveTo(index) {
		this.slideIndex = index;
		this.offset = -(+this.width) * index;
		// this.slides.style.transform = `translateX(${this.offset}px)`;
		this.slides.style.transform = `translateY(${this.offset}px)`;

		try {
			this.indicators.forEach(dot => dot.classList.remove(CLASS_INDICATOR_ACTIVE));
			this.indicators[this.slideIndex].classList.add(CLASS_INDICATOR_ACTIVE);
		} catch (error) {}


		this.updateControl();
		this.updateIndicators();
	}
	move() {
		if (this.direction === 'next') {
			this.slideIndex++;
		} else {
			this.slideIndex--;
		}
		if (this.slideIndex > this.endIndex) {
			this.slideIndex = this.endIndex;
			return
		} if (this.slideIndex < 0) {
			this.slideIndex = 0;
			return
		}
		if(this.btnsPrev) {
			this.btnsPrev.classList.remove(CLASS_CONTROL_DISABLED);
		}
		if(this.btnsNext) {
			this.btnsNext.classList.remove(CLASS_CONTROL_DISABLED);
		}

		let step = this.direction === 'next' ? -(+this.width) : (+this.width);
		this.offset += step;

		// this.slides.style.transform = `translateX(${this.offset}px)`;
		this.slides.style.transform = `translateY(${this.offset}px)`;
		this.updateControl();
	    this.updateIndicators();
	}
	clickIndicators() {
		try {
			for (let i = 0; i < this.indicators.length; i++) {
				this.indicators[i].addEventListener('click', (e) => {
					const slideTo = e.target.getAttribute('data-slide-to');
					this.moveTo(slideTo);
				});
			}
		} catch (error) {
			
		}

	}
	updateIndicators() {
		try {
			if (!this.indicators.length) {
				return;
			}
			this.indicators.forEach(dot => dot.classList.remove(CLASS_INDICATOR_ACTIVE));
			this.indicators[this.slideIndex].classList.add(CLASS_INDICATOR_ACTIVE);
		} catch (error) {}
	}
	updateControl() {
		if(this.btnsPrev) {
			this.btnsPrev.classList.remove(CLASS_CONTROL_DISABLED);
		}
		if(this.btnsNext) {
			this.btnsNext.classList.remove(CLASS_CONTROL_DISABLED);
		}
		if (this.slideIndex >= this.endIndex) {
			// this.btnsNext.classList.add(CLASS_CONTROL_DISABLED);
			if(this.btnsNext) {
				this.btnsNext.classList.add(CLASS_CONTROL_DISABLED);
			}
		}
		if (this.slideIndex <= 0) {
			// this.btnsPrev.classList.add(CLASS_CONTROL_DISABLED);
			if(this.btnsPrev) {
				this.btnsPrev.classList.add(CLASS_CONTROL_DISABLED);
			}
		}
	}
	clickNext() {
		if(this.btnsNext) {
			this.btnsNext.addEventListener('click', (e) => {
				e.preventDefault();
				this.direction = e.target.dataset.slide; //если data-slide
				this.move();
			})
		}
	}
	clickPrev() {
		if(this.btnsPrev){
			this.btnsPrev.addEventListener('click', (e) => {
				e.preventDefault();
				this.direction = e.target.dataset.slide; //если data-slide
				this.move();
			});
		}
	}
	render() {
		this.reset();
		this.clickIndicators();
		this.clickNext();
		this.clickPrev();
		this.swipe();
	}
}
