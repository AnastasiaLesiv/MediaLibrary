import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';
import { CreateFolderFormComponent } from '../create-folder-form/create-folder-form.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-folders-list',
  imports: [CreateFolderFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent implements OnInit {
  @Input() foldersList: FolderDto[] = []
  @Output() refreshFolderData= new EventEmitter<boolean>();
  showForm: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  showFolderCreationForm(){
    this.showForm = true
  }

  refreshFolderList(){
    this.refreshFolderData.emit();
  }

  hideFolderForm(){
    this.showForm = false;
  }
}
