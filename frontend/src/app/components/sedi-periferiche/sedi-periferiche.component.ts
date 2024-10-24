import { Component, Input } from '@angular/core';
import { ToprightbarComponent } from '../toprightbar/toprightbar.component';
import { CercaComponent } from '../cerca/cerca.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { IOffice } from '../../models/IOffice';
import {
    selectElencoUfficiSelezionati,
    selectHomeTabSelected,
    selectUfficioSelezionato,
    selectUfficiPeriferici
} from '../../store/selectors/rubrica.selector';
import {
    AddElencoUfficiSelezionati,
    DelElencoUfficiSelezionati,
    RubricaActionType,
    SetHomeTabSelected,
    SetIdSelectedOfficeComponent,
    SetUfficioSelezionato
} from '../../store/actions/rubrica.action';
import { UfficiComponent } from '../uffici/uffici.component';
import { NgForOf, NgIf } from '@angular/common';
import { faAddressBook, faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SottoufficiComponent } from '../sottouffici/sottouffici.component';
import { PersonaleComponent } from '../personale/personale.component';
import { selectLoggedUser } from '../../store/selectors/authuser.selector';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContattiFormComponent } from '../form/contatti-form/contatti-form.component';

@Component({
    selector: 'vvfrubrica-sedi-periferiche',
    standalone: true,
    imports: [
        CercaComponent,
        ToprightbarComponent,
        UfficiComponent,
        PersonaleComponent,
        NgForOf,
        NgIf,
        FontAwesomeModule,
        SottoufficiComponent,
    ],
    templateUrl: './sedi-periferiche.component.html',
    styleUrl: './sedi-periferiche.component.css'
})
export class SediPerifericheComponent {
    faAddressBook = faAddressBook;
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;
    faEdit = faEdit;

    homeItems$ = this._storeApp$.select(selectUfficiPeriferici);
    homeItems: Array<IOffice> = [];

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice | null = null;

    leftComponentSelected$ = this._storeApp$.select(selectHomeTabSelected);
    leftComponentSelected: string = 'ufficiDipendenti';

    elencoUfficiSelezionati$ = this._storeApp$.select(selectElencoUfficiSelezionati);
    elencoUfficiSelezionati: Array<IOffice | null> | null = null;

    loggedUser$: any = this._storeApp$.select(selectLoggedUser);
    loggedUser: any = {};

    visualizeActionBar: boolean = false;
    modal?: BsModalRef;

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService) { }

    ngOnInit() {
        this._storeApp$.dispatch({ type: RubricaActionType.GetUfficiPeriferici });
        this.homeItems$.subscribe(items => {
            this.homeItems = [...(items.rubrica ?? [])];
            //this.testVar.setOffices(this.homeItems);
        });

        this.loggedUser$.subscribe((loggedUser: any) => {
            this.loggedUser = { ...loggedUser };

            this.visualizeActionBar = false;
            if (Object.keys(this.loggedUser).length > 0) {
                this.visualizeActionBar = true;
            }
        });

        this.ufficioSelezionato$.subscribe(
            items => {
                this.ufficioSelezionato = { ...items };

                if (Object.keys(this.ufficioSelezionato ?? {}).length > 0) {
                    let txtHomeTabSelected = 'ufficiDipendenti';

                    if (this.ufficioSelezionato?.children.length == 0) {
                        txtHomeTabSelected = 'componenti';
                    }
                    this._storeApp$.dispatch(SetHomeTabSelected({ homeTabSelected: txtHomeTabSelected }));
                }
            }
        );

        this.leftComponentSelected$.subscribe(comp => this.leftComponentSelected = comp);
        this.elencoUfficiSelezionati$.subscribe(ele => this.elencoUfficiSelezionati = ele);
        this._storeApp$.dispatch(SetIdSelectedOfficeComponent({ id: this.homeItems[0]?.codiceUfficio }));
    }

    receiveBack(back: string) {
        let prevOffice: IOffice | null = this.returnLastSelectedOffice();

        if (prevOffice != null) {
            if (this.searchIfExiste(prevOffice)) {
                this.popOfficeInList();
                prevOffice = this.returnLastSelectedOffice();
            }

            this._storeApp$.dispatch(SetUfficioSelezionato({ ufficioSelezionato: prevOffice }));
        }
    }

    clickSubOffice(idSubOffice: string = '') {
        let temp: Array<IOffice> = this.ufficioSelezionato?.children.filter(element => element['codiceUfficio'] == idSubOffice) ?? [];

        if (temp.length > 0) {
            if (!this.searchIfExiste(temp[0])) {
                this.appendOfficeInList(temp[0]);
            }

            this._storeApp$.dispatch(SetUfficioSelezionato({ ufficioSelezionato: temp[0] }));
        }
    }

    searchIfExiste(offices: IOffice | null): boolean {
        let trovato: boolean = false;

        for (let office of this.elencoUfficiSelezionati ?? []) {
            if (office?.codiceUfficio == offices?.codiceUfficio) {
                trovato = true;
                break;
            }
        }

        return trovato;
    }

    returnLastSelectedOffice(): IOffice | null {
        let tempElencoUfficiSelezionati: Array<IOffice | null> | null = [...(this.elencoUfficiSelezionati ?? [])];
        return tempElencoUfficiSelezionati?.pop() ?? null;
    }

    appendOfficeInList(office: IOffice | null) {
        this._storeApp$.dispatch(AddElencoUfficiSelezionati({ ufficioSelezionato: office }));
    }

    popOfficeInList() {
        this._storeApp$.dispatch(DelElencoUfficiSelezionati());
    }

    onAddContactClick(codiceUfficio: string = '') {
        const initialState = {
            title: 'Aggiungi Contatto: ',
            //ufficio: this.itemDst,
        };

        this.openModal(initialState);
    }

    onEditContactClick(codiceUfficio: string = '', idContatto: number = 0) {
        const initialState = {
            title: 'Aggiungi Contatto: ',
            contatto: this.ufficioSelezionato?.contatti?.filter(child => child.id == idContatto)[0]
            //ufficio: this.itemDst,
        };

        this.openModal(initialState);
    }

    openModal(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-sm',
        };

        this.modal = this.modalService.show(ContattiFormComponent, config);
    }
}
