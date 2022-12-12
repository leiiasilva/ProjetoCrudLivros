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

		// botaoSalvar: function(){
		// 	var livroSalvar =this.oView.getModel(),
		// 		oData = livroSalvar.getProperty("/listaDeLivros"),
		// 		tabelaLivro = this.byId("listaDeLivros").getModel().getData();

		// 	oData.push(tabelaLivro);
		// 	tabelaLivro.setProperty("/listaDeLivros", oData);
			
		// },

		botaoVoltar: function(){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}

	});
});
