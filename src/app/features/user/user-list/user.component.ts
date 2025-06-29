import { Component, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { IUser } from '../../../shared/types/IUser';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { RowRemovedEvent, SavedEvent } from 'devextreme/ui/data_grid';
import { ListType } from '../shared/types';
import { IUsersSession } from '../../../shared/types/IUserSession';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-user',
  imports: [DxDataGridModule, CommonModule],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  protected userData: Promise<IUser[]>
  protected user: IUsersSession
  @ViewChild('dataGrid', { static: true }) dataGrid!: DxDataGridComponent;

  constructor(
    private localStorage: LocalStorageService,
    private userService: UserService
  ) {
    this.user = this.localStorage.getUser()
    this.userData = userService.getAll("") as Promise<IUser[]>
  }

  ngAfterViewInit() {
    this.dataGrid.onSaved.subscribe(e => {
      this.handleSave(e);
    });

    this.dataGrid.onRowRemoved.subscribe(e => {
      this.handleDelete(e);
    });
  }

  async handleDelete(e: RowRemovedEvent<ListType>) {
    const id = e.data.id
    await this.userService.deleteUser(id)
  }

  async handleSave(e: SavedEvent<ListType>) {
    const data = e.changes[0].data
    const { id, ...rest } = data;
    if (!id) return
    await this.userService.editUser(id, rest)
  }

}
