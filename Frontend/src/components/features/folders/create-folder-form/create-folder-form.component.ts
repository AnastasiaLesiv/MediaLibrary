import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { CreateFolder } from '../../../../core/interfaces/folders/create-folder.model';
import { FolderService } from '../../../../core/api/services/folder.service';
import { AppGlobalConstants } from '../../../../core/global/global-variables';

@Component({
  selector: 'app-create-folder-form',
  imports: [FormsModule],
  templateUrl: './create-folder-form.component.html',
  styleUrls: ['./create-folder-form.component.css']
})
export class CreateFolderFormComponent {
  @Output() successfullCreate = new EventEmitter<boolean>();
  @Output() hideFolderForm = new EventEmitter<boolean>();

  folderModel: CreateFolder = {
    name: '',
    userId: sessionStorage.getItem(
      AppGlobalConstants.sessionStorageUserId
    )!
  };

  isSaving = false;

  constructor(private folderService: FolderService) {}

  createFolder(): void {
    const name = this.folderModel.name?.trim() ?? '';

    if (!name || name.length > 100 || this.isSaving) {
      return;
    }

    this.isSaving = true;

    this.folderService.postFolder({ ...this.folderModel, name })
      .pipe(finalize(() => this.isSaving = false))
      .subscribe({
        next: () => this.successfullCreate.emit(true),
        error: () => {}
      });
  }

  hideFolder(): void {
    if (!this.isSaving) {
      this.hideFolderForm.emit(true);
    }
  }
}