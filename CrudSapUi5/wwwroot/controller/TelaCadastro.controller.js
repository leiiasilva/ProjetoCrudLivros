// var url= fetch(`https://localhost:7278/CrudLivro ${id}`).then(response=> response.json()).then(data => console.log(data));
// console.log(url);
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/core/Core"
    
], function (Controller, History, Core, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		
		// onInit: function () {
		// 	var router = sap.ui.core.UIComponent.getRouterFor(this);
		// 	router.attachRoutePatternMatched(this.ajustarRota, this);
		// 	var tela = this.getView(),
		// 		registroDeLivros = Core.getMessageManager();
		// 	registroDeLivros.registerObject(tela.byId("input-nome"), true)
		// 	registroDeLivros.registerObject(tela.byId("input-autor"), true)
		// 	registroDeLivros.registerObject(tela.byId("input-editora"), true) 
		// },
		
		// ajustarRota: function () {
		// 	var livrosCadastrados = oEvent.getParameter("arguments").id;
		// 	this.mostrarLista(livrosCadastrados);
		// 	this.getView().setModel(new sap.ui.model.json.JSONModel({}), "listaDeLivros");
		// },

		// buscarLivro: function (livroCadastrado) {
		// 	let livroASerCadastrado= fetch(`https://localhost:7278/CrudLivro/${livroCadastrado}`)
		// 	 	.then((response) => response.json())
		// 		.then(data => livroASerCadastrado = data)
		// 	return livroASerCadastrado;

			
		// },
		// mostrarLista: function (livroCadastrado) {
		// 	var exibirLista = this.buscarLivro(livroCadastrado)
		// 	exibirLista.then(livroRetornado => {
		// 		let oModel = new JSONModel(livroRetornado);
		// 		this.getView().setModel(oModel, "livro")
		// 	})
		// },
		

		botaoEditar: function(){
			alert("configurar botão");
		}, 

		botaoDeletar: function(){
			alert("configurar botão");
		},
		botaoVoltar: function(){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},


		// botaoSalvar: function(){
			
		// 	var telaCadastro = this.getView(),
		// 		inputs = [
		// 			telaCadastro.byId("input-nome"),
		// 			telaCadastro.byId("input-autor"),
		// 			telaCadastro.byId("input-editora"),
		// 		]
		// 		return this.cadastrarLivro;
			
			
		// },

		// cadastrarLivro: async function(oAction){
		// 	let cadastrar = this.getView().getModel("listaDeLivros").getData();
		// 	if (oAction === 'Ok'){
		// 		await fetch(`https://localhost:7278/CrudLivro`, {
		// 					headers: {
		// 						"Content-Type": "application/json; charset=utf-8"
		// 					},
		// 					method: 'POST',
		// 					body: JSON.stringify({
		// 						nome: cadastrar.nome,
		// 						autor: cadastrar.autor,
		// 						editora: cadastrar.editora,
		// 						anoPublicacao: cadastrar.anoPublicacao,
		// 					})
		// 				})
		// 	}
		// 	let oRouter = this.getOwnerComponent().getRouter();
		// 				oRouter.navTo("detalhes", {
		// 					id: cadastrar.id
		// 				});

		// }



		
	});
});
