webpackJsonp([0],{

	/***/ 15:
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function($) {$.fn.extend({
			smoothScroll2: function(d) {

				var c = $.extend({
					speed: 2000,
					easing: 'swing',
					adjust: 0,
					forthTop: false,
					wheel: "off"
				}, d);

				var self = this;

				$('html,body').animate({ scrollTop: self.offset().top }, c.speed, c.easing);
				wheel();

				function wheel() {
					if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheelControll, false);
					window.onmousewheel = document.onmousewheel = wheelControll;
				}

				function wheelControll(event) {
					if ($("html, body").is(":animated")) {
						if (c.wheel == "on") {
							$("html, body").stop();
						} else {
							return false;
						}
					}
				};

				return this;

			}
		});

			function Grid(w, h, i) {
				this.init(w, h, i);
			}

			Grid.prototype = {

				init: function(w, h, i) {
					this.width = 0;
					this.height = 0;
					this.ratio = 0;

					this.tow = 0;
					this.toh = 0;
					this.tor = 0;

					this.id = i;
					this.maxWidth = w;
					this.maxHeight = h;
					this.defaultWidth = w;
					this.defaultHeight = w;
				}
			}


			function map(value, min_a, max_a, min_b, max_b) {
				var result = (value - min_a) * ((max_b - min_b) / (max_a - min_a)) + min_b
				return result;
			}

			$(function() {

				$('body').addClass('isLock')

				var isMobile = false;

				var mainImgWidth, mainImageHeight;
				var mainImgWidthMaxWidth = 670;
				var gridArray = [];
				var DefaultStageWidth = 1400;
				var scrollH = 0;

				var isAnimate = false;


				function convertToRatio(num) {
					//return Math.round(num / DefaultStageWidth * 100) / 100;
					return Math.round(num / DefaultStageWidth * 10000) / 10000;
				}

				function convertToPer(num) {
					return Math.round(num / DefaultStageWidth * 100);
				}

				function resize() {
					var ww = $(window).width();
					var wh = $(window).height();

					$('.view').width(ww).height(wh);

					// $('.globalnav').css({
					//     top: $('.line1 .item').eq(0).height()
					// })

					// if (!isMobile) {
					//     $('.gallery .slide').height(wh - 100);
					//     $('.view').height(wh);
					//     $('.furniture-gallery .slide').height(wh * 0.5);
					// }

					if ($('body').hasClass('pc')) {
						mainImgWidth = Math.floor(ww * 0.5);
					} else {
						mainImgWidth = ww;
					}

					// if (mainImgWidth > mainImgWidthMaxWidth) mainImgWidth = mainImgWidthMaxWidth;
					// var h = mainImgWidth - mainImgWidth * 0.22;
					// var h = mainImgWidth - mainImgWidth;
					mainImageHeight = Math.floor(mainImgWidth * 1.485)
					scrollH = wh - $('.site-main').outerHeight()

					resizeGrid();

				}

				// $(window).on('resize', resize).trigger("resize");
				// $(window).on('resize', resize);
				jQuery(window).resizeWidth(resize, {
					timeout: 100
				});

				function resizeGrid() {
					if (gridArray.length) {
						$('.grid').each(function(i) {
							var $this = $(this);

							var g = gridArray[i]
							g.width = $this.width();
							g.height = $this.height();
							// g.ratio = convertToPer(g.width);
							// console.log(g);
						});
					}
				}

				function setGrid() {

					$('.grid').each(function(i) {

						var $this = $(this);

						$this.data('gird_id', i)

						var w, h;

						if ($this.hasClass('item')) {
							var img = $this.find('img')[0];
							w = 719; //img.naturalWidth;
							h = 1080; //img.naturalHeight;
						}

						if ($this.hasClass('blank')) {
							w = parseFloat($this.data('wpc'));
							if (window.matchMedia('screen and (max-width:750px)').matches) {
								if (parseFloat($this.data('wsp'))) {
									w = parseFloat($this.data('wsp'));
								} else {
									w = 0;
								}
							}
							h = 0;
							$this.width(w);
						}
						var g = new Grid(w, h, i);
						g.width = w;
						g.height = h;
						g.ratio = convertToRatio(g.width);
						gridArray[i] = g;
						$this.css({
							'width': g.ratio * 100 + "vw"
						})
					});

					$('.detail').each(function() {
						var offsettop = $(this).offset().top;
						$(this).data('top', offsettop)
					})
				}

				var timer = false; /* グローバル変数 */
				$(window).resize(function() {
					if(timer !== false){
						clearTimeout(timer);
					}
					timer = setTimeout(function() {

					//rowの元サイズを保持
					$('.row .items').each(function() {
						var height = $(this).height();
						$(this).data('height', height)
					})

					}, 200);
				});


				function resetGrid() {
					var $detail = $('.detail.active');
					$detail.removeClass('active');

					$('.grid').each(function(i) {
						var id = $(this).data('gird_id');
						var g = gridArray[id]
						var $this = $(this);

						TweenMax.to($this, 1, {
							width: g.ratio * 100 + 'vw',
							opacity: 1,
							delay: 0,
							ease: "Linear",
							onComplete: function() {},
							onStart: function() {},
							onUpdate: function() {},
							ease: Quint.easeInOut,
						});
					})

					TweenMax
						.to($detail, 1, {
							width: 0,
							height: 0,
							opacity: 1,
							delay: 0,
							ease: Quint.easeInOut,
							// delay : 0.08,
						})
				}

				function viewDidLoaded() {
					$('.site-main').show();
					setGrid();
					resize();

					var wh = $(window).height();
					TweenMax.to($('#splash .heroimg'), 2, {
						opacity: 1,
						onComplete: function() {},
						onStart: function() {},
						onUpdate: function() {},
						ease: Quint.easeInOut,
					});

					TweenMax.to($('#splash'), 2.5, {
						y: wh,
						delay: 2,
						onComplete: function() {
						},
						onStart: function() {},
						onUpdate: function() {},
						ease: Quint.easeInOut,
					});

					$('body').removeClass('isLock');
					TweenMax.set($('.wrap'), {
						top: -$('.site-main').outerHeight() - 200
						// opacity : 1
					})

					TweenMax.to($('.wrap'), 2.5, {
							// top: $(window).height() - $('.site-main').outerHeight(),
							top: $(window).height() - $('.site-main').outerHeight() + 200,
							delay: 2,
							onComplete: function() {
								init();
								$('#splash').remove();
								$('.item').click(onClick);
								// $('.desc').click(function(e){
								// 	e.stopPropagation();
								// })
							},
							onStart: function() {
								// opacity : 1
								$('.section-items').fadeTo(1, 1)
								// $(window).scrollTop(-99999999999)
							},
							onUpdate: function() {},
							ease: Quint.easeInOut
						}
					);

					TweenMax.fromTo($('.globalnav'), 2.7, {
							y: -wh * 2.5,
						}, {
							y: 0,
							delay: 2,
							ease: Quint.easeInOut
						}
					);
				}


				// options
				$('.wrap').imagesLoaded({
						// options...
					},
					function() {
						// images have loaded
						viewDidLoaded();
					}
				)
					.always(function(instance) {
						// console.log('all images loaded');
					})
					.done(function(instance) {
						// console.log('all images successfully loaded');
					})
					.fail(function() {
						// console.log('all images loaded, at least one is broken');
					})
					.progress(function(instance, image) {
						var result = image.isLoaded ? 'loaded' : 'broken';
						var loadedPer = instance.progressedCount / instance.images.length;
					});

				function checkMainAreaBounds() {
				}
				function checkAreaBounds($row) {
					var thumbsW = 0
					var mainarea = 0;
					var blankW = 0;
					var blankNum = 0;
					var gridW = 0;
					var itemNum = 0;
					var gridTotalRatio = 0;
					var ww = $(window).width();
					var rate = {
						total: 0,
						thumb: 0,
						blank: 0
					};

					$row.find('.grid').each(function() {
						gridW += $(this).width();
						var id = $(this).data('gird_id');
						rate.total += gridArray[id].ratio;
					})
					$row.find('.item').each(function() {
						thumbsW += $(this).width();
						itemNum++;

						var id = $(this).data('gird_id');
						rate.thumb += gridArray[id].ratio;
					})

					$row.find('.blank').each(function() {
						blankW += $(this).width();
						blankNum++;

						var id = $(this).data('gird_id');
						rate.blank += gridArray[id].ratio;
					});

					detailArea = 1 - gridW / ww;
					var stageHalf = ww / 2;
					var bw = 0;
					var ratioToo = 0
					var detailAreaRatio = 0;
					detailAreaRatio = 0.5
					detailAreaRatio = 1 - detailAreaRatio;

					if (rate.total > detailAreaRatio) {
						ratioToo = rate.total - detailAreaRatio;
						var nokori = ratioToo - rate.blank;

						if (nokori > 0) {
							var thumbRatio = rate.thumb - nokori;
							$row.find('.item').each(function(i) {

								var id = $(this).data('gird_id');
								var g = gridArray[id];
								var value = map(g.ratio, 0, rate.thumb, 0, detailAreaRatio)

								TweenMax.to($(this), 1, {

									width: value * 100 + 'vw',
									opacity: 1,
									delay: 0,
									ease: "Linear",
									onComplete: function() {},
									onStart: function() {},
									onUpdate: function() {},
									ease: Quint.easeInOut,
								});
							})
							$row.find('.blank').each(function(i) {
								var id = $(this).data('gird_id');
								var g = gridArray[id];
								var value = map(g.ratio, 0, rate.blank, 0, nokori)

								if (value < 1) {
									value = 0;
								}

								TweenMax.to($(this), 1, {
									width: value * 100 + 'vw',
									opacity: 1,
									delay: 0,
									ease: "Linear",
									onComplete: function() {},
									onStart: function() {},
									onUpdate: function() {},
									ease: Quint.easeInOut,
								});
							})
						} else {
							$row.find('.blank').each(function(i) {
								var id = $(this).data('gird_id');
								var g = gridArray[id];

								var value = map(g.ratio, 0, rate.blank, 0, nokori * -1)

								if (value < 1) {
									value = 0;
								}

								TweenMax.to($(this), 1, {

									width: value * 100 + 'vw',
									opacity: 1,
									delay: 0,
									ease: "Linear",
									onComplete: function() {},
									onStart: function() {},
									onUpdate: function() {},
									ease: Quint.easeInOut,
								});
							})
						}
					} else {

					}
				}

				function animateComplete(active_id, detail_height, items_height) {
					var $target = $('.detail.active');
					var active_detail_top = 0;
					var wrap_top = parseInt($('.wrap').css('top'));
					var target_parent = $target.closest('.row');
					var target_top = target_parent.offset().top;
					var select_id = target_parent.attr('id');
					var height_difference = 0;

					if (active_id && select_id) {
						if (parseInt(active_id.replace(/index/g,'')) < parseInt(select_id.replace(/index/g,''))) {
							active_detail_top = detail_height;
							height_difference = $('#' + active_id + ' .items').data('height') - items_height;
						}
					}

					TweenMax
						.to($('.wrap'), 0.5, {
							top: wrap_top - height_difference - target_top + active_detail_top,
							onComplete: function() {
								var t = scrollH - $('.wrap').position().top;
								globalscrolly = t;
							}
						});
				}

				function setItemActive($obj) {
					$('.item.active').removeClass("active");
					$obj.addClass('active');
				}

				$(".item_piece_link").click(function() {

					var $item_piece = $(this);
					
					location.href = $item_piece.context.attributes.href.value;
				});

				function onClick() {
					var active_id = $('.detail.active').closest('.row').attr('id');
					var detail_height = 0;
					var items_height = 0;
					if (active_id) {
						detail_height = $('.detail.active').height();
						items_height = $('.detail.active').siblings('.items').height();
					}

					resetGrid();
					if ($(this).hasClass('active')) {
						$(this).removeClass('active')
						return false;
					}

					setItemActive($(this));

					var ww = $(window).width();
					var w = $(this).width();
					var $row = $(this).closest('.items');

					checkAreaBounds($row);

					var src = $(this).find('img').attr('src').replace('list', 'detail');

					if ($('body').hasClass('pc')) {
						var $target = $(this).next();
					} else {
						var index = $(this).data('index');
						var $target = $(this).closest('.items').siblings('.detail[data-index="' + index + '"]');
					}
					$target.addClass('active');

					animateComplete(active_id, detail_height, items_height);
					TweenMax.set($target, {
						height: 0
					})

					TweenMax
						.to($target, 1, {
							width: mainImgWidth,
							opacity: 1,
							delay: 0,
							ease: Quint.easeInOut,
							// delay : 0.08,
						})

					TweenMax
						.to($target, 1, {
							height: mainImageHeight,
							delay: 0.2,
							ease: Expo.easeInOut
						});
				}

				var mover = {};
				mover.x = 0;
				mover.y = 0;
				mover.startX = 0;
				mover.startY = 0;
				mover.endX = 0;
				mover.endY = 0;
				mover.oldX = 0;
				mover.oldY = 0;
				mover.newX = 0;
				mover.newY = 0;

				function init() {
					$(document).on('mousewheel', mouseScroll);
					$('body').on('touchstart', function(e) {
						// e.preventDefault();                  // 繝壹・繧ｸ縺悟虚縺・◆繧翫∝渚蠢懊ｒ豁｢繧√ｋ・・ 繧ｿ繧ｰ縺ｪ縺ｩ・�

						// iPadの対応・・・いいのか？
						//mover.startX = event.changedTouches[0].pageX; // X 蠎ｧ讓吶・菴咲ｽｮ
						//mover.startY = event.changedTouches[0].pageY;

						mover.startX = event.changedTouches[0].screenX; // X 蠎ｧ讓吶・菴咲ｽｮ
						mover.startY = event.changedTouches[0].screenY;
					})

					$('body').on('touchend', function(e) {
						// e.preventDefault();                  // 繝壹・繧ｸ縺悟虚縺・◆繧翫∝渚蠢懊ｒ豁｢繧√ｋ・・ 繧ｿ繧ｰ縺ｪ縺ｩ・�
						mover.endX = event.changedTouches[0].pageX; // X 蠎ｧ讓吶・菴咲ｽｮ
						mover.endY = event.changedTouches[0].pageY;
					})

					$('body').on('touchmove', function(e) {
						e.preventDefault(); // 繝壹・繧ｸ縺悟虚縺・◆繧翫∝渚蠢懊ｒ豁｢繧√ｋ・・ 繧ｿ繧ｰ縺ｪ縺ｩ・�
						var x = event.changedTouches[0].pageX; // X 蠎ｧ讓吶・菴咲ｽｮ
						var y = event.changedTouches[0].pageY;

						mover.x = mover.startX;
						mover.y = mover.startY;

						var tx = mover.startX - x;
						var ty = mover.startY - y;

						mover.startX = x;
						mover.startY = y;

						mouseScroll2({
							deltaY: -ty
						})
					})
					$('body').on('keydown', function(e) {
						var windowheight = $(window).height();
						var animatetime = 0;
						switch (e.which) {
							case 33: //Key[PageUp]
								globalscrolly += windowheight * 0.95;
								animatetime = 50;
								break;
							case 34: //key[PageDown]
								globalscrolly -= windowheight * 0.95;
								animatetime = 50;
								break;
							case 38: //Key[↑]
								globalscrolly += 50;
								animatetime = 10;
								break;
							case 40: //key[↓]
								globalscrolly -= 50;
								animatetime = 10;
								break;
						}
						if (globalscrolly > 0) globalscrolly = 0;
						if (globalscrolly < scrollH) globalscrolly = scrollH;

						$('.wrap').animate({top: scrollH - globalscrolly}, animatetime);
					})
				}

				var globalscrolly = 0;

				function mouseScroll(event) {
					globalscrolly += event.deltaY * 50;

					if (globalscrolly > 0) globalscrolly = 0;
					if (globalscrolly < scrollH) globalscrolly = scrollH;
					$('.wrap').css({
						top: scrollH - globalscrolly
					})
				}

				function mouseScroll2(event) {
					globalscrolly += event.deltaY;

					if (globalscrolly > 0) globalscrolly = 0;
					if (globalscrolly < scrollH) globalscrolly = scrollH;
					$('.wrap').css({
						top: scrollH - globalscrolly
					})
				}
			});

			$(window).load(function() {
				$(window).trigger("resize");
				$('.wrap').fadeTo(1, 1)
				$('#end').smoothScroll2({
					speed: 1,
					easing: 'easeOutQuart',
					adjust: 0,
					forthTop: false,
					wheel: 'off'
				})
			})

			/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

		/***/ })

},[15]);