import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout.component";

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("../../features/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
];
