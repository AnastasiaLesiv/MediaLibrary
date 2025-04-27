import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layout/main-layout/main-layout.component';
import { LoginComponent } from '../components/features/auth/login/login.component';
import { authGuard } from '../core/guards/auth.guard';
import { RegisterFormComponent } from '../components/features/auth/register-form/register-form.component';
import { EditUserProfileComponent } from '../components/features/auth/edit-user-profile/edit-user-profile.component';
import { UserFilesViewComponent } from '../components/features/mediafiles/user-files-view/user-files-view.component';
import { CreateMediaFormComponent } from '../components/features/mediafiles/create-media-form/create-media-form.component';
import { EditMediaFormComponent } from '../components/features/generic/edit-media-form/edit-media-form.component';
import { FolderFilesViewComponent } from '../components/features/folders/folder-files-view/folder-files-view.component';

export const routes: Routes = [ 
    {  
        path: 'register',
        component: RegisterFormComponent,
    },
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
            {
                path: "editProfile",
                component: EditUserProfileComponent
            }
        ],
    }
];

