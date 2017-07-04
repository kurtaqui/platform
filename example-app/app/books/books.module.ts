import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { BookEffects } from './effects/book';
import { CollectionEffects } from './effects/collection';
import { BookExistsGuard } from './guards/book-exists';

import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { CollectionPageComponent } from './containers/collection-page';


export const COMPONENTS = [
  FindBookPageComponent,
  ViewBookPageComponent,
  SelectedBookPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class BooksModule {
  static forRoot() {
    return {
      ngModule: BooksRootModule,
      providers: [
        BookExistsGuard,
      ]
    }
  }
}

@NgModule({
  imports: [
    BooksModule,
    /**
     * Effects.forFeature is used to regiser effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     * 
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([
      BookEffects,
      CollectionEffects
    ]),
  ]
})
export class BooksRootModule {}