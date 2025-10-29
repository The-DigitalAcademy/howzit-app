import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
   {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: "create-post",
    component: CreatePostComponent
  }
  

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
