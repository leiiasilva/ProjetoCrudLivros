sap.ui.define([
    "sap/ui/core/mvc/Controller"
	
], function(Controller) {
    'use strict';
    
    return Controller.extend("sap.ui.demo.walkthrough.controller.Repositorio",{

        buscarTodosOsLivros: async function(){
            let ObterTodosOsLivros;
			 await fetch(`https://localhost:7278/CrudLivro`)
			.then(response => response.json())
			.then(data => ObterTodosOsLivros = data)
			return ObterTodosOsLivros;
        },

        buscarLivroPorId: function (idLivroBuscado) {
            let livroBuscado = fetch(`https://localhost:7278/CrudLivro/${idLivroBuscado}`)
                .then((response) => response.json())
                .then(data => livroBuscado = data)
            return livroBuscado;
        },


        cadastrarLivro: function(){
			let livroASerCadastrado;
			fetch('https://localhost:7278/CrudLivro', {
				method: 'POST',
				headers: {
					'content-type': "application/json; charset=utf-8"
				},
				
				body: JSON.stringify({
					nome: livroASerCadastrado.nome,
					autor: livroASerCadastrado.autor,
					editora: livroASerCadastrado.editora,
					anoPublicacao: livroASerCadastrado.anoPublicacao,
				}) 
			})	
        },

        editarLivro: async function(){
			var livroASerEditado = this.getView().getModel("livro").getData();

			await fetch(`https://localhost:7278/CrudLivro/${livroASerEditado.codigo}`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},	
				    body: JSON.stringify({		
				            nome: livroASerEditado.nome,
				            autor: livroASerEditado.autor,
				            editora: livroASerEditado.editora,
				            anoPublicacao: livroASerEditado.anoPublicacao,
					})
				})
           },
           deletarLivro: async function (excluirLivro) {
            let livroSelecionado = excluirLivro.getData();
            let idASerDeletado = livroSelecionado.codigo;
            await fetch(`https://localhost:7278/CrudLivro/${idASerDeletado}`, {
                method: 'DELETE'
            })
        }

    });

});