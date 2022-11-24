using Microsoft.AspNetCore.Mvc;
using ProjetoCrud;

namespace CrudSapUi5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CrudLivroController : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public CrudLivroController(IRepositorio repositorio)
        {
            _repositorio = repositorio; 
        }

        [HttpGet]
        public ActionResult<List<Livro>> BuscarTodos()
        {
            List<Livro> listaLivros = _repositorio.BuscarTodos();

            return Ok(listaLivros);
        }

        [HttpGet("{id}")]
        public ActionResult<Livro> BuscarPorId(int id)
        {
            Livro livro = _repositorio.BuscarPorId(id);

            return Ok(livro);
        }

        [HttpPost]
        public ActionResult<Livro> Cadastrar(Livro livro)
        {
            _repositorio.Cadastrar(livro);
            return Ok(livro);
        }

        [HttpPut("{id}")]
        public ActionResult<Livro> Editar(Livro livro, int id)
        {
            livro.Codigo = id;
            _repositorio.Editar(livro);
            return Ok(livro);
        }

        [HttpDelete("{id}")]
        public ActionResult<Livro> Deletar(int id)
        {
            _repositorio.Deletar(id);
            return Ok();
        }
    }
}