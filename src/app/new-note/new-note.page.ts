import {Component, OnInit} from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import {Note, StorageService} from '../services/storage.service';
import {NavController, Platform, ToastController} from '@ionic/angular';


@Component({
    selector: 'app-new-note',
    templateUrl: './new-note.page.html',
    styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

    newNote: Note = {} as Note;

    constructor(private storageService: StorageService,
                private plt: Platform,
                private toastController: ToastController,
                private datePicker: DatePicker,
                private navController: NavController) {
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

    openPicker() {
        this.datePicker.show({
            date: new Date(),
            mode: 'datetime',
            allowOldDates: false,
            allowFutureDates: true,
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => this.newNote.reminder = date.toDateString(),
            err => console.log('Error occurred while getting date: ', err)
        );
    }

}
