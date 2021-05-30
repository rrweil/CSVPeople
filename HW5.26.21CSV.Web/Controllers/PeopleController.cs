using CsvHelper;
using HW5._26._21CSV.Data;
using HW5._26._21CSV.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW5._26._21CSV.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("generatePeopleCSV/{amount}")]
        public IActionResult GeneratePeopleCSV (int amount)
        {
            
            var people = generatePeople(amount);
            string csvString = GenerateCsv(people);
            var bytes = Encoding.UTF8.GetBytes(csvString);
            return File(bytes, "text/csv", "people.csv");
        }

        [HttpPost]
        [Route("importCSV")]
        public void ImportCSV(FileViewModel vm)
        {
            byte[] fileData = Convert.FromBase64String(vm.Base64File);
            var ppl2 = GetPeopleFromCsv(fileData);

            var repo = new PersonRepository(_connectionString);
            foreach (var person in ppl2)
            {
                repo.AddPerson(person);
            }
        }

        [HttpGet]
        [Route("getPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetPeople();

        }

        [HttpPost]
        [Route("DeleteAllPeople")]
        public void DeleteAllPeople()
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAllPeople();
        }

        private List<Person> GetPeopleFromCsv(byte[] csvBytes)
        {
            using var memoryStream = new MemoryStream(csvBytes);
            using var reader = new StreamReader(memoryStream);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            return csv.GetRecords<Person>().ToList();
        }

        private string GenerateCsv(List<Person> ppl)
        {
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);

            using var csv = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csv.WriteRecords(ppl);

            return builder.ToString();
        }


        private List<Person> generatePeople(int amount)
        {
            var people = new List<Person>();

            for(int i = 0; i < amount; i++)
            {
                people.Add(new Person
                {
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    Address = Faker.Address.StreetAddress(),
                    Age = Faker.RandomNumber.Next(10, 80),
                    Email = Faker.Internet.Email()
                });
            }
            
            return people;
        }
    }
}
