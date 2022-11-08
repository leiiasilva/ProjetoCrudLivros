using LinqToDB.Common;
using LinqToDB.DataProvider.SqlCe;
using LinqToDB.DataProvider.SqlServer;
using ProjetoCrud;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Xsl;

namespace Infraestrutura
{
    public class RepositorioLinqToDB : IRepositorio
    {

       public static string conexao()
        {
            return ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString;
        }

        public void Cadastrar(Livro livro)
        {
            

            throw new NotImplementedException();
        }

        public void Deletar(int livroId)
        {
            throw new NotImplementedException();
        }

        public void Editar(Livro livro)
        {
            throw new NotImplementedException();
        }

        public Livro BuscarPorId(int Id)
        {
            throw new NotImplementedException();
        }

        public List<Livro> BuscarTodos()
        {
            throw new NotImplementedException();
        }
    }
}
