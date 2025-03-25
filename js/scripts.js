WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Services slider
	const servicesSliders = [],
		services = document.querySelectorAll('.services .swiper')

	services.forEach((el, i) => {
		el.classList.add('services_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			loopAdditionalSlides: 1,
			spaceBetween: 20,
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				1024: {
					slidesPerView: 3
				},
				1280: {
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.service')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.service')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		servicesSliders.push(new Swiper('.services_s' + i, options))
	})


	// Projects slider
	const projectsSliders = [],
		projects = document.querySelectorAll('.projects .swiper')

	projects.forEach((el, i) => {
		el.classList.add('projects_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			loopAdditionalSlides: 1,
			spaceBetween: 15,
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				1024: {
					slidesPerView: 3
				},
				1280: {
					slidesPerView: 4
				}
			}
		}

		projectsSliders.push(new Swiper('.projects_s' + i, options))
	})


	// Portfolio slider
	const portfolioSliders = [],
		portfolio = document.querySelectorAll('.portfolio .swiper')

	portfolio.forEach((el, i) => {
		el.classList.add('portfolio_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			loopAdditionalSlides: 1,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
			},
			breakpoints: {
				0: {
					spaceBetween: 15,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 15,
					slidesPerView: 2
				}
			}
		}

		portfolioSliders.push(new Swiper('.portfolio_s' + i, options))


		// Filter
		$('.portfolio .filter_slider .btn').click(function(e) {
			e.preventDefault()

			let filters = []

			// Toggle button class
			$(this).toggleClass('active')

			// Get filters
			$('.portfolio .filter_slider .btn').each(function() {
				if ($(this).hasClass('active')) {
					filters.push($(this).data('filter'))
				}
			})

			// Hide all slides
			$('.portfolio .swiper-slide').hide()

			// Show filtered slides
			filters.length
				? filters.forEach(el => $('.portfolio .swiper-slide[data-filter="'+ el +'"]').show())
				: $('.portfolio .swiper-slide').show()

			// Update slider
			portfolioSliders[i].updateSlides()
		})
	})


	// Partners slider
	const partnersSliders = [],
		partners = document.querySelectorAll('.partners .swiper')

	partners.forEach((el, i) => {
		el.classList.add('partners_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			lazy: true,
			loopAdditionalSlides: 1,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false
			},
			breakpoints: {
				0: {
					spaceBetween: 40
				},
				1024: {
					spaceBetween: 48
				},
				1280: {
					spaceBetween: 55
				}
			}
		}

		partnersSliders.push(new Swiper('.partners_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, header .close_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Menu
	$('header .sub_menu a.sub_link').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ($(e.target).closest('.summary').length === 0) {
			$('.portfolio .head .summary .mob_btn').removeClass('active')
			$('.portfolio .head .summary .text').fadeOut(200)

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Portfolio - Mob. summary
	$('.portfolio .head .summary .mob_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? $('.portfolio .head .summary .text').fadeIn(300)
			: $('.portfolio .head .summary .text').fadeOut(200)
	})


	// Reels
	$('.reels .close_btn').click(function(e) {
		e.preventDefault()

		$('.reels').fadeOut(200)
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})