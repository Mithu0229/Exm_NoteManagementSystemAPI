using Microsoft.AspNetCore.Mvc;
using NoteManagementSystemAPI.Data;
using NoteManagementSystemAPI.Models;
using NoteManagementSystemAPI.Models.Dtos;

namespace NoteManagementSystemAPI.Services
{
    public class NoteService : INoteService
    {
        public bool AddNote(CreateNoteDto model,int userId)
        {
            try
            {
                var note = new Note
                {
                    Id = InMemoryStorage.Notes.Count + 1,
                    UserId = userId,
                    Type = model.Type,
                    Content = model.Content,
                    CreatedAt = DateTime.Now,
                    BookmarkUrl = model.BookmarkUrl,
                    ReminderDateTime = model.ReminderDateTime,
                    DueDateTime = model.DueDateTime,
                    UpdatedAt = model.UpdatedAt,
                    IsCompleted = model.IsCompleted,
                };
                
                InMemoryStorage.Notes.Add(note);
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool CompletedTask(int id)
        {
            try
            {
                var note = InMemoryStorage.Notes.FirstOrDefault(n => n.Id == id);
                if (note is null) throw new Exception($"Note not found with id:{id}");
                //InMemoryStorage.Notes.Remove(note);
                note.UpdatedAt = DateTime.Now;
                note.IsCompleted = true;
                //InMemoryStorage.Notes.Add(note);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public bool DeleteNote(int id)
        {
            try
            {
                var noteObj = InMemoryStorage.Notes.FirstOrDefault(n => n.Id == id);
                if (noteObj is null) throw new Exception($"Note not found with id:{id}");
                else
                {
                    InMemoryStorage.Notes.Remove(noteObj);
                    return true;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public List<Note> GetListByUserId(int userId)
        {
            try
            {
                return InMemoryStorage.Notes.Where(n => n.UserId == userId).ToList();

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public bool UpdateNote(int id, Note model)
        {
            try
            {
                var note = InMemoryStorage.Notes.FirstOrDefault(x => x.Id == id);
                if (note is not null)
                {
                    note.Type = model.Type;
                    note.Content = model.Content;
                    note.IsCompleted = model.IsCompleted;
                    note.ReminderDateTime = model.ReminderDateTime;
                    note.DueDateTime = model.DueDateTime;
                }
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public Note GetNoteById(int id)
        {
            try
            {
                var note = InMemoryStorage.Notes.FirstOrDefault(n => n.Id == id);
                return note;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
