// services/note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateNoteDto, NoteDto } from './models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}notes`;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<NoteDto[]> {
    return this.http.get<NoteDto[]>(`${this.apiUrl}/getNotes`);
  }

  createNote(note: CreateNoteDto): Observable<CreateNoteDto> {
    return this.http.post<CreateNoteDto>(`${this.apiUrl}/create`, note);
  }

  updateNote(id: number, model: CreateNoteDto): Observable<CreateNoteDto> {
    return this.http.put<CreateNoteDto>(`${this.apiUrl}/UpdateNote/${id}`, model);
  }

  
  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteNote/${id}`);
  }
  completeTask(id: string): Observable<any> {
    const url = `${this.apiUrl}/CompleteTask/${id}`;
    return this.http.get(url);
  }
  getNoteById(id: number): Observable<any> {
    const url = `${this.apiUrl}/GetNoteById/${id}`;
    return this.http.get(url);
  }
  
}
