import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : "",
        loadComponent: () => import('./fetch-details/fetch-details.component').then((c) => c.FetchDetailsComponent)
    },
    {
        path : "add-task",
        loadComponent: () => import('./add-form/add-form.component').then((c) => c.AddFormComponent)
    },
    {
        path : "update-task",
        loadComponent: () => import('./update-details/update-details.component').then((c) => c.UpdateDetailsComponent)
    },
];
