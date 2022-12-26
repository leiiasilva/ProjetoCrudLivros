sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller"

], function (Controller, History, JSONModel, MessageBox, Repositorio) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute("detalhes").attachPatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			var mostrarDetalhes = evento.getParameter("arguments").id;
			this.buscarLivroDaLista(mostrarDetalhes);
		},

		buscarLivroDaLista: function (livroASerExibido) {
			const nomeDoModelo = "livro";
			let repositorio = new Repositorio;
			repositorio.buscarLivroPorId(livroASerExibido)
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, nomeDoModelo)
				})
		},


		aoClicarEmVoltar: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.rota.navTo("overview", {});
			}
		},

		aoClicarEmDeletar: function () {
			let excluirLivro = this.getView().getModel("livro").getData().codigo
			let repositorio = new Repositorio;
			repositorio.deletarLivro(excluirLivro);
			alert("deletado")
			this.rota.navTo("overview", {
				id: excluirLivro

			});
		},

		aoClicarEmEditar: function () {
			let idEditarLivro = this.getView().getModel("livro").getData().codigo
			this.rota.navTo("editarLivro", {
				id: idEditarLivro

			});
		}

	});
})
