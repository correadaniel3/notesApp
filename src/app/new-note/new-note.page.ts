import {Component, OnInit} from '@angular/core';
import {Note, StorageService} from '../services/storage.service';
import {NavController, Platform, ToastController} from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-new-note',
    templateUrl: './new-note.page.html',
    styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

    newNote: Note = {} as Note;
    date = new Date().toISOString();

    constructor(private storageService: StorageService,
                private plt: Platform,
                private toastController: ToastController,
                private sanitizer: DomSanitizer,
                private navController: NavController) {
        this.showReminder();
    }

    ngOnInit() {
    }

    addItem() {
        this.newNote.id = Date.now();
        this.newNote.archived = false;
        this.storageService.addItem(this.newNote).then(note => {
            this.newNote = {} as Note;
            this.showToast('Note added!');
            this.navController.navigateForward('tabs');
        });
    }

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    showReminder() {
        return this.newNote.reminder == null;
    }

    showPicker() {
        document.getElementById('note-reminder').click();
    }

    showColorPicker() {
        document.getElementById('note-label').click();
    }
    getLabel() {
        return this.sanitizer.bypassSecurityTrustStyle(this.newNote.label);
    }
}
