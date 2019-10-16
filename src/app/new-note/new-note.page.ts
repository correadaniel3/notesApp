import { Component, OnInit } from '@angular/core';
import { Note, StorageService } from '../services/storage.service';
import { NavController, Platform, ToastController } from '@ionic/angular';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import { EditNoteService } from '../providers/edit.provider';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss']
})
export class NewNotePage implements OnInit {
  newNote: Note = {} as Note;
  date = new Date().toISOString();
  title = '';

  constructor(
    private storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController,
    private sanitizer: DomSanitizer,
    private editNoteService: EditNoteService,
    private navController: NavController
  ) {
    this.showReminder();
    if (this.editNoteService.noteToEdit != null) {
      this.title = 'Editar Nota';
      this.newNote = this.editNoteService.noteToEdit;
    } else {
      this.title = 'Nueva Nota';
    }
  }

  ngOnInit() {}

  addOrUpdateItem() {
    if (this.editNoteService.noteToEdit == null) {
      this.addItem();
    } else {
      this.updateItem();
    }
  }

  addItem() {
    this.newNote.id = Date.now();
    this.newNote.archived = false;
    this.storageService.addItem(this.newNote).then(note => {
      this.newNote = {} as Note;
      this.navController.navigateForward('tabs/tab1');
    });
  }

  updateItem() {
    this.storageService.updateItem(this.newNote).then(note => {
      this.newNote = {} as Note;
      this.navController.navigateForward('tabs/tab1');
    });
  }

  ionViewDidLeave() {
    this.editNoteService.noteToEdit = null;
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
