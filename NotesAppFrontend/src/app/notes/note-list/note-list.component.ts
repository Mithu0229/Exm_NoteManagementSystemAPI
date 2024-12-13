import { Component, OnInit } from '@angular/core';
import { NoteType, NoteDto } from '../models/note.model';
import { NoteService } from '../notes.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: NoteDto[] = [];
  filteredNotes: NoteDto[] = [];
  NoteType = NoteType;

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.getNotes();
  }
  noteTypes = Object.values(NoteType);

  onNoteTypeChange(type: any) {
    this.filteredNotes = this.notes.filter((x) => x.type == type.value);
  }

  getNotes(): void {
    try {
      this.noteService.getNotes().subscribe({
        next: (notes) => {
          this.notes = notes;
          this.filteredNotes = notes;
        },
        error: (err) => {
          console.error('Failed to load notes:', err);
        },
      });
    } catch (error) {}
  }

  filterNotes(filter: string): void {
    try {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const validDate = (date: string | null | undefined): Date | null => {
        return date ? new Date(date) : null;
      };

      if (filter === 'all') {
        this.filteredNotes = this.notes;
      } else if (filter === 'today') {
        this.filteredNotes = this.notes.filter((note) => {
          const noteDate = validDate(note.reminderDateTime || note.dueDateTime);
          return noteDate?.toDateString() === today.toDateString();
        });
      } else if (filter === 'week') {
        this.filteredNotes = this.notes.filter((note) => {
          const noteDate = validDate(note.reminderDateTime || note.dueDateTime);
          return noteDate && noteDate >= startOfWeek && noteDate <= today;
        });
      } else if (filter === 'month') {
        this.filteredNotes = this.notes.filter((note) => {
          const noteDate = validDate(note.reminderDateTime || note.dueDateTime);
          return noteDate && noteDate >= startOfMonth && noteDate <= today;
        });
      }
    } catch (error) {}
  }

  editNote(note: any) {
    this.router.navigate(['/update-note', note.id]);
  }

  deleteNote(noteId: string): void {
    try {
      this.noteService.deleteNote(noteId).subscribe({
        next: (response) => {
          alert('Note deleted successfully');
          this.getNotes(); // Refresh the notes list after deletion
        },
        error: (err) => {
          alert('Failed to delete note');
          console.error('Error deleting note:', err);
        },
      });
    } catch (error) {}
  }

  CompleteTask(noteId: string): void {
    try {
      this.noteService.completeTask(noteId).subscribe({
        next: (response) => {
          alert('Task completed successfully');
          this.getNotes(); // Refresh the notes list after deletion
        },
        error: (err) => {
          alert('Failed to complete task');
          console.error('Error deleting note:', err);
        },
      });
    } catch (error) {}
  }

  openCreateNote() {
    this.router.navigate(['/create-note']);
  }
}
