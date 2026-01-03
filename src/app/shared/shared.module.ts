import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';

// you can see bootstrap only in root module
// exports: is used to export components to make them available to other modules
@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class SharedModule {}
