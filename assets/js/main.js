/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);


    function refreshIframe() {
        var now = new Date();
        var targetTime = new Date(now);
        targetTime.setHours(24, 30, 0, 0); // Replace 10 with the desired hour and 30 with the desired minute for refresh

        var timeUntilRefresh = targetTime - now;
        if (timeUntilRefresh < 0) {
            // The target time has already passed today, schedule for tomorrow
            timeUntilRefresh += 24 * 60 * 60 * 1000;
        }

        setTimeout(function() {
            var iframe = document.getElementById('tracker'); // Replace 'tracker' with the actual ID of your iframe
            iframe.src = iframe.src; // Refresh the iframe content
            refreshIframe(); // Schedule the next refresh
        }, timeUntilRefresh);
    }

    refreshIframe(); // Start the refresh cycle

	window.addEventListener('load', function () {
		// Select the preloader and page content elements
		const preloader = document.querySelector('.preloader');
		const pageContent = document.querySelector('#wrapper');
	  
		// Function to handle clicking on the preloader
		function handleClick() {
		  preloader.style.display = 'none';
		  pageContent.style.display = 'block'; // Show the page content immediately
		}
	  
		// Hide the preloader when clicked
		preloader.addEventListener('click', handleClick);
		preloader.addEventListener('mouseleave', function () {
		  document.body.style.cursor = 'auto';
		});
	  });
	
	  window.addEventListener('DOMContentLoaded', function() {
		let slider = document.querySelector('.slider');
		let imageLinks = [
			{ imageUrl: 'images/1.gif', link: 'analytics_skills.html' },
			{ imageUrl: 'images/2.gif', link: 'mental_health.html' },
			{ imageUrl: 'images/3.gif', link: 'layoff.html' }
			// Add more image URLs and links as needed
		];
	
		function createArticle(imageUrl, link) {
			let article = document.createElement('article');
			let a = document.createElement('a');
			let img = document.createElement('img');
	
			a.href = link;
			a.className = 'image fit';
			img.src = imageUrl;
			img.alt = '';
			img.style.borderRadius = '20px';
			a.appendChild(img);
			article.appendChild(a);
			slider.appendChild(article);
		}
	
		function cloneImages() {
			let clonedArticles = slider.cloneNode(true).children;
			for (let article of clonedArticles) {
				slider.appendChild(article);
			}
		}
	
		// Create initial set of images
		imageLinks.forEach(function(imageLink) {
			createArticle(imageLink.imageUrl, imageLink.link);
		});
	
		let numImages = imageLinks.length;
	
		function startAutoplay() {
			slider.classList.add('play');
		}
	
		function stopAutoplay() {
			slider.classList.remove('play');
		}
	
		// Start autoplay and clone images for infinite loop
		startAutoplay();
		cloneImages();
	
		// Pause autoplay when mouse enters the slider
		slider.addEventListener('mouseenter', stopAutoplay);
	
		// Resume autoplay when mouse leaves the slider
		slider.addEventListener('mouseleave', startAutoplay);
	});
	
