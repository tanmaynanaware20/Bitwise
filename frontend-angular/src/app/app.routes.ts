import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AiChatComponent } from './pages/ai-chat/ai-chat.component';
import { FoodDiaryComponent } from './pages/food-diary/food-diary.component';
import { RewardsStoreComponent } from './pages/rewards-store/rewards-store.component';
import { ReferralComponent } from './pages/referral/referral.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'ai-chat', component: AiChatComponent, canActivate: [authGuard] },
  { path: 'diary', component: FoodDiaryComponent, canActivate: [authGuard] },
  { path: 'rewards', component: RewardsStoreComponent, canActivate: [authGuard] },
  { path: 'referral', component: ReferralComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' },
];
