sap.ui.define([
	'sap/ui/core/mvc/Controller'
	
], function(Controller) {
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.Validacao", {

        validarCadastro: function () {
			
		},

        validarCampo: function () {
            var validar = document.getElementById("inputNome")
            if(validar.value === ""){
                alert("campo invalido")
                validar.focus();
            }
			
		},

		validarData: function () {
			
		},

		
	});

});
