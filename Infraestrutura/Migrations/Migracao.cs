using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestrutura.Migrations
{
    [Migration(171120220908)]
    public class Migracao : Migration
    {
        public override void Down()
        {
            Delete.Table("Livro");
        }

        public override void Up()
        {
            Create.Table("Livro")
                .WithColumn("Codigo").AsInt32().PrimaryKey().Identity()
                .WithColumn("Nome").AsString(50)
                .WithColumn("Autor").AsString(50)
                .WithColumn("Editora").AsString(50)
                .WithColumn("AnoPublicacao").AsDateTime();
        }
    }
}
