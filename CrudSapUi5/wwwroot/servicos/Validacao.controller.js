sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller,) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {

		ValidarCadastro: function (inputsCampo) {
			let erroDeInput = false; // variavel do tipo boolean
			inputsCampo.forEach(input =>  // forEach  iteração que executa uma função para cada elemento
				erroDeInput = this._validacaoDeCampo(input) || erroDeInput, this);
			return {
				erroDeInput
			};
		},

		validarData: function () {
			
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