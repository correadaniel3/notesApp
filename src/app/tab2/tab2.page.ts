import {Component, ViewChild} from '@angular/core';
import {StorageService, Note} from '../services/storage.service';
import {DataService} from '../services/data.service';
import {Platform, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    notes: Note[] = [];

    searchTerm = '';
    filteredNotes: Note[] = [];


    constructor(private storageService: StorageService, private plt: Platform, private dataService: DataService,
                private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.loadItems();
        });
    }

    doReorder(ev: any) {
        ev.detail.complete(this.notes);
        this.notes = ev.detail.complete(this.notes);
    }

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    unArchive(note: Note) {
        note.archived = false;
        this.storageService.updateItem(note).then(item => {
            this.loadItems();
        });
    }
    loadItems() {
        this.storageService.getItems().then(notes => {
            this.notes = notes.filter(note => note.archived === true);
            this.search();
        });
    }

    deleteItem(note: Note) {
        this.storageService.deleteItem(note.id).then(item => {
            this.showToast('Item removed!');
            this.loadItems();
        });
    }

    search() {
        if (Boolean(this.searchTerm)) {
            this.filteredNotes = this.notes.filter(note => {
                return note.title.toLocaleLowerCase().indexOf(this.searchTerm.toLocaleLowerCase()) > -1;
            });
        } else {
            this.filteredNotes = this.notes;
        }
    }

}
