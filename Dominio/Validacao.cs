using ProjetoCrud;

namespace Dominio
{
    public class Validacao
    {
        public static bool ValidarCampo(Livro livro)
        {
            bool validacao = true;
            if(livro.Nome == string.Empty)
            {
                validacao = false;
                throw new Exception("O campo nome deve ser informado");
            }
            if(livro.Autor == string.Empty)
            {
                validacao = false;
                throw new Exception("O campo autor deve ser informado");
            }
            if(livro.Editora == string.Empty)
            {
                validacao = false;
                throw new Exception("O campo editora deve ser informado");

            }
            if (livro.AnoPublicacao > DateTime.Now)
            {
                validacao = false;
                throw new Exception("A data informada não é válida");
            }
            return validacao;

        }
    }
}
