import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateFolderFormComponent } from '../create-folder-form/create-folder-form.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Folder } from '../../../../core/interfaces/folders/folder.model';

@Component({
  selector: 'app-folders-list',
  imports: [CreateFolderFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent implements OnInit {
  @Input() foldersList: Folder[] = []
  @Output() refreshFolderData= new EventEmitter<boolean>();
  showForm: boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showFolderCreationForm(){
    this.showForm = true
  }

  refreshFolderList(){
    this.refreshFolderData.emit();
    this.router.navigateByUrl("");
  }

  hideFolderForm(){
    this.showForm = false;
  }
}
