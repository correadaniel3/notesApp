import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../services/storage.service';

@Pipe({
  name: 'notespipe'
})
export class NotesPipe implements PipeTransform {
  transform(notes: Note[], archived: boolean): any {
    return notes.filter(note => note.archived === archived);
  }
}
