import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Note {
    id: number;
    title: string;
    description: string;
    reminder: string;
    archived: boolean;
    label: string;
}

const ITEMS_KEY = 'my-notes';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }

    // CREATE
    addItem(note: Note): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((notes: Note[]) => {
            if (notes) {
                notes.push(note);
                return this.storage.set(ITEMS_KEY, notes);
            } else {
                return this.storage.set(ITEMS_KEY, [note]);
            }
        });
    }

    // READ
    getItems(): Promise<Note[]> {
        return this.storage.get(ITEMS_KEY);
    }

    // UPDATE
    updateItem(note: Note): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((notes: Note[]) => {
            if (!notes || notes.length === 0) {
                return null;
            }

            const newNotes: Note[] = [];

            for (const i of notes) {
                if (i.id === note.id) {
                    newNotes.push(note);
                } else {
                    newNotes.push(i);
                }
            }

            return this.storage.set(ITEMS_KEY, newNotes);
        });
    }

    // DELETE
    deleteItem(id: number): Promise<Note> {
        return this.storage.get(ITEMS_KEY).then((notes: Note[]) => {
            if (!notes || notes.length === 0) {
                return null;
            }

            const toKeep: Note[] = [];

            for (const i of notes) {
                if (i.id !== id) {
                    toKeep.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY, toKeep);
        });
    }

    clearStorage() {
        return this.storage.clear();
    }
}
