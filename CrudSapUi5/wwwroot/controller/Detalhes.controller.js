sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
    
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this.ajustarRota, this); //só será acionado para a rota que tiver um padrão correspondente
		},
		
		ajustarRota: function (oEvent) {
			var mostrarDetalhes = oEvent.getParameter("arguments").id;
			this.mostrarLista(mostrarDetalhes);
		},

		buscarLivro: function (livroBuscado) {
			let livroASerBuscado = fetch(`https://localhost:7278/CrudLivro/${livroBuscado}`)
			 	.then((response) => response.json())
				.then(data => livroASerBuscado = data)
			return livroASerBuscado;

			
		},
		mostrarLista: function (livroBuscado) {
			var exibirLista = this.buscarLivro(livroBuscado)
			exibirLista.then(livroRetornado => {
				let oModel = new JSONModel(livroRetornado);
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
		}

	});
});
