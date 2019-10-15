import { Component } from '@angular/core';
import {Note} from '../services/storage.service';
import {NavController} from '@ionic/angular';
import {EditNoteService} from '../providers/edit.provider';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(protected navController: NavController, private editNoteService: EditNoteService) {}

  editNote(note: Note) {
    this.editNoteService.noteToEdit = note;
    this.navController.navigateForward('new-note');
  }

}
