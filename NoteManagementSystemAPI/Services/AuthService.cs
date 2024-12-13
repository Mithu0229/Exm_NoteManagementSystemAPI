using Microsoft.AspNetCore.Mvc;
using NoteManagementSystemAPI.Data;
using NoteManagementSystemAPI.Models;
using NoteManagementSystemAPI.Models.Dtos;
using System.Reflection;

namespace NoteManagementSystemAPI.Services
{
    public class AuthService : IAuthService
    {
        public User Login(LoginDto model)
        {
            try
            {
                return InMemoryStorage.Users.FirstOrDefault(u => u.Email == model.Email);
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        public bool Signin(RegisterDto model)
        {
            try
            {
                var user = new User
                {
                    Id = InMemoryStorage.Users.Count + 1,
                    Name = model.Name,
                    Email = model.Email,
                    Dob = model.Dob,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password)
                };

                InMemoryStorage.Users.Add(user);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public bool IsExistUser(string email)
        {
			try
			{
                return InMemoryStorage.Users.Any(u => u.Email == email);

            }
            catch (Exception ex)
			{

				throw;
			}
        }


    }
}
