import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layout/main-layout/main-layout.component';
import { CreateMediaFormComponent } from '../components/features/create-media-form/create-media-form.component';
import { EditMediaFormComponent } from '../components/features/edit-media-form/edit-media-form.component';
import { UserFilesViewComponent } from '../components/features/user-files-view/user-files-view.component';
import { FolderFilesViewComponent } from '../components/features/folder-files-view/folder-files-view.component';
import { LoginComponent } from '../components/features/auth/login/login.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [ 
    {  
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: UserFilesViewComponent,
            },
            {
                path: 'createMedia',
                component: CreateMediaFormComponent
            },
            {
                path: 'editMedia/:mediaType/:id',
                component: EditMediaFormComponent
            },
            {
                path: 'folderView/:id',
                component: FolderFilesViewComponent
            },
        ],
    }
];
