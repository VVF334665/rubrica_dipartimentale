import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IOffice } from '../../models/IOffice';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RubricaService } from '../../services/rubrica.service';

@Component({
    selector: 'vvfrubrica-cerca',
    standalone: true,
    templateUrl: './cerca.component.html',
    styleUrl: './cerca.component.css',
    imports: [FontAwesomeModule, FormsModule, MatInputModule],
})
export class CercaComponent {
    faSearch = faSearch;

    searchInput: string = '';
    result?: Array<IOffice> = [];

    constructor(private _service: RubricaService) { }

    search() {
        console.log('ppppppppp: ', this.searchInput);
        this._service.getSearch(this.searchInput);
    }

    onKeydown(event: any) {
        if (event.key === "Enter") {
            this.search();
        }
    }

}
