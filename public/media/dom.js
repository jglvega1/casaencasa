"use strict";
//dom elements
	var search = document.getElementById('search')
	var btnClose = document.getElementById('btnClose')
	var btnSearch = document.getElementById('btnSearch')
	var inSearch = document.getElementById('inSearch')
	var updwn = document.getElementById('btnUpdwn')
	var footer = document.getElementById('footer')
	var nav = document.querySelector('nav')
	var btnConfig = document.getElementById('btnConfig')
	var Config = document.getElementById('config')
	var list = document.getElementById('list')
	var seeMore = document.getElementById('seeMore')
	var btnCloseSeeMore = document.getElementById('btnCloseSeeMore')
	var rangeFont = document.getElementById('rangeFont')
//functions
	//counts
		var countUpdwn = 1
		var countConfig = 0
		var countExpandColapse = false;
		var currentList = 'list';
	//mobile dom
		window.addEventListener('resize', ()=>{
			let vh = window.innerHeight
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		})
	//nav
		//search
			var expandSearch = () => {
				search.classList.add('extendSearch')
				btnSearch.firstElementChild.style.border = 'solid var(--grosor) var(--light)'
				btnSearch.lastElementChild.style.background = 'var(--light)'
				btnSearch.style.right = 'var(--apertura-min)'
				btnSearch.style.transform = 'translate(0%, -50%)'
				btnClose.style.display = 'block'
				updwn.style.left = '150vw'
				btnConfig.style.right = '-150vw'
				seeMore.style.left = '-100vw'
				inSearch.style.width = 'calc(100% - calc(calc(var(--alto) - var(--apertura-max)) * 2) - var(--apertura-max))'
				if (countUpdwn==1) {
					funcUpdwn()
				}else{
					config.style.right = '-100vw'
					list.style.left = '0vw'
				}
				if (countConfig == 1) {
					countConfig = 0
				}
				countExpandColapse = true
			}
			var collapseSearch = () => {
				search.classList.remove('extendSearch')
				btnSearch.firstElementChild.style.border = 'solid var(--grosor) var(--secondary)'
				btnSearch.lastElementChild.style.background = 'var(--secondary)'
				btnSearch.style.right = '50%'
				btnSearch.style.transform = 'translate(50%, -50%)'
				btnClose.style.display = 'none'
				updwn.style.left = '50%'
				btnConfig.style.right = '0%'
				inSearch.style.width = '100%'
				inSearch.value = ''
				countExpandColapse = false
			}
		//footer
			var funcUpdwn = () => {
				if (countUpdwn == 0) {
					updwn.firstElementChild.style.transform = 'translate(-250%,-50%) rotate(45deg)'
					updwn.lastElementChild.style.transform = 'translate(250%,-50%) rotate(-45deg)'
					footer.style.bottom = 'calc(-1 * var(--vh))'
					updwn.classList.add('topRound')
					updwn.classList.remove('bottomRound')
					nav.style.top = 'calc(-1 * var(--alto))'
					if (countConfig==1) {
						funcBtnConfig()
					}
					if (currentList !== 'seeMore') {
						currentList = 'list'
					}
					countUpdwn = 1
				} else {
					updwn.firstElementChild.style.transform = 'translate(-250%,-75%) rotate(-45deg)'
					updwn.lastElementChild.style.transform = 'translate(250%,-75%) rotate(45deg)'
					footer.style.bottom = '0'
					updwn.classList.add('bottomRound')
					updwn.classList.remove('topRound')
					nav.style.top = '0px'
					countUpdwn = 0
				}
			}
		//config
			var funcBtnConfig = () => {
				if (countConfig==0) {
					if (currentList == 'list') {
						list.style.left = "-100vw"
						config.style.right = '0vw'
					} else {
						list.style.left = "-100vw"
						seeMore.style.left = "-200vw"
						config.style.right = '0vw'
					}
					if (countUpdwn==1) {
						funcUpdwn()
					}
					countConfig = 1
				} else {
					countConfig = 0
					if (currentList == 'list') {
						list.style.left = "0vw"
						config.style.right = '-100vw'
					} else {
						list.style.left = "100vw"
						seeMore.style.left = "0vw"
						config.style.right = '-200vw'
					}
				}
			}
		//notes
			var funcBtnCloseSeeMore = () => {
				seeMore.style.left = '-100vw'
				list.style.left = '0vw'
				inSearch.style.display = 'block';
				btnSearch.firstElementChild.setAttribute('class', 'circle');
				btnSearch.lastElementChild.setAttribute('class', 'line');
				currentList = 'list'
			}
	//config
		//font
			var resizeFont = () => {
				let fontValue = localStorage.getItem('fontSize')
				document.documentElement.style.setProperty('--letter', `${fontValue}pt`);
				document.documentElement.style.setProperty('--sub-letter', `${fontValue - 8}pt`);
				document.documentElement.style.setProperty('--alto', `calc(68px + calc(1.5px * ${fontValue - 20}))`);
			}
			var funcRangeFont = () => {
				localStorage.setItem('fontSize', rangeFont.value)
				resizeFont()
			}
	//list
		var closedRoads = []
		var renderizedRoads = []
		var funcRoad = (ub, road) =>{
			if (closedRoads.includes(road) == false) {
				document.getElementById(ub).style.display = "contents"
				if (renderizedRoads.includes(road) == false) {
					displayCards(road, ub)
					renderizedRoads.push(road)
				}
				closedRoads.push(road)
			} else {
				document.getElementById(ub).style.display = "none"
				for (var i = 0; i < closedRoads.length; i++) {
					if (closedRoads[i] == road) {
						closedRoads.splice(i, 1)
					}
				}
			}
		}
	var funcBtnSearchCloseSeeMore = () =>{
		if (countExpandColapse) {
			funcSearch(inSearch.value)
		} else {
			funcBtnCloseSeeMore()
			if (countConfig == 1) {
				funcBtnConfig()
			}
		}
	}
//triggers
	inSearch.addEventListener('click', expandSearch)
	btnClose.addEventListener('click', collapseSearch)
	updwn.addEventListener('click', funcUpdwn)
	btnConfig.addEventListener('click', funcBtnConfig)
	btnCloseSeeMore.addEventListener('click', funcBtnCloseSeeMore)
	rangeFont.addEventListener('change', funcRangeFont)
	btnSearch.addEventListener('click', funcBtnSearchCloseSeeMore)
//auto runnable
	if (localStorage.getItem('fontSize') !== null) {
		resizeFont()
	}