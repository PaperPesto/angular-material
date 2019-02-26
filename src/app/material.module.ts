import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule } from '@Angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule
    ]
})

export class MaterialModule { }