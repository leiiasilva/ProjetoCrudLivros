sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/Core",
	"sap/ui/base/ManagedObject",
	"../controller/TelaCadastro.controller"
	
	
], function(Controller, JSONModel, Core, ManagedObject, TelaCadastro ) {
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {

		validarCampo: function(){

		},

		validarData: function(){
			
		}

	
		// validarCampo: function (input){
		// 	var condicao = 'None';
		// 	var validacao = false;
		// 	var oBinding = input.getBinding("value");
	
		// 	let dataMinima = new Date(1860, 1, 1).toISOString();
		// 	let dataMaxima = new Date().toISOString();
		// 	var inputData = this.getView().byId("AnoPublicacao").getValue();
	
		// 	if(inputData.length == 0){
		// 		condicao = "Error"
		// 		validacao = true;
				
		// 	}else{
		// 		var dataInputadaFormatada = new Date(inputData).toISOString();
		// 	}			
		// 	try {
		// 		oBinding.getType().validateValue(input.getValue());
		// 		if(dataInputadaFormatada > dataMinima && dataInputadaFormatada < dataMaxima){
		// 			validacao = false;
		// 			condicao = "None";
		// 		}else{
		// 			validacao = true;
		// 			condicao = "Error";
		// 		}
		// 	} catch (oException) {
		// 		condicao = "Error";
		// 		validacao = true;
		// 	}
		// 	input.setValueState(condicao);
		// 	return input;
		// }
		
	});

});
