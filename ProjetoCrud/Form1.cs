namespace ProjetoCrud
{
    public partial class Form1 : Form
    {
        private RepositorioDB repositorioComBanco = new RepositorioDB();
        public Form1()
        {
            InitializeComponent();
            AtualizarLista();
        }

        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {
            try
            {
                telaCadastro cadastro = new telaCadastro(null);
                cadastro.ShowDialog();

                if (cadastro.DialogResult == DialogResult.OK)
                {
                    repositorioComBanco.Cadastrar(cadastro.livro);
                    MessageBox.Show("Livro cadastrado com sucesso!", "Mensagem do sistema");
                }
                AtualizarLista();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            try
            {
                var livroASerEditado = new Livro();

                if (dataGridView1.CurrentRow.Selected)
                {
                    livroASerEditado = dataGridView1.CurrentRow.DataBoundItem as Livro;
                    telaCadastro cadastro = new telaCadastro(livroASerEditado);
                    cadastro.ShowDialog();

                    if (cadastro.DialogResult == DialogResult.OK)
                    {
                        cadastro.livro.Codigo = livroASerEditado.Codigo;
                        repositorioComBanco.Editar(cadastro.livro);
                        MessageBox.Show("Livro editado com sucesso!", "Mensagem do sistema");
                    }
                    AtualizarLista();
                }
                else
                {
                    MessageBox.Show("Selecione um livro para editar", "Mensagem do sistema");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Não há livros para editar" + ex.Message, "Mensagem do sistema");
            }
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            try
            {
                if (dataGridView1.CurrentRow.Selected)
                {
                    if (DesejaDeletarOLivro())
                    {
                        int livroASerDeletado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                        repositorioComBanco.Deletar(livroASerDeletado);
                        AtualizarLista();
                    }
                }
                else
                {
                    MessageBox.Show("Selecione um livro para deletar", "Mensagem do sistema");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Não há livro para deletar" + ex.Message, "Mensagem do sistema");
            }
        }
        private void AtualizarLista()
        {
            dataGridView1.DataSource = repositorioComBanco.BuscarTodos();
            dataGridView1.ClearSelection();
        }

        private static bool DesejaDeletarOLivro()
        {
            return MessageBox.Show("Deseja realmente deletar este livro? ",
                "Mensagem do sistema", MessageBoxButtons.YesNo, MessageBoxIcon.Question,
                MessageBoxDefaultButton.Button2) == DialogResult.Yes;
        }
    }
}