import { Component, ViewChild } from '@angular/core';
import { StorageService, Note } from '../services/storage.service';
import { DataService } from '../services/data.service';
import { NavController, Platform, ToastController } from '@ionic/angular';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs.page';
import { EditNoteService } from '../providers/edit.provider';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends TabsPage {
  notes: Note[] = [];

  searchText = '';
  filteredNotes: Note[] = [];

  constructor(
    public storageService: StorageService,
    private sanitizer: DomSanitizer,
    editNoteService: EditNoteService,
    navController: NavController
  ) {
    super(navController, editNoteService);
  }

  search(event: any) {
    this.searchText = event.detail.value;
  }

  doReorder(ev: any) {
    ev.detail.complete(this.notes);
    this.notes = ev.detail.complete(this.notes);
  }

  unArchive(note: Note) {
    note.archived = false;
    this.storageService.updateItem(note);
  }

  deleteItem(note: Note) {
    this.storageService.deleteItem(note.id);
  }

  getLabel(note) {
    return this.sanitizer.bypassSecurityTrustStyle(note.label);
  }
}
