sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	"use strict";

	const caminho = "sap.ui.demo.walkthrough.controller.ValidacaoDeLivros";
	return Object.extend(caminho, {

		validarCadastro: function (inputsDeCampo, data) {
			let erroDeInput = false;
			let erroDeData = false;
			inputsDeCampo.forEach(input =>
				erroDeInput = this._validarCampo(input) || erroDeInput, this);
			erroDeData = this._validarData(data);
			return {
				erroDeInput,
				erroDeData
			};
		},

		_validarData: function (inputData) {
			const texto = "A data deve ser válida e preenchida entre 1900 e hoje";
			let dataInputada = inputData.getValue();
			let estado = "None";
			let erroDeValidacao = false;
			let dataMinimaValida = new Date(1860, 1, 1).toISOString();
			let dataMaximaValida = new Date().toISOString();

			if (dataInputada.length == 0) {
				estado = "Error"
				erroDeValidacao = true;
			}
			try {
				var dataInputadaFormatada = new Date(dataInputada).toISOString();
				if (dataInputadaFormatada > dataMinimaValida && dataInputadaFormatada < dataMaximaValida) {
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
			inputData.setValueStateText(texto);
			return erroDeValidacao;

		},

		_validarCampo: function (input) {
			const texto = "O campo deve conter 1-80 caracteres";
			var estado = 'None';
			var erroDeValidacao = false;
			let valor = input.getValue();
			try {
				if (valor.length == 0 || valor.length > 80)
					throw new Error();

			} catch (oException) {
				estado = "Error";
				erroDeValidacao = true;
				input.setValueStateText(texto);
			}
			input.setValueState(estado);
			return erroDeValidacao;
		}
	});
});