import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { IOffice } from '../../models/IOffice';
import { selectElencoUfficiSelezionati, selectUfficioSelezionato } from '../../store/selectors/rubrica.selector';
import { NgForOf, NgIf } from '@angular/common';
import { faAddressBook, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonaleFormComponent } from '../form/personale-form/personale-form.component';
import { IPersonale } from '../../models/IPersonale';
import { RubricaActionType, SetPersonaDaMoficiare } from '../../store/actions/rubrica.action';

@Component({
    selector: 'vvfrubrica-personale',
    standalone: true,
    imports: [NgForOf, NgIf, FontAwesomeModule],
    templateUrl: './personale.component.html',
    styleUrl: './personale.component.css'
})
export class PersonaleComponent {
    faAddressBook = faAddressBook;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato?: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };

    elencoUfficio$ = this._storeApp$.select(selectElencoUfficiSelezionati);
    elencoUfficio?: Array<IOffice> = [];

    @Input()
    visualizeActionBar: boolean = false;

    modal?: BsModalRef;

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService) { }

    ngOnInit() {
        this._storeApp$.dispatch({type: RubricaActionType.GetElencoUffici});
        this.ufficioSelezionato$.subscribe(
            items => {
                this.ufficioSelezionato = { ...items };
            }
        );

        this.elencoUfficio$.subscribe(uff => this.elencoUfficio=uff);
    }

    onEditPersonClick(id: number) {
        let temp: IPersonale | undefined = this.ufficioSelezionato?.personale?.find(pers => pers.id == id)
        this._storeApp$.dispatch(SetPersonaDaMoficiare({ persona: temp }))

        const initialState = {
            title: 'Modifica personale: ', // + off?.nomeUfficio,
        };

        this.openModal(initialState);
    }

    onDelPersonClick(id: number) {
        if (confirm('Conferma cancellazione?')) {
            console.log('cancellato !!!');
        }
    }

    openModal(initialState: object) {
        this.modal = this.modalService.show(PersonaleFormComponent, { initialState, class: 'gray modal-lg', backdrop: 'static' });
    }
}
