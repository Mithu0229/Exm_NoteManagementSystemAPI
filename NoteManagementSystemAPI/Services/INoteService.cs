using NoteManagementSystemAPI.Models;
using NoteManagementSystemAPI.Models.Dtos;

namespace NoteManagementSystemAPI.Services
{
    public interface INoteService
    {
        bool AddNote(CreateNoteDto model, int userId);
        bool UpdateNote(int id, Note model);
        List<Note> GetListByUserId(int userId);
        bool DeleteNote(int id);
        bool CompletedTask(int id);
        Note GetNoteById(int id);
    }
}
