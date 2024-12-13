namespace NoteManagementSystemAPI.Models.Dtos;
using System;
using System.ComponentModel.DataAnnotations;

public class CreateNoteDto
{
    [Required]
    [StringLength(100, ErrorMessage = "Note content cannot exceed 100 characters.")]
    public string Content { get; set; }

    [Required]
    public string Type { get; set; }

    public DateTime? ReminderDateTime { get; set; } 
    public DateTime? DueDateTime { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public string? BookmarkUrl { get; set; } 
}

