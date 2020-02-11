"use strict";
//requirements
	const socket = io.connect(window.location.host);
//patterns
	class observer {
		constructor(){
			this.subscriptors = [];
			this.value;
		}
		addSub(fn){
			this.subscriptors.push(fn);
		}
		deleteSub(fn){
			this.subscriptors.indexOf(fn);
			this.subscriptors.splice(positionOfFunction, 1);
		}
		clearSubs(unlocked){
			if (unlocked){
				this.subscriptors = [];
			}
		}
		getValue(){
			return this.value;
		}
		setValue(newValue){
			this.value = newValue;
			for (var i = 0; i < this.subscriptors.length; i++) {
				var fn = this.subscriptors[i];
				fn();
			}
		}
	}
//model
	var db = new observer;
	var currentView = new observer;
	var lastblock = new observer;
//view
	//content
		//controls
			const viewGen = (view) => {
				var element;
				switch (view) {
					case "map":
						element = (
								<ViewMap/>
							);
						break;
					case "reunion":
						element = (
								<ViewReunion/>
							);
						break;
					case "revisitas":
						element = (
								<ViewRevisitas/>
							);
						break;
				}
				return element;
			}
			const viewRender = () => {
				const element = viewGen(currentView.getValue())
				ReactDOM.render(element, domRoot)
			}
			currentView.addSub(viewRender)
		//dom
			const domRoot = document.getElementById('view');
			//mapa
				class ViewMap extends React.Component{
					render(props){
						var element = (
							<div id="mapa">
								<embed type="image/svg+xml" src="media/mapaa.svg" id="smapa"/>
							</div>
						);
						return element;
					}
				}
			//reuniones
				//last block
				class CardLastBlock extends React.Component{
					render(props){
						var element = (
							<div class="card territorio">
								<div class="center">
									<div>
										<h2>Cuadra:</h2>
										<h3>65</h3>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
									</div>
								</div>
							</div>
						);
						return element;
					}
				}
				class CardEncuentro extends React.Component{
					render(props){
						var element = (
							<div class="card puntoDeEncuentro">
								<div class="center">
									<div>
										<h2>Punto de reunion</h2>
										<h3>Fam. Garcia</h3>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
									</div>
								</div>
							</div>
						);
						return element;
					}
				}
				class ViewReunion extends React.Component{
					render(props){
						var element = (
							<div>
								<CardLastBlock />
								<CardEncuentro />
							</div>
						);
						return element;
					}
				}
			//revisitas
				class Title extends React.Component {
					render(props){
						const element = (
							<div className="card block">
								<div className="center">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
									</div>
									<div className="cuadra">
										<h1>{this.props.titulo}</h1>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
									</div>
								</div>
							</div>
							);
						return element;
					}
				}
				class Casa extends React.Component {
					render(props){
						const element = (
							<div className="card house">
								<div className="center">
									<div>
										<h2>Casa</h2>
										<h3>10987</h3>
									</div>
									<div>
										<h2>Estado</h2>
										<div className="chkbox">
											<svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
										</div>
									</div>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
									</div>
								</div>
							</div>
							);
						return element;
					}
				}
				class Road extends React.Component {
					render(props){
						const element = (
							<div className="card road">
								<div className="center">
									<div className="calle">
										<h1>Herradura</h1>
									</div>
								</div>
								<div id="casas">
									<Casa/>
									<Casa/>
									<Casa/>
									<Casa/>
									<Casa/>
									<Casa/>
									<Casa/>
									<Casa/>
								</div>
							</div>
							);
						return element;
					}
				}
				class List extends React.Component {
					onScroll(){
						console.log()
					}
					render(props){
						const element = (
							<div id="list" onScroll={(e)=>this.onScroll(e)}>
									<Road/>
								</div>
							);
						return element;
					}
				}
				class ViewRevisitas extends React.Component{
					render(props){
						var element = (
							<div className="viewRevisitas">
								<Title titulo="Revisitas"/>
								<List />
							</div>
						);
						return element;
					}
				}
	//menu
		//controls	
			const mainMenuSelector = () => {
				var selectores = document.getElementsByClassName('selected')
				for (var i = 0; i < selectores.length; i++) {
					selectores[i].classList.remove("selected")
				}
				switch (currentView.getValue()){
					case "map":
						document.getElementById("btnMapa").className += " selected";
						break;
					case "reunion":
						document.getElementById("btnReunion").className += " selected";
						break;
					case "revisitas":
						document.getElementById("btnRevisitas").className += " selected";
						break;
				}
			}
			currentView.addSub(mainMenuSelector);
		//dom
			const domMenu = document.getElementById('menu');
			class BtnMapa extends React.Component{
				handleOnClick(){
					if (currentView.getValue() != "map") { currentView.setValue("map")}
				}
				render(props){
					const element = (
						<div id="btnMapa" className="btn" onClick={(e)=>this.handleOnClick(e)}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0V0z"/>
								<path id="iconMap" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z"/>
							</svg>
						</div>
					);
					return element;
				}
			}
			class BtnReunion extends React.Component{
				handleOnClick(){
					currentView.setValue("reunion")
				}
				render(props){
					const element = (
						<div id="btnReunion" className="btn" onClick={(e)=>this.handleOnClick(e)}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0V0z"/>
								<path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 19V6h8v13H3zm18 0h-8V6h8v13zm-7-9.5h6V11h-6zm0 2.5h6v1.5h-6zm0 2.5h6V16h-6z"/>
							</svg>
						</div>
					);
					return element;
				}
			}
			class BtnRevisitas extends React.Component{
				handleOnClick(){
					currentView.setValue("revisitas");
				}
				render(props){
					const element = (
						<div id="btnRevisitas" className="btn" onClick={(e)=>this.handleOnClick(e)}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0V0z"/>
								<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
							</svg>
						</div>
					);
					return element;
				}
			}
			const MenuMain = () => {
				const element = (
					<div id="mainmenu" className="compo">
						<BtnMapa/>
						<BtnReunion/>
						<BtnRevisitas/>
					</div>
				);
				ReactDOM.render(element, domMenu);
			}
			const viewdata = () => {
				console.log(currentView.getValue())
			}
			currentView.addSub(viewdata)
//controller
	socket.on('database', (data) => db.setValue(data));
	var pdb = () => console.log(db.getValue())
	db.addSub(pdb);
	//mapa
//start main functions
	MenuMain()
	currentView.setValue("map");