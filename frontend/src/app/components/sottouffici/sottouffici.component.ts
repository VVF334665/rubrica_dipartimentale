import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UfficiComponent } from "../uffici/uffici.component";
import { NgForOf } from '@angular/common';
import { IOffice } from '../../models/IOffice';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectUfficioSelezionato } from '../../store/selectors/rubrica.selector';
import { AddElencoUfficiSelezionati, SetUfficioSelezionato, SetUfficioSelezionatoPrecedente } from '../../store/actions/rubrica.action';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'vvfrubrica-sottouffici',
    standalone: true,
    templateUrl: './sottouffici.component.html',
    styleUrl: './sottouffici.component.css',
    imports: [UfficiComponent, NgForOf, MatExpansionModule]
})
export class SottoufficiComponent {
    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };
    @Input() idComponentFather: string = '';
    @Output() clickSubOffice = new EventEmitter<string>();

    constructor(private _storeApp$: Store<AppState>) { }

    ngOnInit() {
        this.ufficioSelezionato$.subscribe(items => this.ufficioSelezionato = { ...items });
    }

    leggiSottoAlbero(codiceUO: string) {
        this.clickSubOffice.emit(codiceUO);

        // let temp: Array<IOffice> = this.ufficioSelezionato.children.filter(element => element['codiceUfficio'] == codiceUO);
        // if (temp.length > 0) {
        //     this.clickSubOffice.emit('clickSubUfficio');
        //     this._storeApp$.dispatch(AddElencoUfficiSelezionati({ ufficioSelezionato: this.ufficioSelezionato }));
        //     this._storeApp$.dispatch(SetUfficioSelezionatoPrecedente({ ufficioSelezionatoPrecedente: this.ufficioSelezionato }));
        //     this._storeApp$.dispatch(SetUfficioSelezionato({ ufficioSelezionato: temp[0] }));
        //     //}
        // }
    }
}
