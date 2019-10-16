import { NgModule } from '@angular/core';
import { NotesPipe } from './notes.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [NotesPipe, SearchPipe],
  exports: [NotesPipe, SearchPipe]
})
export class PipesModule {}
