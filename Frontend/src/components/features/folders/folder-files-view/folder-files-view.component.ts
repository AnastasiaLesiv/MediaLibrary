import { Component, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaFilesTableComponent } from '../../generic/media-files-table/media-files-table.component';
import { MediaFile } from '../../../../core/interfaces/mediafiles/media-file.model';
import { Folder } from '../../../../core/interfaces/folders/folder.model';
import { FolderService } from '../../../../core/api/services/folder.service';
import { ReloadFoldersListService } from '../../../../core/services/component-behaviours/reload-folders-list.service';
import { UsersService } from '../../../../core/api/services/users.service';
import { Audio } from '../../../../core/interfaces/mediafiles/audio.model';
import { Image } from '../../../../core/interfaces/mediafiles/image.model';
import { Video } from '../../../../core/interfaces/mediafiles/video.model';
import { Ebook } from '../../../../core/interfaces/mediafiles/ebook.model';
import { MediaType } from '../../../../core/enums/media-type';
import { transformToMediaFileList } from '../../../../core/helpers/to-mediafile.helper';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-folder-files-view',
  imports: [MediaFilesTableComponent, NgbDropdownModule, FormsModule],
  templateUrl: './folder-files-view.component.html',
  styleUrls: ['./folder-files-view.component.css']
})
export class FolderFilesViewComponent implements OnInit, OnChanges {
  @Input() id?: number;
  mediaFiles: MediaFile[] = [];
  userFolders: Folder[] = [];

  folderName?: string;
  editedFolderName: string = '';
  isRenaming: boolean = false;
  
  
  constructor(private folderService: FolderService, 
              private router: Router,
              private modalService: NgbModal,
              private reloadFoldersService: ReloadFoldersListService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.reloadMediaFiles();
    this.getUserFoldersData();
  }

  getUserFoldersData() {
    this.usersService.getUserFolders()
      .subscribe(response => this.userFolders = response);
  }

  ngOnChanges() {
    this.reloadMediaFiles();
  }

  reloadMediaFiles(){
    this.folderService.getFolderById(this.id!) 
      .subscribe(response => {
        this.folderName = response.name;
        this.mediaFiles = transformToMediaFileList(response.audios!, response.images!, response.videos!, response.ebooks!);
      });
    this.getUserFoldersData();
  }

  openRenameFolder(content: TemplateRef<any>): void {
    this.editedFolderName = this.folderName ?? '';

    this.modalService.open(content, {
      centered: true,
      ariaLabelledBy: 'rename-folder-title'
    });
  }

  saveFolderName(modal: NgbActiveModal): void {
    const name = this.editedFolderName.trim();

    if (
      this.id === undefined ||
      !name ||
      name.length > 100 ||
      this.isRenaming
    ) {
      return;
    }

    this.isRenaming = true;

    this.folderService.putFolder(this.id, name).subscribe({
      next: () => {
        this.folderName = name;
        this.isRenaming = false;

        this.reloadFoldersService.reloadFolder();
        this.getUserFoldersData();

        modal.close();
      },
      error: () => {
        this.isRenaming = false;
      }
    });
  }

  deleteFolder(){
    this.folderService.deleteFolder(this.id!).subscribe(response =>{
      this.reloadFoldersService.reloadFolder();
      this.router.navigateByUrl("")
    });
  }

  open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then( result =>{
          if(result === "Save click"){
            this.deleteFolder();
          }
        }
      );
    }
}