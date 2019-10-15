import {Component, ViewChild} from '@angular/core';
import {StorageService, Note} from '../services/storage.service';
import {DataService} from '../services/data.service';
import {NavController, Platform, ToastController} from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {TabsPage} from '../tabs/tabs.page';
import {EditNoteService} from '../providers/edit.provider';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends TabsPage {

    notes: Note[] = [];

    searchTerm = '';
    filteredNotes: Note[] = [];


    constructor(private storageService: StorageService, private plt: Platform, private dataService: DataService,
                private sanitizer: DomSanitizer,
                editNoteService: EditNoteService,
                navController: NavController,
                private toastController: ToastController) {
        super(navController, editNoteService);
        this.plt.ready().then(() => {
            this.loadItems();
        });
    }

    ionViewDidEnter() {
        this.loadItems();
    }

    doReorder(ev: any) {
        ev.detail.complete(this.notes);
        this.notes = ev.detail.complete(this.notes);
    }


    unArchive(note: Note) {
        note.archived = false;
        this.storageService.updateItem(note).then(item => {
            this.loadItems();
        });
    }
    loadItems() {
        this.storageService.getItems().then(notes => {
            if (notes.filter(note => note.archived === true).length !== this.notes.length) {
                this.notes = notes.filter(note => note.archived === true);
                this.search();
            }
        });
    }

    deleteItem(note: Note) {
        this.storageService.deleteItem(note.id).then(item => {
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

    getLabel(note) {
        return this.sanitizer.bypassSecurityTrustStyle(note.label);
    }

}
