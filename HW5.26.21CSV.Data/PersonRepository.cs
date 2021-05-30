using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HW5._26._21CSV.Data
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(String connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            var ctx = new PersonContext(_connectionString);
            ctx.Add(person);
            ctx.SaveChanges();
        }

        public List<Person> GetPeople()
        {
            var ctx = new PersonContext(_connectionString);
            return ctx.People.ToList();
        }

        public void DeleteAllPeople()
        {
            var ctx = new PersonContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM People");
        }

    }
}
