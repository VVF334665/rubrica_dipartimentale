import { Component } from '@angular/core';
import { CercaComponent } from '../cerca/cerca.component';
import { faAddressBook, faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    selectElencoUfficiSelezionati,
    selectHome,
    selectHomeTabSelected,
    selectUfficioSelezionato
} from '../../store/selectors/rubrica.selector';
import { IOffice } from '../../models/IOffice';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { UfficiComponent } from '../uffici/uffici.component';
import { SideBarComponent } from '../navigation-bar/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SottoufficiComponent } from '../sottouffici/sottouffici.component';
import { ToprightbarComponent } from '../toprightbar/toprightbar.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PersonaleComponent } from '../personale/personale.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { Office } from '../../models/Office';
import {
    AddElencoUfficiSelezionati,
    DelContatto,
    DelElencoUfficiSelezionati,
    RubricaActionType,
    SetHomeTabSelected,
    SetIdSelectedOfficeComponent,
    SetUfficioSelezionato,
} from '../../store/actions/rubrica.action';
import { UfficiFormComponent } from '../form/uffici-form/uffici-form.component';
import { selectLoggedUser } from '../../store/selectors/authuser.selector';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContattiFormComponent } from '../form/contatti-form/contatti-form.component';
import { IContatto } from '../../models/IContatto';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'vvfrubrica-home',
    standalone: true,
    imports: [
        UfficiComponent,
        SideBarComponent,
        FontAwesomeModule,
        SottoufficiComponent,
        CercaComponent,
        UfficiFormComponent,
        ToprightbarComponent,
        AsyncPipe,
        NgForOf,
        PersonaleComponent,
        MatButtonModule,
        MatIconModule,
        NgIf,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    faAddressBook = faAddressBook;
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;
    faEdit = faEdit;
    // bsModalRef?: BsModalRef | null;

    homeItems$ = this._storeApp$.select(selectHome);
    homeItems: Array<IOffice> = [];

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice | null = null;

    leftComponentSelected$ = this._storeApp$.select(selectHomeTabSelected);
    leftComponentSelected: string = 'ufficiDipendenti';
    idComponentFather: string = '';

    elencoUfficiSelezionati$ = this._storeApp$.select(selectElencoUfficiSelezionati);
    elencoUfficiSelezionati: Array<IOffice | null> | null = null;

    loggedUser$: any = this._storeApp$.select(selectLoggedUser);
    loggedUser: any = {};

    visualizeActionBar: boolean = false;
    //testVar: Office = new Office();

    modal?: BsModalRef;

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService) { }

    ngOnInit() {
        this.loggedUser$.subscribe((loggedUser: any) => {
            this.loggedUser = { ...loggedUser };

            this.visualizeActionBar = false;
            if (Object.keys(this.loggedUser).length > 0) {
                this.visualizeActionBar = true;
            }
        });
        this._storeApp$.dispatch({ type: RubricaActionType.GetHomeRubrica });
        this.homeItems$.subscribe(items => {
            this.homeItems = [...items?.rubrica];
            //this.testVar.setOffices(this.homeItems);
        });

        this.ufficioSelezionato$.subscribe(
            items => {
                this.ufficioSelezionato = { ...items };

                /*if (Object.keys(this.ufficioSelezionato ?? {}).length > 0) {
                    let txtHomeTabSelected = 'ufficiDipendenti';

                    if (this.ufficioSelezionato?.children.length == 0) {
                        txtHomeTabSelected = 'componenti';
                    }
                    this._storeApp$.dispatch(SetHomeTabSelected({ homeTabSelected: txtHomeTabSelected }));
                }*/
            }
        );

        this.leftComponentSelected$.subscribe(comp => {
            if (comp) {
                this.leftComponentSelected = comp
            } else {
                this.leftComponentSelected = 'ufficiDipendenti';
            }
        });
        this.elencoUfficiSelezionati$.subscribe(ele => this.elencoUfficiSelezionati = ele);
        this._storeApp$.dispatch(SetIdSelectedOfficeComponent({ id: this.homeItems[0]?.codiceUfficio }));
    }

    returnLastSelectedOffice(): IOffice | null {
        let tempElencoUfficiSelezionati: Array<IOffice | null> | null = [...(this.elencoUfficiSelezionati ?? [])];
        return tempElencoUfficiSelezionati?.pop() ?? null;
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

    receiveLeftFrameSelected(frame: string) {
        this._storeApp$.dispatch(SetHomeTabSelected({ homeTabSelected: frame }));
    }

    receiveIdComponentFather(father: string) {
        this.idComponentFather = father;
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

    onDelContactClick(codiceUfficio: string = '', idContatto: number = 0) {
        if (confirm('Cancellare contatto?')) {
            if (typeof (this.ufficioSelezionato?.contatti) !== 'undefined') {
                if (this.ufficioSelezionato?.contatti?.length > 0) {
                    let temp: IContatto | undefined = this.ufficioSelezionato?.contatti?.find(contact => contact.id != idContatto);
                    this._storeApp$.dispatch(DelContatto({ contatto: temp }))
                }
            }
        }
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
