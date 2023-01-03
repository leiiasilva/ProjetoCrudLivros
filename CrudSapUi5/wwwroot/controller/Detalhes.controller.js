sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/RepositorioDeLivros"

], function (Controller, History, JSONModel, MessageBox, RepositorioDeLivros) {
	"use strict";

	const nomeDoModelo = "livro";
	const rotaDaLista = "overview";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		rota: null,
		onInit: function () {
			const rotaDetalhes = "detalhes";
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute(rotaDetalhes).attachPatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			let mostrarDetalhes = evento.getParameter("arguments").id;
			this.buscarLivroDaLista(mostrarDetalhes);
		},

		buscarLivroDaLista: function (livroASerExibido) {
			let repositorio = new RepositorioDeLivros;
			repositorio.buscarLivroPorId(livroASerExibido)
				.then(lista => {
					let modelo = new JSONModel(lista);
					this.getView().setModel(modelo, nomeDoModelo)
				})
		},

		aoClicarEmVoltar: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.rota.navTo(rotaDaLista, {});
			}
		},

		aoClicarEmEditar: function () {
			const rotaEdicaoDeLivro = "editarLivro";
			let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this.rota.navTo(rotaEdicaoDeLivro, {
				id: idEditarLivro
			});
		},

		aoClicarEmDeletar: function () {
			let excluirLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			let repositorio = new RepositorioDeLivros;
			MessageBox.confirm("Deseja realmente deletar esse livro?", {
				title: "Confirmação",
				emphasizedAction: sap.m.MessageBox.Action.OK,
				actions: [sap.m.MessageBox.Action.OK,
				sap.m.MessageBox.Action.CANCEL
				],
				onClose: function (oAction) {
					if (oAction === 'OK') {
						repositorio.deletarLivro(excluirLivro);
						this._navegarParaLista(rotaDaLista, null)
					}
				}.bind(this)
			});
		},

		_navegarParaLista(nomeDaRota, codigo) {
			let rota = this.getOwnerComponent().getRouter();
			if (codigo !== null) {
				rota.navTo(nomeDaRota, {
					"id": codigo
				})
			} else {
				rota.navTo(nomeDaRota)
			}
		}
	});
})