import { Routes } from '@angular/router';
import { AccesoComponent } from './componentes/acceso/acceso.component';
import { HomeComponent } from './componentes/home/home.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DashComponent } from './componentes/dash/dash.component';
import { AuthGuard } from './guards/auth.guard';
import { EditarComponent } from './componentes/editar/editar.component';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent}, 
    {path: "inicio", component: InicioComponent},
    {path: "acceso", component: AccesoComponent},
    {path: "dash", component: DashComponent, canActivate: [AuthGuard]},
    { path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard]}
];
