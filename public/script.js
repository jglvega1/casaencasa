//js for rnc
//11-05-19
"use strict";//call the ecmascript v7??

//requirements
	//detect the conection protocol and make an conection by sockets
		if ((window.location.protocol !== "https:") && (window.location.hostname !== "localhost")) {
			window.location = `https://${window.location.hostname}${window.location.pathname}`
		} else{
			var socket = io.connect(window.location.host, { 'forceNew': true });
		}
	//if soport service worker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js');
		}
//dom
	//dom elements
		//botones
			var btnClose 		= document.getElementById('btnClose');
			var btnSearch 		= document.getElementById('btnSearch');
			var btnLoggin 		= document.querySelector('#btnLoggin');
			var updwn 			= document.getElementById('btnUpdwn');
			var btnConfig 		= document.getElementById('btnConfig');
			var btnCloseSeeMore = document.getElementById('btnCloseSeeMore');
		//inputs
			var inSearch 		= document.getElementById('inSearch');
			var inNotas 		= document.querySelector('.notes');
			var rangeFont 		= document.getElementById('rangeFont');
		//divs
			var search 			= document.getElementById('search');
			var footer 			= document.getElementById('footer');
			var nav 			= document.querySelector('nav');
			var config 			= document.getElementById('config');
			var list 			= document.getElementById('list');
			var seeMore 		= document.getElementById('seeMore');
			var marcar 			= document.querySelector('#marca');
//data
	//localstorage
		var getLocalNdb = localStorage.getItem('ndb');
		var getLocalDb 	= localStorage.getItem('db');
	//ram
		var db 		= [];
		var nDb 	= [];
		var subDb 	= [];
//functions
	//dom
		//counts
			var countConfig 		= 0;
			var countUpdwn 			= 1;
			var countExpandColapse 	= false;
			var currentList 		= 'list';
		//font
			var resizeFont = () => {
				let fontValue = localStorage.getItem('fontSize');
				document.documentElement.style.setProperty('--letter', `${fontValue}pt`);
				document.documentElement.style.setProperty('--sub-letter', `${fontValue - 8}pt`);
				document.documentElement.style.setProperty('--alto', `calc(68px + calc(1.5px * ${fontValue - 20}))`);
			};
			var funcRangeFont = () => {
				localStorage.setItem('fontSize', rangeFont.value);
				resizeFont();
			};
			var preresizeFont = () => {
				let fontValue = localStorage.getItem('fontSize');
				resizeFont.defaultValue = `${fontValue}`;
			}
			//nav
		//search
			var expandSearch = () => {
				search.classList.add('extendSearch');
				btnSearch.firstElementChild.style.border = 'solid var(--grosor) var(--light)';
				btnSearch.lastElementChild.style.background = 'var(--light)';
				btnSearch.style.right = 'var(--apertura-min)';
				btnSearch.style.transform = 'translate(0%, -50%)';
				btnClose.style.display = 'block';
				updwn.style.left = '150vw';
				btnConfig.style.right = '-150vw';
				seeMore.style.left = '-100vw';
				inSearch.style.width = 'calc(100% - calc(calc(var(--alto) - var(--apertura-max)) * 2) - var(--apertura-max))';
				if (countUpdwn==1) {
					funcUpdwn();
				}else{
					config.style.right = '-100vw';
					list.style.left = '0vw';
				}
				if (countConfig == 1) {
					countConfig = 0;
				}
				countExpandColapse = true;
			};
			var collapseSearch = () => {
				search.classList.remove('extendSearch');
				btnSearch.firstElementChild.style.border = 'solid var(--grosor) var(--secondary)';
				btnSearch.lastElementChild.style.background = 'var(--secondary)';
				btnSearch.style.right = '50%';
				btnSearch.style.transform = 'translate(50%, -50%)';
				btnClose.style.display = 'none';
				updwn.style.left = '50%';
				btnConfig.style.right = '0%';
				inSearch.style.width = '100%';
				inSearch.value = '';
				countExpandColapse = false;
			};
		//footer
			var funcUpdwn = () => {
				if (countUpdwn == 0) {
					updwn.firstElementChild.style.transform = 'translate(-250%,-50%) rotate(45deg)';
					updwn.lastElementChild.style.transform = 'translate(250%,-50%) rotate(-45deg)';
					footer.style.bottom = 'calc(-1 * var(--vh))';
					updwn.classList.add('topRound');
					updwn.classList.remove('bottomRound');
					nav.style.top = 'calc(-1 * var(--alto))';
					if (countConfig==1) {
						funcBtnConfig();
					}
					if (currentList !== 'seeMore') {
						currentList = 'list';
					}
					countUpdwn = 1;
				} else {
					updwn.firstElementChild.style.transform = 'translate(-250%,-75%) rotate(-45deg)';
					updwn.lastElementChild.style.transform = 'translate(250%,-75%) rotate(45deg)';
					footer.style.bottom = '0';
					updwn.classList.add('bottomRound');
					updwn.classList.remove('topRound');
					nav.style.top = '0px';
					countUpdwn = 0;
				}
			};
		//config
			var funcBtnConfig = () => {
				if (countConfig==0) {
					if (currentList == 'list') {
						list.style.left = "-100vw";
						config.style.right = '0vw';
					} else {
						list.style.left = "-100vw";
						seeMore.style.left = "-200vw";
						config.style.right = '0vw';
					}
					if (countUpdwn==1) {
						funcUpdwn();
					}
					countConfig = 1;
				} else {
					countConfig = 0;
					if (currentList == 'list') {
						list.style.left = "0vw";
						config.style.right = '-100vw';
					} else {
						list.style.left = "100vw";
						seeMore.style.left = "0vw";
						config.style.right = '-200vw';
					}
				}
			};
		//notes
			var funcBtnCloseSeeMore = () => {
				seeMore.style.left = '-100vw';
				list.style.left = '0vw';
				inSearch.style.display = 'block';
				btnSearch.firstElementChild.setAttribute('class', 'circle');
				btnSearch.lastElementChild.setAttribute('class', 'line');
				currentList = 'list';
			};
			var funcBtnSearchCloseSeeMore = () =>{
				if (countExpandColapse) {
					funcSearch(inSearch.value);
				} else {
					funcBtnCloseSeeMore();
					if (countConfig == 1) {
						funcBtnConfig();
					}
				}
			};
	//dom-data
		//openRoads
			var openRoads = [];
			var renderizedRoads = [];
			var funcRoad = (ub, road) =>{
				console.log(openRoads)
				if (openRoads.includes(road) == false) {
					document.getElementById(ub).style.display = "contents";
					if (renderizedRoads.includes(road) == false) {
						displayCards(road, ub);
						renderizedRoads.push(road);
					}
					openRoads.push(road);
				} else {
					document.getElementById(ub).style.display = "none";
					for (var i = 0; i < openRoads.length; i++) {
						if (openRoads[i] == road) {
							openRoads.splice(i, 1);
						}
					}
				}
				console.log(openRoads)
			};
		//render
			var renderList = () => {
				list.innerHTML = '';
				var calles = [];
				for (let items of db) {
					if (calles.includes(items.calle) == false) {
						calles.push(items.calle);
					}
				}
				for (var i = 0; i < calles.length; i++) {
					var ub = 'r' + i;
					renderRoad(calles[i], ub);
				}
			};

			var displayCards = (calle, ub) => {
				for (let items of db) {
					if (items.calle == calle) {
						renderCard(items, document.getElementById(ub));
					}
				}
			};
			var renderCard = (rcItem, ubication) => {
				var check;
				var casa;
				if (rcItem.estado == 0) {
					casa = `<h1>${rcItem.casa}</h1>`;
					check = `<input type="checkbox" class="checkerHouses" onchange="chekedHouses(1, ${rcItem.id})">`;
				} else if (rcItem.estado == 1){
					casa = `<h1>${rcItem.casa}</h1>`;
					check = `<input type="checkbox" class="checkerHouses" onchange="chekedHouses(0, ${rcItem.id})" checked>`;
				} else if (rcItem.estado == 3){
					casa = `<h1 class="fine">${rcItem.casa}</h1>`;
					check = `<input type="checkbox" class="checkerHouses" onchange="chekedHouses(0, ${rcItem.id})" checked>`;
				} else {
					casa = `<h1 class="warning">${rcItem.casa}</h1>`;
					check = `<input type="checkbox" class="checkerHouses" onchange="chekedHouses(0, ${rcItem.id})" checked>`;
				}
				ubication.innerHTML += `
					<div class="card" id="${rcItem.id}">
						<div id="casa">
							<p>Casa</p>
							${casa}
						</div>
						<div id="estado">
							<p>Estado</p>
							${check}
						</div>
						<div id="btnSeeMore" onClick="SeeMore(${rcItem.id})">
							<div>
								<div id="circle"></div>
								<div id="circle"></div>
								<div id="circle"></div>
							</div>
						</div>
					</div>
				`;
			};



			var renderRoad = (road, ubication) => {
				list.innerHTML += `
					<div>
						<div class="card" id="header" onClick="funcRoad('${ubication}', '${road}')">
							<h1>${road}</h1>
						</div>
						<div class="hosues" id="${ubication}"></div>
					</div>
				`;
			};
		//See more
			var SeeMore = (id) => {
				for (let items of db) {
					if (items.id == id) {
						var estado;
						var nota = items.notas;
						if (items.estado == 2) {
							estado = `<input type="checkbox" id="${id}" onchange="chekedHouses(1, this.id)" checked>`;
						} else {
							estado = `<input type="checkbox" id="${id}" onchange="chekedHouses(2, this.id)">`;
						}
						inNotas.value = nota;
						inNotas.id = `${id}`;
						marcar.innerHTML = `
							<h1>Marcar</h1>
							${estado}
						`;
					}
				}
				seeMore.style.left = '0vw';
				list.style.left = '100vw';
				config.style.right = '-200vw';
				currentList = 'seeMore';
				collapseSearch();
				inSearch.style.display = 'none';
				btnSearch.firstElementChild.setAttribute('class', 'cross-f');
				btnSearch.lastElementChild.setAttribute('class', 'cross-s');
			};
			//notas
				var funcNotes = () => {
					var id = inNotas.attributes.id.value;
					console.log(id);
					for (let element of db) {
						var exist = 0;
						if (element.id == id) {
							for (let item of nDb) {
								if (item.id == element.id) {
									exist = 1;
								}
							}
							if (exist == 1) {
								for (let item of nDb) {
									if (item.id == element.id) {
										item.notas = inNotas.value;
										changeNdb();
									}
								}
							} else if (exist == 0){
								nDb.push(element);
								for (let item of nDb) {
									if (item.id == element.id) {
										item.notas = inNotas.value;
										changeNdb();
									}
								}
							}
						}
					}
				};
	//data
		//observer functions
			var notify = () => {
				for (let sub of subDb) {
					sub();
				}
			};


			var addSubDb = (sub) => {
				subDb.push(sub);
			};

		//data chengers
			//db
				var setDataBase = d => {
					setNdb();
					db = [];
					for (var i = 0; i < d.length; i++) {
						db.push(d[i]);
						for (let x = 0; x < nDb.length; x++) {
							if (db[i].id == nDb[x].id) {
								db.splice(i, 1, nDb[x]);
							}
						}
						db.sort((a, b) => {return (a.id - b.id);});
					}
					notify();
				};
			//ndb
				var updateMDB = () => {
					if ((navigator.onLine) && (nDb !== '[]')) {
						for (let change of nDb) {
							socket.emit('updateData', change);
						}
					}
					countFRL = false;
				};
				var setNdb = () => {
					if ((getLocalNdb !== null) && (getLocalNdb !== '[]')) {
						for (let items of JSON.parse(getLocalNdb)) {
							nDb.push(items);
						}
					} else {
						localStorage.removeItem('ndb');
						localStorage.setItem('ndb', JSON.stringify(nDb));
					}
				};
				var changeNdb = () =>{
					localStorage.removeItem('ndb');
					localStorage.setItem('ndb', JSON.stringify(nDb));
					updateMDB();
				};
	//sub
		var countFRL = true;
		var fristRenderList = ()=>{
			if (countFRL) {
				renderList();
			}
		};
		addSubDb(fristRenderList);

	//search Engine
		var cuad = "";
		var funcSearch = (query) => {
			list.innerHTML = '';
			openRoads = [];
			if (query == '*') {
				renderList();
				cuad = "";
			} else if (cuad !== "") {
				let callesCuad = [];
				for (let items of db) {
					if ((callesCuad.includes(items.calle) == false) && (items.cuadra === cuad) && (items.casa === query)) {
						callesCuad.push(items.calle);
					}
				}
				for (var i = 0; i < callesCuad.length; i++) {
					var ub = 'r' + i;
					renderRoad(callesCuad[i], ub);
					for (let items of db) {
						if ((items.calle == callesCuad[i]) && (items.cuadra === cuad) && (items.casa === query)) {
							renderCard(items, document.getElementById(ub));
						}
					}
				}
			} else {
				let callesCuad = [];
				for (let items of db) {
					if ((callesCuad.includes(items.calle) == false) && (items.casa === query)) {
						callesCuad.push(items.calle);
					}
				}
				for (var x = 0; x < callesCuad.length; x++) {
					let ub = 'r' + x;
					renderRoad(callesCuad[x], ub);
					for (let items of db) {
						if ((items.calle == callesCuad[x]) && (items.casa === query)) {
							renderCard(items, document.getElementById(ub));
						}
					}
				}
			}
		};
		//cuadras sys
			var funcCuad = (cuadra) =>{
				openRoads = [];
				renderizedRoads = [];
				document.getElementById("list").innerHTML ="";
				cuad = cuadra.slice(1);
				var callesCuad = [];
				for (let items of db) {
					if ((callesCuad.includes(items.calle) == false) && (items.cuadra === cuad)) {
						callesCuad.push(items.calle);
					}
				}
				for (var i = 0; i < callesCuad.length; i++) {
					var ub = 'r' + i;
					renderRoad(callesCuad[i], ub);
				}
				funcUpdwn();
			};
		//trigger
		inSearch.addEventListener('keypress', (e) => {
			var key = e.which || e.keyCode;
			if (key === 13) {
				funcSearch(inSearch.value);
			}
		});


	//state checker
		var chekedHouses =  (estado, id) => {
			var exist = false;
			for (let items of nDb) {
				if (items.id == id) {
					exist = true;
				}
			}
			if (exist) {
				for (var i = 0; i < nDb.length; i++) {
					if (nDb[i].id == id) {
						nDb[i].estado = estado;
						changeNdb();
					}
				}
			} else {
				var origen = db[id];
				origen.estado = estado;
				nDb.push(origen);
				changeNdb();
			}
		};
	//logger
		var logger = ()=>{
			var inUser = document.getElementById('user');
			var inPass = document.getElementById('pass');
			var uspas = {"user":`${inUser.value}`,"pass":`${inPass.value}`};
			socket.emit('loggin', uspas);
		};
		var transferComplete = (data) =>{
			var func = data.responseText;
			eval(func);
		};
		var loganswer = (data) => {
			for (var i = 0; i < data.length; i++) {
				var oReq = new XMLHttpRequest();
				oReq.open("GET", `${data[i]}`);
				oReq.responseType = 'text';
				oReq.send();
				oReq.addEventListener("load", (e)=>{transferComplete(e.srcElement);});
			}
		};

//triggers
	//auto runnable
		if (localStorage.getItem('fontSize') !== null) {
			preresizeFont();
		}
		if (navigator.onLine) {
			socket.on('database', data => {
				setDataBase(data);
				localStorage.setItem('db', JSON.stringify(db));
			});
			socket.emit('queryDB');
			socket.on('deleteNDB', (data) => {
				for (var i = 0; i < nDb.length; i++) {
					if (nDb[i].id == data.id) {
						nDb.splice(i, 1);
						break;
					}
				}
				console.log(nDb);
				changeNdb();
			});
			socket.on('loganswer', (data) =>{loganswer(data);});
		} else {
			setDataBase(JSON.parse(getLocalDb));
		}
		if ((navigator.onLine) && (nDb !== '[]')) {
			for (let change of nDb) {
				socket.emit('updateData', change);
			}
		}
	//dom
		window.addEventListener('resize', ()=>{
			let vh = window.innerHeight;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
		inSearch.addEventListener('click', expandSearch);
		btnClose.addEventListener('click', collapseSearch);
		updwn.addEventListener('click', funcUpdwn);
		btnConfig.addEventListener('click', funcBtnConfig);
		btnCloseSeeMore.addEventListener('click', funcBtnCloseSeeMore);
		rangeFont.addEventListener('change', funcRangeFont);
		btnSearch.addEventListener('click', funcBtnSearchCloseSeeMore);
	//dom-data
		btnLoggin.addEventListener('click', logger);
	//data