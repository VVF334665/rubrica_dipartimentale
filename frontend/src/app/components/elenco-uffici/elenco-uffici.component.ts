import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectElencoUffici } from '../../store/selectors/rubrica.selector';
import { IOffice } from '../../models/IOffice';
import { NgFor } from '@angular/common';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GetElencoUffici, RubricaActionType, SetElencoUfficiSelezionatoPerModifica } from '../../store/actions/rubrica.action';
import { Actions, ofType } from '@ngrx/effects';

@Component({
    selector: 'vvfrubrica-elenco-uffici',
    standalone: true,
    imports: [NgFor, FontAwesomeModule, FormsModule],
    templateUrl: './elenco-uffici.component.html',
    styleUrl: './elenco-uffici.component.css'
})
export class ElencoUfficiComponent {
    faSearch = faSearch;

    title: string = 'Seleziona un ufficio: ';
    closeBtnName: string = 'Chiudi';

    elencoUffici$ = this._appStore$.select(selectElencoUffici);
    elencoUffici: Array<IOffice> = [];
    elencoUfficiBack: Array<IOffice> = [];

    codiceUfficioPrecedente: string = '';
    search: string = '';

    constructor(public modal: BsModalRef, private _appStore$: Store<AppState>) { }

    ngOnInit() {
        this._appStore$.dispatch(GetElencoUffici());

        this.elencoUffici$.subscribe(uff => {
            this.elencoUffici = uff;
            this.elencoUfficiBack = uff;
        });
    }

    onSearch() {
        this.searchInArray();
    }

    onKeydown(event: any) {
        if (event.key === "Enter") {
            this.searchInArray();
        }
    }

    searchInArray() {
        this.elencoUffici = this.elencoUfficiBack.filter(uff => uff.nomeUfficio?.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    }

    dblClick(ufficio: IOffice) {
        // console.log("OOOOOOOOOOOOOOOOOOOOO: ", ufficio);
        this._appStore$.dispatch(SetElencoUfficiSelezionatoPerModifica({ufficio: ufficio}));
        this.modal.hide();
    }
}
