using FluentMigrator;

namespace DataBaseMigration.Migrations
{
    public class M0001_CreateMemberTable : Migration
    {
        public override void Up()
        {
            Create.Table("Livro")
                .WithColumn("Codigo").AsInt32().PrimaryKey().Identity()
                .WithColumn("Nome").AsString(50)
                .WithColumn("Autor").AsString(50)
                .WithColumn("Editora").AsString(10)
                .WithColumn("AnoPublicacao").AsDateTime();
        }

        public override void Down()
        {
            Delete.Table("Livro");
        }
    }
}
