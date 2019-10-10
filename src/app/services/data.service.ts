import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor() { }

    search(searchTerm, notes) {
        return notes.filter(note => {
            return note.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
        });
    }
}

