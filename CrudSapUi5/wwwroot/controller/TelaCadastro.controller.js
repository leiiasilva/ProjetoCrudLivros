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


		cadastrarLivro: function(){
			var livroASerCadastrado = this.getView().getModel("livro").getData();
			let corpo = JSON.stringify({
				nome: livroASerCadastrado.nome,
				autor: livroASerCadastrado.autor,
				editora: livroASerCadastrado.editora,
				anoPublicacao: livroASerCadastrado.anoPublicacao,
			}) 

			fetch('https://localhost:7278/CrudLivro', {
				method: 'POST',
				headers: {
					'content-type': "application/json; charset=utf-8"
				},
				body: corpo
			})
			.then((response) => { 
				if (response.status != 200){
					alert("falha")
				}else{
					alert("Livro cadastrado")
				}
			})

		},

		botaoSalvar: function(){
			var salvarLivro = this.getView().getModel("livro").getData();
			if (!!salvarLivro.id) {
					this.editarLivro()
				} else {
					this.cadastrarLivro()
				};

		},

		editarLivro: async function(){
			var livroASerEditado = this.getView().getModel("livro").getData();


			await fetch(`https://localhost:7278/CrudLivro/${livroASerEditado}`, {

							method: 'PUT',
							headers: {
								"Content-Type": "application/json; charset=utf-8"
							},
							
							body: JSON.stringify({
								//codigo: livroASerEditado.codigo,
								nome: livroASerEditado.nome,
								autor: livroASerEditado.autor,
								editora: livroASerEditado.editora,
								anoPublicacao: livroASerEditado.anoPublicacao,
							})
						})
						let oRouter = this.getOwnerComponent().getRouter();
						oRouter.navTo("detalhes", {
							codigo: livroASerEditado.codigo
						});
						
					}

	});
});

