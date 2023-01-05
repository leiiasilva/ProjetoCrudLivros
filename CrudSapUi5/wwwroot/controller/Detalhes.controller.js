sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"../servicos/RepositorioDeLivros"

], function (Controller, JSONModel, MessageBox, MessageToast, RepositorioDeLivros) {
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
			this.rota.navTo(rotaDaLista, {});
		},

		aoClicarEmEditar: function () {
			MessageBox.confirm("Deseja realmente editar esse Livro",{
				title: "Confirmação",
				actions: [
					sap.m.MessageBox.Action.OK,
					sap.m.MessageBox.Action.CANCEL
				],
				onClose: function(confirmacao){
					if(confirmacao === 'OK'){
						this._aoConfirmarEditar();
					}
				}.bind(this)
			})
			// const rotaEdicaoDeLivro = "editarLivro";
			// let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			// this.rota.navTo(rotaEdicaoDeLivro, {
			// 	id: idEditarLivro
			// });
		},

		_aoConfirmarEditar: function(){
			const rotaEdicaoDeLivro = "editarLivro";
			let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this.rota.navTo(rotaEdicaoDeLivro, {
				id: idEditarLivro
			});
		},

		// _mensagemDeSucessoEdicao: function(){
		// 	MessageBox.success("Livro deletado com sucesso", {
		// 		actions: [sap.m.MessageBox.Action.OK],
		// 		onClose: function (confirmacao) {
		// 			if (confirmacao === 'OK') {
		// 			 this._navegarParaLista(rotaDaLista, null)
		// 			}
		// 		}.bind(this)
		// 	})
		// },

		aoClicarEmDeletar: function () {
			MessageBox.confirm("Deseja realmente deletar esse livro?", {
				title: "Confirmação",
				emphasizedAction: sap.m.MessageBox.Action.OK,
				actions: [sap.m.MessageBox.Action.OK,
				sap.m.MessageBox.Action.CANCEL
				],
				onClose: function (oAction) {
					if (oAction === 'OK') {
						this._aoConfirmarDeletar();
					}
				}.bind(this)
			});


		},

		_aoConfirmarDeletar: function () {
			let excluirLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			let repositorio = new RepositorioDeLivros;
			repositorio.deletarLivro(excluirLivro)
			return this._mensagemDeSucesso();
			// MessageBox.success("Livro deletado com sucesso", {
			// 	actions: [sap.m.MessageBox.Action.OK],
			// 	onClose: function (confirmacao) {
			// 		if (confirmacao === 'OK') {
			// 		 this._navegarParaLista(rotaDaLista, null)
			// 		}
			// 	}.bind(this)
			// })
		},
		
		_mensagemDeSucesso: function(){
			MessageBox.success("Livro deletado com sucesso", {
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (confirmacao) {
					if (confirmacao === 'OK') {
					 this._navegarParaLista(rotaDaLista, null)
					}
				}.bind(this)
			})
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
		},
	});
})