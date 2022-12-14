sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
    
], function (Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		// var url= fetch(`https://localhost:7278/CrudLivro ${id}`).then(response=> response.json()).then(data => console.log(data));
		// console.log(url);

		

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


		botaoSalvar: function(){
			
			var telaCadastro = this.getView(),
				inputs = [
					telaCadastro.byId("input-nome"),
					telaCadastro.byId("input-autor"),
					telaCadastro.byId("input-editora"),
				]
			// var livroSalvar =this.oView.getModel(),
			// 	oData = livroSalvar.getProperty("/listaDeLivros"),
			// 	tabelaLivro = this.byId("listaDeLivros").getModel().getData();

			// oData.push(tabelaLivro);
			// tabelaLivro.setProperty("/listaDeLivros", oData);
			
		},

		// cadastrarLivro: function () {
		// 	var cadastrar = this.getView().getModel("livro").getData();
		// 	return MessageBox.confirm("Deseja concluir o cadastro?", {
		// 		title: "Confirmação",
		// 		emphasizedAction: sap.m.MessageBox.Action.OK,
		// 		actions: [sap.m.MessageBox.Action.OK,
		// 			sap.m.MessageBox.Action.CANCEL
		// 		],
		// 		onClose: async function (oAction) {
		// 			if (oAction === 'OK') {
		// 				await fetch(`https://localhost:7278/CrudLivro`, {
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

		// 				let oRouter = this.getOwnerComponent().getRouter();
		// 				oRouter.navTo("detalhes", {
		// 					id: cadastrar.id
		// 				});
		// 			}
		// 		},
		// 	})
		// },

		



		
	});
});
