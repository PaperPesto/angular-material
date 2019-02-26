import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@Angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ]
})

export class MaterialModule { }