sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller",
	"../servicos/Validacao.controller"


], function (Controller, History, JSONModel, MessageBox, Repositorio, Validacao) {
	"use strict";

	const inputNome ='inputNome';
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
			let validacao = new Validacao;
			 let telaDeCadastro = this.getView(),
				 inputs = [
					telaDeCadastro.byId(inputNome),
					telaDeCadastro.byId(inputAutor),
					telaDeCadastro.byId(inputEditora)
				],

				bErroDeValidacao = false;
				inputs.forEach(function (input){
					bErroDeValidacao = validacao.validacaoDeCampo(input) || bErroDeValidacao;
				}, this)
				let salvarLivro = this.getView().getModel("livro").getData();

				if(!bErroDeValidacao){ // !  é o operador de negação. Ele retorna o contrário da resolução da operação o qual ele precede.
					if (!!salvarLivro.codigo) {
						this.editarLivro(salvarLivro)
						alert("Livro editado com sucesso")
					} else {
						this.adicionarLivro(salvarLivro)
						alert("Cadastrado")
					 };
				}else{
					MessageBox.alert("Preencha os campos")
				}
		},

		geradorDeMensagens: function(){
			// let salvarLivro = this.getView().getModel("livro").getData();
			// let validacao = new Validacao;
			// let mensagemDeSucesso;
			// let mensagemDeErro;
			return MessageBox.confirm("Deseja concluir o cadastro?", {
				title: "Confirmação",                                    
				onClose: null,                                       
				styleClass: "",                                      
				actions: [ sap.m.MessageBox.Action.OK,
						   sap.m.MessageBox.Action.CANCEL ],         
				emphasizedAction: sap.m.MessageBox.Action.OK,       
				initialFocus: null,                                      
			});
		}
	});
});