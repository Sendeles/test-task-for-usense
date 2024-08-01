import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthorizedPageComponent} from "./authorized-page.component";

const routes: Routes = [
  {
    path: '', component: AuthorizedPageComponent, pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthorizedPageRoutingModule {

}
