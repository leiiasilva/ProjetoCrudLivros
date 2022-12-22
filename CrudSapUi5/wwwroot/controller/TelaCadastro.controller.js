sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller"


], function (Controller, History, JSONModel, MessageBox, Repositorio) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (oEvent) {
			if (oEvent.getParameter("name") == "editarLivro") {
				var idEditar = window.decodeURIComponent(oEvent.getParameter("arguments").id);
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


		adicionarLivro: function () {
			this.getView().getModel("livro").getData();
			let repositorio = new Repositorio;
			repositorio.cadastrarLivro();


			// var livroASerCadastrado = this.getView().getModel("livro").getData();
			// fetch('https://localhost:7278/CrudLivro', {
			// 	method: 'POST',
			// 	headers: {
			// 		'content-type': "application/json; charset=utf-8"
			// 	},

			// 	body: JSON.stringify({
			// 		nome: livroASerCadastrado.nome,
			// 		autor: livroASerCadastrado.autor,
			// 		editora: livroASerCadastrado.editora,
			// 		anoPublicacao: livroASerCadastrado.anoPublicacao,
			// 	})
			// })
		},

		botaoSalvar: function () {
			var salvarLivro = this.getView().getModel("livro").getData();
			if (!!salvarLivro.codigo) {
				this.editarLivro()
				alert("EDITADO")
			} else {
				this.adicionarLivro()
				alert("Cadastrado")
			};

		},

		editarLivro: async function () {
			var livroASerEditado = this.getView().getModel("livro").getData();
			await fetch(`https://localhost:7278/CrudLivro/${livroASerEditado.codigo}`, {

				method: 'PUT',
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},

				body: JSON.stringify({
					nome: livroASerEditado.nome,
					autor: livroASerEditado.autor,
					editora: livroASerEditado.editora,
					anoPublicacao: livroASerEditado.anoPublicacao,
				})
			})

			this.rota.navTo("detalhes", {
				id: livroASerEditado.codigo

			});
		}

	});
});

