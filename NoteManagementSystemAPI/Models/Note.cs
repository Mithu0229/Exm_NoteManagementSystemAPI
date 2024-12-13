namespace NoteManagementSystemAPI.Models;
public class Note
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Type { get; set; } 
    public string Content { get; set; }
    public DateTime? ReminderDateTime { get; set; }
    public DateTime? DueDateTime { get; set; }
    public bool IsCompleted { get; set; }

    public string? BookmarkUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
