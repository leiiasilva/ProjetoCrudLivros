sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/ValidateException",
	"sap/ui/core/Core",
	"../servicos/Repositorio.controller",
	"../servicos/Validacao.controller"


], function (Controller, History, JSONModel, MessageBox, ValidateException, Core, Repositorio, Validacao) {
	"use strict";

	const inputNome ='inputNome';
	const inputAutor = 'inputAutor';
	const inputEditora = 'inputEditora';

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this.ajustarRota, this);
			var oView = this.getView(),
				oMM = Core.getMessageManager();
				oView.setModel(new JSONModel({nome: "", autor: "", editora: "" }))

			oMM.registerObject(oView.byId(inputNome), true);
			oMM.registerObject(oView.byId(inputAutor), true);
			oMM.registerObject(oView.byId(inputEditora), true);

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
			 let oView = this.getView(),
				 inputs = [
					oView.byId(inputNome),
					oView.byId(inputAutor),
					oView.byId(inputEditora)
				],

				bErroDeValidacao = false;
				inputs.forEach(function (input){
					bErroDeValidacao = this._validacaoDeCampo(input) || bErroDeValidacao;
				}, this)

				if(!bErroDeValidacao){ // !  é o operador de negação. Ele retorna o contrário da resolução da operação o qual ele precede.
					if (!!salvarLivro.codigo) {
						this.editarLivro(salvarLivro)
						alert("EDITADO")
					} else {
						this.adicionarLivro(salvarLivro)
						alert("cadastrado")
					 };
				}else{
					MessageBox.alert("Preencha os campos")
				}

		},

		_validacaoDeCampo: function (input){
			var estado = 'None';
			var erroDeValidacao = false;
			let valor = input.getValue();

			try{
				if(valor.length == 0 || valor.length > 80)
					throw new Error();
			}catch(oException){
				estado = "Error";
				erroDeValidacao = true;
				input.setValueStateText("O campo deve conter 1-80 caracteres");
			}
			input.setValueState(estado);
			return erroDeValidacao;

		}



	});
});