import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { NetworksComponent } from './networks/networks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PeopleComponent } from './people/people.component';
import { RegisterComponent } from './register/register.component';
import { TvComponent } from './tv/tv.component';
import { AuthGuard, AuthGuardLog } from './services/auth.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',canActivate:[AuthGuard],   component: HomeComponent, title: 'Home' },
  { path: 'movies/:page',canActivate:[AuthGuard],  component: MoviesComponent, title: 'Movies' },
  { path: 'people/:page',canActivate:[AuthGuard],  component: PeopleComponent, title: 'People' },
  { path: 'tv/:page', canActivate:[AuthGuard], component: TvComponent, title: 'Tv' },
  { path: 'about',canActivate:[AuthGuard],  component:AboutComponent, title: 'About' },
  { path: 'search/:page',canActivate:[AuthGuard],  component:SearchComponent, title: 'Search' },
  // { path: 'networks',canActivate:[AuthGuard],  component:NetworksComponent, title: 'NetWorks' },
  { path: 'details/:id/:type', canActivate:[AuthGuard] ,component: MoviedetailsComponent, title: 'Details' },
  { path: 'login', canActivate:[AuthGuardLog] ,component: LoginComponent, title: 'LogIn' },
  { path: 'register', canActivate:[AuthGuardLog] , component: RegisterComponent, title: 'Register' },
  { path: '**',canActivate:[AuthGuard],  component: NotfoundComponent, title: 'NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// ng build --output-path docs --base-href /movie-db/