sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller,) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {


		validarData: function () {
			
		},

		validacaoDeCampo: function (input){
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