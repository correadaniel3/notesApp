import {Component, OnInit} from '@angular/core';
import {StorageService, Note} from '../services/storage.service';
import {DataService} from '../services/data.service';
import {Platform, ToastController, NavController} from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {TabsPage} from '../tabs/tabs.page';
import {EditNoteService} from '../providers/edit.provider';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends TabsPage {
    notes: Note[] = [];
    searchTerm = '';
    filteredNotes: Note[] = [];
    constructor(private storageService: StorageService,
                private plt: Platform,
                private dataService: DataService,
                private sanitizer: DomSanitizer,
                editNoteService: EditNoteService,
                private toastController: ToastController,
                navController: NavController) {

        super(navController, editNoteService);
        this.plt.ready().then(() => {
            this.loadItems();
        });
    }

    ionViewDidEnter() {
        this.plt.ready().then(() => {
            this.loadItems();
        });
    }

    doReorder(ev: any) {
        ev.detail.complete(this.notes);
        this.notes = ev.detail.complete(this.notes);
    }


    loadItems() {
        this.storageService.getItems().then(notes => {
            if (notes.filter(note => note.archived === false).length !== this.notes.length) {
                this.notes = notes.filter(note => note.archived === false);
                this.search();
            }
        });
    }

    deleteItem(note: Note) {
        this.storageService.deleteItem(note.id).then(item => {
            this.loadItems();
        });
    }

    archive(note: Note) {
        note.archived = true;
        this.storageService.updateItem(note).then(item => {
            this.loadItems();
        });
    }

    clearStorage() {
        this.storageService.clearStorage();
    }

    createNote() {
        this.navController.navigateForward('new-note');
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

    getLabel(note) {
        return this.sanitizer.bypassSecurityTrustStyle(note.label);
    }

}
