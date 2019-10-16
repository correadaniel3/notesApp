import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../services/storage.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(notes: Note[], text: string): any {
    if (text === '') {
      return notes;
    }

    return notes.filter(note => {
      return note.title.toLowerCase().includes(text.toLowerCase());
    });
  }
}
