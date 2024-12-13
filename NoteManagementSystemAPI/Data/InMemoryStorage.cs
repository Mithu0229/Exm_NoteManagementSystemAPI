using NoteManagementSystemAPI.Models;
namespace NoteManagementSystemAPI.Data;
public static class InMemoryStorage
{
    public static List<User> Users = new List<User>();
    public static List<Note> Notes = new List<Note>();
   // public static List<Reminder> Reminders = new List<Reminder>();
}
