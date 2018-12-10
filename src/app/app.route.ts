import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { KichenComponent } from './kichen/kichen.component';

const APP_ROUTES: Routes = [
    {
        path: 'home',
        component: CustomerComponent
    },
    {
        path: 'kichen',
        component: KichenComponent
    },
    {
        path: '',
        component: CustomerComponent
    },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);