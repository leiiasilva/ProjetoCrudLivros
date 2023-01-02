sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller",
	"../servicos/Validacao.controller"


], function (Controller, History, JSONModel, MessageBox, Repositorio, Validacao) {
	"use strict";

	const inputNome = 'inputNome';
	const inputAutor = 'inputAutor';
	const inputEditora = 'inputEditora';

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
			let repositorio = new Repositorio;
			repositorio.buscarLivroPorId(livroASerBuscadoPorId)
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, "livro")
				})
		},


		adicionarLivro: function (livroAserSalvo) {
			let repositorio = new Repositorio;
			repositorio.cadastrarLivro(livroAserSalvo);
			this.rota.navTo("overview", {
				codigo: livroAserSalvo.codigo

			});
		},


		editarLivro: async function (livroEditado) {
			let _repositorio = new Repositorio;
			_repositorio.editarLivro(livroEditado);
			this.rota.navTo("detalhes", {
				codigo: livroEditado.codigo

			});
		},
		aoClicarEmSalvar: function () {
			let _validacaoLivro = new Validacao;
			let telaCadastro = this.getView();
			let inputs = [
				telaCadastro.byId(inputNome),
				telaCadastro.byId(inputAutor),
				telaCadastro.byId(inputEditora),
			];

			let valorInputData = this.getView().byId("AnoPublicacao");
			let erroDeValidacaoDeCampos = _validacaoLivro.ValidarCadastro(inputs, valorInputData).erroDeInput;
			let erroDeValidacaoDeData = _validacaoLivro.ValidarCadastro(inputs, valorInputData).erroDeData;
			let livroASerSalvo = this.getView().getModel("livro").getData();

			!erroDeValidacaoDeCampos && !erroDeValidacaoDeData ?
				!livroASerSalvo.codigo ?
					this.adicionarLivro(livroASerSalvo) :
					this.editarLivro(livroASerSalvo) :
				MessageBox.alert("Preencha todos os campos");
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

		_confirmarRetornoDeNavegacao: function (rota) {
			MessageBox.confirm("Ao voltar todas as alterações serão perdidas. Deseja continuar?", {
				title: "Confirmação",
				emphasizedAction: sap.m.MessageBox.Action.OK,
				actions: [sap.m.MessageBox.Action.OK,
					sap.m.MessageBox.Action.CANCEL
				],
				onClose: function (confirmacao) {
					if (confirmacao === 'OK') {
						this._navegarParaRota(rota, null);
					}
				}.bind(this)
			});
		},
		_navegarParaRota(nomeDaRota, id = null) {
			let rota = this.getOwnerComponent().getRouter();

			!!id
				?
				rota.navTo(nomeDaRota, {
					"id": id
				}) :
				rota.navTo(nomeDaRota);
		},


	});
});