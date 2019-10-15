import {Injectable} from '@angular/core';
import {Note} from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class EditNoteService {
    noteToEdit: Note;
}
