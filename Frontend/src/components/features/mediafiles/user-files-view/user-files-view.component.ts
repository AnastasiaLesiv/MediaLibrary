import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaFilesTableComponent } from '../../generic/media-files-table/media-files-table.component';
import { MediaFile } from '../../../../core/interfaces/mediafiles/media-file.model';
import { Folder } from '../../../../core/interfaces/folders/folder.model';
import { AppGlobalConstants } from '../../../../core/global/global-variables';
import { UsersService } from '../../../../core/api/services/users.service';
import { transformToMediaFileList } from '../../../../core/helpers/to-mediafile.helper';


@Component({
  selector: 'app-user-files-view',
  imports: [MediaFilesTableComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-files-view.component.html',
  styleUrls: ['./user-files-view.component.css']
})
export class UserFilesViewComponent implements OnInit {
  tableActionsTemplate!: TemplateRef<any>;

  mediaFiles: MediaFile[] = [];
  folders: Folder[] = [];

  private userId = sessionStorage.getItem(AppGlobalConstants.sessionStorageUserId)!;
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.reloadMediaFiles();
  }

  reloadMediaFiles(){
    this.usersService.getUserById(this.userId).subscribe(response => {
      this.mediaFiles = transformToMediaFileList(response.audios!, response.images!, response.videos!, response.ebooks!);
      this.folders = response.folders!;
    });
  }

  handleTableActionsTemplate(template: TemplateRef<any>) {
    this.tableActionsTemplate = template;
  }
}
