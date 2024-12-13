import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateNoteDto, NoteType } from '../models/note.model';
import { NoteService } from '../notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteTypes = Object.values(NoteType);
  NoteType = NoteType;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.noteForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(100)]],
      type: [NoteType.Regular, Validators.required],
      reminderDateTime: [''],
      dueDateTime: [''],
      isCompleted: [false],
      bookmarkUrl: [''],
      id: 0,
    });

    this.route.params.subscribe((params) => (this.id = params['id']));
  }

  ngOnInit(): void {
    this.onNoteTypeChange();
    if (this.id > 0) {
      this.getNoteById(this.id);
    }
  }

  getNoteById(id: number) {
    this.noteService.getNoteById(id).subscribe({
      next: (response) => {
        debugger;
        this.noteForm.get('id')?.setValue(response.id);
        this.noteForm.get('type')?.setValue(response.type);
        this.noteForm.get('content')?.setValue(response.content);
        this.noteForm.get('dueDateTime')?.setValue(response.dueDateTime);
      },
      error: (err) => {
        alert('Failed to create note. Please try again.');
      },
    });
  }
  // Dynamic validation based on selected note type
  onNoteTypeChange() {
    const noteType = this.noteForm.value.type;
    const reminderField = this.noteForm.get('reminderDateTime');
    const dueDateField = this.noteForm.get('dueDateTime');
    const bookmarkUrlField = this.noteForm.get('bookmarkUrl');

    // Clear previous validators
    reminderField?.clearValidators();
    dueDateField?.clearValidators();
    bookmarkUrlField?.clearValidators();

    // Add validators based on the selected note type
    if (noteType === NoteType.Reminder) {
      reminderField?.setValidators([Validators.required]);
    } else if (noteType === NoteType.ToDo) {
      dueDateField?.setValidators([Validators.required]);
    } else if (noteType === NoteType.Bookmark) {
      bookmarkUrlField?.setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/),
      ]);
    }

    // Update validators
    reminderField?.updateValueAndValidity();
    dueDateField?.updateValueAndValidity();
    bookmarkUrlField?.updateValueAndValidity();
  }

  createNote() {
    if (this.noteForm.valid) {
      const id = Number(this.noteForm.get('id')?.value);
      if (id > 0) {
        this.updateNote(id, this.noteForm.value);
      } else {
        this.addNote();
      }
    }
  }

  addNote() {
    try {
      const noteData: CreateNoteDto = {
        content: this.noteForm.value.content,
        reminderDateTime: this.noteForm.value.reminderDateTime || null,
        dueDateTime: this.noteForm.value.dueDateTime || null,
        isCompleted: this.noteForm.value.isCompleted,
        bookmarkUrl: this.noteForm.value.bookmarkUrl || null,
        id: '',
        type: this.noteForm.value.type,
      };

      this.noteService.createNote(noteData).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Failed to create note. Please try again.');
        },
      });
    } catch (error) {}
  }

  updateNote(id: number, note: any) {
    try {
      const noteData: CreateNoteDto = {
        content: this.noteForm.value.content,
        reminderDateTime: this.noteForm.value.reminderDateTime || null,
        dueDateTime: this.noteForm.value.dueDateTime || null,
        isCompleted: this.noteForm.value.isCompleted,
        bookmarkUrl: this.noteForm.value.bookmarkUrl || null,
        id: note.id,
        type: this.noteForm.value.type,
      };
      this.noteService.updateNote(id, noteData).subscribe({
        next: (response) => {},
        error: (err) => {
          alert('Failed to update note. Please try again.');
        },
      });
    } catch (error) {}
  }

  goBack() {
    try {
      this.router.navigate(['/dashboard']);
    } catch (error) {}
  }
}
