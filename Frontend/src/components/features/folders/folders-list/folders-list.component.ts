import {
  Component, EventEmitter, Input, Output, TemplateRef
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFolderFormComponent } from '../create-folder-form/create-folder-form.component';
import { Folder } from '../../../../core/interfaces/folders/folder.model';

@Component({
  selector: 'app-folders-list',
  imports: [CreateFolderFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent {
  @Input() foldersList: Folder[] = [];
  @Output() refreshFolderData = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {}

  showFolderCreationForm(content: TemplateRef<any>): void {
    this.modalService.open(content, {
      centered: true,
      ariaLabelledBy: 'create-folder-title'
    });
  }

  refreshFolderList(): void {
    this.refreshFolderData.emit();
    this.router.navigateByUrl('');
  }
}