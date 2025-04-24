import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FolderService } from '../../../services/folder.service';
import { CreateFolder } from '../../../interfaces/creation-dtos/create-folder';
import { FormsModule } from '@angular/forms';
import { AppGlobalConstants } from '../../../core/global/global-variables';

@Component({
  selector: 'app-create-folder-form',
  imports: [FormsModule],
  templateUrl: './create-folder-form.component.html',
  styleUrls: ['./create-folder-form.component.css']
})
export class CreateFolderFormComponent implements OnInit {
  folderModel: CreateFolder;
  @Output() successfullCreate = new EventEmitter<boolean>();
  @Output() hideFolderForm = new EventEmitter<boolean>();

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;

  constructor(private folderService: FolderService) { 
    this.folderModel = {
      name: undefined,
      userId: this.userId
    }
  }

  ngOnInit() {
  }

  createFolder(){
    this.folderService.postFolder(this.folderModel)
      .subscribe(response => {
        this.hideFolder();
        this.successfullCreate.emit()
      });
  }

  hideFolder(){
    this.hideFolderForm.emit();
  }
}
