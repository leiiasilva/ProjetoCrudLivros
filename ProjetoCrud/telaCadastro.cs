using System;
using System.Windows.Forms;

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
                if (nomeTextBox.Text.Equals(String.Empty) || autorTextBox.Text.Equals(String.Empty)
                    || editoraTextBox.Text.Equals(String.Empty) || anoPublicacaodateTime.Value > DateTime.Now)
                {
                    throw new Exception("Preencha todos os campos com valor válido.");
                }
                else
                {
                    livro.Nome = nomeTextBox.Text;
                    livro.Autor = autorTextBox.Text;
                    livro.Editora = editoraTextBox.Text;
                    livro.AnoDaPublicacao = Convert.ToDateTime(anoPublicacaodateTime.Text);
                    DialogResult = DialogResult.OK;
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
