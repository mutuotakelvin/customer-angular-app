import { NgModule } from "@angular/core";

import { CapitalizePipe } from "./capitalized.pipes";

@NgModule({
    declarations: [CapitalizePipe],
    exports: [CapitalizePipe]
})

export class SharedModule{}