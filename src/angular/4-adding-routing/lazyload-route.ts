const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'team',  redirectTo: '/about', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => {
      return import('./products/products.module').then(m => m.ProductsModule);
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule { }