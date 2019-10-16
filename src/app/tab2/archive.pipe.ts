import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../services/storage.service';

@Pipe({
  name: 'archive'
})
export class ArchivePipe implements PipeTransform {
  transform(notes: Note[], archived: boolean): any {
    return notes.filter(note => note.archived === archived);
  }
}
