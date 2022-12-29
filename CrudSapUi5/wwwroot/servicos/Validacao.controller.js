sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller,) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {

		ValidarCadastro: function (inputsDeCampo, data) {
			let erroDeInput = false;
			let erroDeData = false;

			inputsDeCampo.forEach(input =>
				erroDeInput = this.validarCampo(input) || erroDeInput, this);
			erroDeData = this.validarData(data);
			return {
				erroDeInput,
				erroDeData
			};
		},

		validarData: function (inputData) {
			let dataInput = inputData.getValue();
			let estado = "None";
			let erroDeValidacao = false;
			let dataMinima = new Date(1860, 1, 1).toISOString();
			let dataMaxima = new Date().toISOString();

			if (dataInput.length == 0) {
				estado = "Error"
				erroDeValidacao = true;
			}
			try {
				var dataInputFormatada = new Date(dataInput).toISOString();
				if (dataInputFormatada > dataMinima && dataInputFormatada < dataMaxima) {
					erroDeValidacao = false;
					estado = "None";
				} else {
					erroDeValidacao = true;
					estado = "Error";
				}
			} catch (oException) {
				estado = "Error";
				erroDeValidacao = true;
			}
			inputData.setValueState(estado);
			inputData.setValueStateText("A data deve ser preenchida entre 1900 e hoje");
			return erroDeValidacao;
		},

		validarCampo: function (input) {
			let estado = "None";
			let erroDeValidacao = false;
			let oBinding = input.getBinding("value");
			try {
				oBinding.getType().validateValue(input.getValue());
			} catch (oException) {
				estado = "Error";
				erroDeValidacao = true;
			}
			input.setValueStateText("O campo deve conter 1-80 caracteres");
			input.setValueState(estado);
			return input;
		},

		
	});
});