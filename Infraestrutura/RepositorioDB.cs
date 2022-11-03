using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace ProjetoCrud
{
    public class RepositorioDB
    {
        public SqlConnection conexao()
        {
            try
            {
                var stringConexao = (ConfigurationManager.ConnectionStrings["conexaoSql"].ConnectionString);
                var ConexaoDb = new SqlConnection(stringConexao);
                ConexaoDb.Open();
                return ConexaoDb;
            }
            catch (SqlException ex)
            {
                throw new Exception("Falha ao conectar no banco de dados " + ex.Message);
            }
        }

        public void Cadastrar(Livro livro)
        {
            using (var conexaoDb = conexao())
            {
                try
                {
                    var comando = new SqlCommand("INSERT INTO Livro(nome, autor, editora, anoPublicacao) VALUES (@nome,@autor, @editora, @anoPublicacao)", conexaoDb);
                    comando.Parameters.AddWithValue("@nome", livro.Nome);
                    comando.Parameters.AddWithValue("@autor", livro.Autor);
                    comando.Parameters.AddWithValue("@editora", livro.Editora);
                    comando.Parameters.AddWithValue("@anoPublicacao", livro.AnoDaPublicacao);
                    comando.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro : " + ex.Message);
                }
            }
        }

        public void Editar(Livro livro)
        {
            using (var conexaoDb = conexao())
            {
                try
                {
                    var comando = new SqlCommand("UPDATE Livro SET nome=@nome, autor=@autor, editora=@editora, anoPublicacao=@anoPublicacao WHERE codigo=@codigo", conexaoDb);
                    comando.Parameters.AddWithValue("@codigo", livro.Codigo);
                    comando.Parameters.AddWithValue("@nome", livro.Nome);
                    comando.Parameters.AddWithValue("@autor", livro.Autor);
                    comando.Parameters.AddWithValue("@editora", livro.Editora);
                    comando.Parameters.AddWithValue("@anoPublicacao", livro.AnoDaPublicacao);
                    comando.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro : " + ex.Message);
                }
            }
        }

        public void Deletar(int livroId)
        {
            using (var conexaoDb = conexao())
            {
                try
                {
                    var comando = new SqlCommand("DELETE Livro WHERE codigo= @codigo", conexaoDb);
                    comando.Parameters.AddWithValue("@codigo", livroId);
                    comando.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro : " + ex.Message);
                }
            }
        }

        public Livro BuscarPorId(int idAhSerBuscado)
        {
            using (var conexaoDb = conexao())
            {
                try
                {
                    DataTable tabela = new DataTable();
                    var comando = new SqlCommand("Select * From Livro Where codigo=@codigo", conexaoDb);
                    comando.Parameters.AddWithValue("@codigo", idAhSerBuscado);
                    var adapt = new SqlDataAdapter(comando);

                    adapt.Fill(tabela);

                    var livroBuscado = Conversor.ConverterParaLista<Livro>(tabela).Find(x => x.Codigo == idAhSerBuscado);

                    if (livroBuscado == null)
                    {
                        throw new Exception("Livro não encontrado com o id " + idAhSerBuscado);
                    }
                    return livroBuscado;
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro inesperado" + ex.Message);
                }
            }
        }



        public List<Livro> BuscarTodos()
        {
            var listaLivros = new List<Livro>();
            using (var conexaoDb = conexao())
            {
                try
                {
                    DataTable tabela = new DataTable();
                    var comando = new SqlCommand("SELECT * FROM Livro", conexaoDb);
                    var adapt = new SqlDataAdapter(comando);
                    adapt.Fill(tabela);
                    listaLivros = Conversor.ConverterLivro(tabela);
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro : " + ex.Message);
                }
                return listaLivros;
            }
        }
    }
}
