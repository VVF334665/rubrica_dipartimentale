import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ItemNavBar } from '../../../store/Interface_store/ItemNavBar';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as navBarActions from '../../../store/NavBarStore/navBarStore.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'vvfrubrica-item-button-bar',
  standalone: true,
  imports: [MatIconModule, NgClass, NgStyle, MatButtonModule],
  templateUrl: './item-button-bar.component.html',
  styleUrl: './item-button-bar.component.css'
})
export class ItemButtonBarComponent {

  @Input() dataIN: ItemNavBar = {
    pathRouter: '',
    label: 'item',
    icon: 'sync_problem',
    status: false,
    id: 0,
    show: false
  };

  constructor(private readonly store: Store, private router: Router) { }

  clickAction() {
    // this.store.dispatch(NavBarActions.changeItemActive({ id: this.dataIN.id }))
  }

  changeClassIcon() {
    return this.dataIN.status ? 'material-symbols-outlined' : 'material-symbols-outlined';
  }

  changeClassSelected() {
    return this.dataIN.status ? 'button-selected' : 'button-notSelected';
  }

  changeLabelSelected() {
    return this.dataIN.status ? 'selectItemBar label-navbar label-selected' : 'selectItemBar label-navbar label-notSelected';
  }

  changeClassIconSelected() {
    return this.dataIN.status ? 'material-symbols' : 'material-symbols-outlined';
  }

  selectItem() {
    console.log('test123');
    this.router.navigateByUrl(this.dataIN.pathRouter).then(t => console.log(t));
    console.log('test111');
    this.store.dispatch(navBarActions.changeItemActive({id: this.dataIN.id}));
  }

}
