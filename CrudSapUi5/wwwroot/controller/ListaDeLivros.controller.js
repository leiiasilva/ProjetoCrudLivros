sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../servicos/Repositorio.controller"

], function (Controller, JSONModel, Filter, FilterOperator, Repositorio) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.ListaDeLivros", {


		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute("overview").attachPatternMatched(this.ajustarRota, this);
		},


		ajustarRota: function () {
			this.buscarLivrosDoBancoDeDados();
		},


		buscarLivrosDoBancoDeDados: async function () {
			const nomeDaLista = "listaDeLivros";
			let repositorio = new Repositorio;
			repositorio.buscarTodosOsLivros()
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, nomeDaLista)
				})
		},


		aoClicarEmAdicionar: function () {
			this.rota.navTo("telaCadastro")
		},

		aoClicarNoLivroDaLista: function (Evento) {
			let oItem = Evento.getSource();
			this.rota.navTo("detalhes", {
				id: window.encodeURIComponent(oItem.getBindingContext("listaDeLivros").getProperty("codigo"))
			});
		}

	});
});

