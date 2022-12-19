// var url= fetch(`https://localhost:7278/CrudLivro ${id}`).then(response=> response.json()).then(data => console.log(data));
// console.log(url);
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/core/Core"
    
], function (Controller, History, JSONModel, MessageBox, Core) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		
		onInit: function () {
			// var router = sap.ui.core.UIComponent.getRouterFor(this); 
			let router = this.getOwnerComponent().getRouter();
			router.getRoute("telaCadastro").attachPatternMatched(this.ajustarRotaCriacao, this);
			// router.attachRoutePatternMatched(this.ajustarRota, this);
		},

		ajustarRotaCriacao: function(){
			this.getView().setModel(new sap.ui.model.json.JSONModel({}), "livro");

		},
		
		ajustarRota: function (oEvent) {
			
			var livrosCadastrados = window.decodeURIComponent(oEvent.getParameter("arguments").id);
			if (livrosCadastrados =! undefined){
				this.mostrarLista(livrosCadastrados)

			}else{
				this.getView().setModel(new sap.ui.model.json.JSONModel({}), "livro");
			}
			
			
			// this.getView().setModel(new JSONModel({
			// 	nome: "", autor: "", editora: "", anoPublicacao: "", }), "listaDeLivros") 
		
			
			
		},

		buscarLivro: function (livrosCadastrados) {
			let livroASerCadastrado= fetch(`https://localhost:7278/CrudLivro/${livrosCadastrados}`)
			 	.then((response) => response.json())
				.then(data => livroASerCadastrado = data)
			return livroASerCadastrado;

			
		},
		mostrarLista: function (livrosCadastrados) {
			var exibirLista = this.buscarLivro(livrosCadastrados)
			exibirLista.then(lista => {
				let oModel = new JSONModel(lista);
				this.getView().setModel(oModel, "livro")
			})
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


		botaoSalvar: function(){
			var cadastrarLivro = this.getView().getModel("livro").getData();
			let corpo = JSON.stringify({
				nome: cadastrarLivro.nome,
				autor: cadastrarLivro.autor,
				editora: cadastrarLivro.editora,
				anoPublicacao: cadastrarLivro.anoPublicacao,
			}) 

			fetch('https://localhost:7278/CrudLivro', {
				method: 'POST',
				headers: {
					'content-type': "application/json; charset=utf-8"
				},

				body: corpo
				// body: JSON.stringify(cadastrarLivro.getData())
				
				// body: JSON.stringify({
				// 	nome: cadastrarLivro.nome,
				// 	autor: cadastrarLivro.autor,
				// 	editora: cadastrarLivro.editora,
				// 	anoPublicacao: cadastrarLivro.anoPublicacao,
				// })
			})
			.then((response) => { 
				if (response.status != 200){
					alert("falha")
				}else{
					alert("Livro cadastrado")
				}
			})
			
		},

	});
});
