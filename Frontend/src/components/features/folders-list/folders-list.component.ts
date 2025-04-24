import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolderDto } from '../../../interfaces/response-dtos/folder-dto';
import { CreateFolderFormComponent } from '../create-folder-form/create-folder-form.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
