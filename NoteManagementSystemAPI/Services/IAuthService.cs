using NoteManagementSystemAPI.Models;
using NoteManagementSystemAPI.Models.Dtos;

namespace NoteManagementSystemAPI.Services
{
    public interface IAuthService
    {
        bool Signin(RegisterDto model);
        User Login(LoginDto model);

        bool IsExistUser(string email);
    }
}
