using ProjetoCrud;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public interface IRepositorioWeb
    {
        public int Cadastrar(Livro livro);
        public Livro Editar(Livro livro);
        public void Deletar(int livroId);
        public List<Livro> BuscarTodos();
        public Livro BuscarPorId(int Id);
    }
}
