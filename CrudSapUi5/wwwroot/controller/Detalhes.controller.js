sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller"

], function (Controller, History, JSONModel, MessageBox, Repositorio) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhes").attachPatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			var mostrarDetalhes = evento.getParameter("arguments").id;
			this.exibirLivroBuscado(mostrarDetalhes);
		},

		buscarLivroDaLista: function (livroASerExibido) {
			let livroASerDetalhado = fetch(`https://localhost:7278/CrudLivro/${livroASerExibido}`)
				.then((response) => response.json())
				.then(data => livroASerDetalhado = data)
			return livroASerDetalhado;


		},

		exibirLivroBuscado: function (livroBuscado) {
			var exibirLivroDetalhado = this.buscarLivroDaLista(livroBuscado)
			exibirLivroDetalhado.then(livroRetornado => {
				let oModel = new JSONModel(livroRetornado);
				this.getView().setModel(oModel, "livro")
			})
		},

		aoClicarEmVoltar: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {});
			}
		},

		aoClicarEmDeletar: function (excluirLivro) {
			let _repositorio = new Repositorio;
			_repositorio.deletarLivro(excluirLivro);



			// let livroSelecionado = this.getView().getModel("livro").getData();
			// let idASerDeletado = livroSelecionado.codigo;
			// let oRouter = this.getOwnerComponent().getRouter();
			// MessageBox.confirm("Deseja realmente deletar esse livro?", {
			// 	title: "Confirmação",
			// 	actions: [sap.m.MessageBox.Action.OK,
			// 	sap.m.MessageBox.Action.CANCEL],

			// 	onClose: async function (oAction) {
			// 		if (oAction === 'OK') {
			// 			await fetch(`https://localhost:7278/CrudLivro/${idASerDeletado}`, {
			// 				method: 'DELETE'
			// 			})
			// 			oRouter.navTo("overview");
			// 		}
			// 	}
			// })
		},

		aoClicarEmEditar: function () {
			let idEditarLivro = this.getView().getModel("livro").getData().codigo
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("editarLivro", {
				id: idEditarLivro

			});
		}

	});
})
