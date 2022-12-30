sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller,) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {

		ValidarCadastro: function (inputsCampo) {
			let erroDeInput = false; // variavel do tipo boolean
			inputsCampo.forEach(input =>  // forEach  iteração que executa uma função para cada elemento
				erroDeInput = this.validarCampo(input) || erroDeInput, this);
			return {
				erroDeInput
			};

			// if (inputsCampo === null || erroDeInput){
			// 	this.validarCampo(input);
			// }
		},

		validarData: function () {
			
		},

		validarCampo: function () {
			let estado = "None"; //estado do input 'vazio'
			let erroDeValidacao = false; // variavel boolean 
			let oBinding = input.getBinding("value");
			try {
				oBinding.getType().validateValue(input.getValue());
			} catch (oException) {
				estado = "Error";
				erroDeValidacao = true;
			}
			input.setValueStateText("O campo deve conter 1-80 caracteres");
			input.setValueState(estado);
			
		},

		
	});
});