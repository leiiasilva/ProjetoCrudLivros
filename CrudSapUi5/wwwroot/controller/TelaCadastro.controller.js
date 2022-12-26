sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller",
	"../servicos/Validacao.controller"


], function (Controller, History, JSONModel, MessageBox, Repositorio, Validacao) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			if (evento.getParameter("name") == "editarLivro") {
				var idEditar = window.decodeURIComponent(evento.getParameter("arguments").id);
				this.buscarLivro(idEditar)
			} else {
				this.getView().setModel(new sap.ui.model.json.JSONModel({}), "livro");
			}
		},


		buscarLivro: function (livroASerBuscadoPorId) {
			const nomeDoModelo = "livro";
			let repositorio = new Repositorio;
			repositorio.buscarLivroPorId(livroASerBuscadoPorId)
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


		adicionarLivro: function (livroAserSalvo) {
			let repositorio = new Repositorio;
			repositorio.cadastrarLivro(livroAserSalvo);
			this.rota.navTo("overview", {
				id: livroAserSalvo.codigo

			});
		},


		editarLivro: async function (livroEditado) {
			let _repositorio = new Repositorio;
			_repositorio.editarLivro(livroEditado);
			this.rota.navTo("detalhes", {
				id: livroEditado.codigo

			});
		},

		aoClicarEmSalvar: function () {
			var salvarLivro = this.getView().getModel("livro").getData();
			if (!!salvarLivro.codigo) {
				this.editarLivro(salvarLivro)
				alert("EDITADO")
			} else {
				this.adicionarLivro(salvarLivro)
				alert("cadastrado")
			};

		}

	});
});

