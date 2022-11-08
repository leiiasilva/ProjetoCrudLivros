using Dominio;

namespace ProjetoCrud
{
    public partial class telaCadastro : Form
    {
        public Livro livro = new Livro();
        public telaCadastro(Livro livro)
        {
            InitializeComponent();
            if (livro != null)
            {
                nomeTextBox.Text = livro.Nome;
                autorTextBox.Text = livro.Autor;
                editoraTextBox.Text = livro.Editora;
            }
        }

        private void AoClicarEmVoltar(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;
        }

        private void AoClicarEmSalvar(object sender, EventArgs e)
        {
            try
            {
                livro.Nome = nomeTextBox.Text;
                livro.Autor = autorTextBox.Text;
                livro.Editora = editoraTextBox.Text;
                livro.AnoPublicacao = Convert.ToDateTime(anoPublicacaodateTime.Text);

                if (Validacao.ValidarCampo(livro) == true)
                {
                    DialogResult = DialogResult.OK;
                }
                else
                {
                    DialogResult = DialogResult.Cancel;
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
