export enum NoteType {
    Regular = 'Regular Note',
    Reminder = 'Reminder Note',
    ToDo = 'To Do Task',
    Bookmark = 'Bookmark'
  }
  
  export interface CreateNoteDto {
    id:string;
    content: string;
    reminderDateTime?: Date |null;
    dueDateTime?: string | null;
    isCompleted: boolean;
    bookmarkUrl?: string | null;
    type:NoteType,
  }
  
  export interface NoteDto {
    id:string;
    content: string;
    reminderDateTime?: string | null;
    dueDateTime?: string | null;
    isCompleted: boolean;
    bookmarkUrl?: string | null;
    type:string,
    createdAt:Date,
    updatedAt?:Date
  }
  