using Dominio;
using LinqToDB;
using ProjetoCrud;
using System.Configuration;
using System.Data.SqlClient;
using SqlServerTools = LinqToDB.DataProvider.SqlServer.SqlServerTools;


namespace Infraestrutura
{
    public class RepositorioLinqToDB : IRepositorioWeb
    {
       public static string conexao()
        {
            var stringConexao = ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString;
            return stringConexao;
        }

        public int Cadastrar(Livro livro)
        {
            using var bancoDeDados = SqlServerTools.CreateDataConnection(conexao());
            try
            {
                var idDoLivroAdicionado = bancoDeDados.InsertWithInt32Identity(livro);
                return idDoLivroAdicionado;
                //bancoDeDados.Insert(livro);
            }
            catch(SqlException ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        public void Deletar(int livroId)
        {
            using var bancoDeDados = SqlServerTools.CreateDataConnection(conexao());
            try
            {
                bancoDeDados.GetTable<Livro>().Where(x => x.Codigo == livroId).Delete();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Livro Editar(Livro livroEditar)
        {
            using var bancoDeDados = SqlServerTools.CreateDataConnection(conexao());
            try
            {
                bancoDeDados.Update(livroEditar);
                return BuscarPorId(livroEditar.Codigo);
            //    bancoDeDados.Update(livroEditar);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Livro BuscarPorId(int Id)
        {
            using var bancoDeDados = SqlServerTools.CreateDataConnection(conexao());
            try
            {
                {
                    var livroASerBuscado = bancoDeDados.GetTable<Livro>().FirstOrDefault(x => x.Codigo == Id);
                    return livroASerBuscado;
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Livro> BuscarTodos()
        {
            using var bancoDeDados = SqlServerTools.CreateDataConnection(conexao());
            try
            {
                {
                    var listaLivros = from Livro in bancoDeDados.GetTable<Livro>() select Livro;
                    return listaLivros.ToList();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
