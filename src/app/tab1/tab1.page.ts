import { Component, OnInit } from '@angular/core';
import { StorageService, Note } from '../services/storage.service';
import { DataService } from '../services/data.service';
import { Platform, ToastController, NavController } from '@ionic/angular';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs.page';
import { EditNoteService } from '../providers/edit.provider';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends TabsPage {
  notes: Note[] = [];
  searchText = '';
  filteredNotes: Note[] = [];
  constructor(
    public storageService: StorageService,
    private plt: Platform,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    editNoteService: EditNoteService,
    private toastController: ToastController,
    navController: NavController
  ) {
    super(navController, editNoteService);
    storageService.getItems();
  }

  search(event: any) {
    this.searchText = event.detail.value;
  }

  doReorder(ev: any) {
    ev.detail.complete();
  }

  deleteItem(note: Note) {
    this.storageService.deleteItem(note.id);
  }

  archive(note: Note) {
    note.archived = true;
    this.storageService.updateItem(note);
  }

  clearStorage() {
    this.storageService.clearStorage();
  }

  createNote() {
    this.navController.navigateForward('new-note');
  }

  getLabel(note) {
    return this.sanitizer.bypassSecurityTrustStyle(note.label);
  }
}
