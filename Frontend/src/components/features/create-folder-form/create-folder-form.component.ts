import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FolderService } from '../../../services/folder.service';
import { CreateFolder } from '../../../interfaces/creation-dtos/create-folder';
import { FormsModule } from '@angular/forms';

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

  constructor(private folderService: FolderService) { 
    this.folderModel = {
      name: undefined,
      userId: 'EF9B9230-51B7-4270-513D-08DD80D8D7F1'
    }
  }

  ngOnInit() {
  }

  createFolder(){
    this.folderService.postFolder(this.folderModel)
      .subscribe(response => this.successfullCreate.emit());
  }

  hideFolder(){
    this.hideFolderForm.emit();
  }
}
