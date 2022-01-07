import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    pathMatch: 'full',
    loadChildren: () =>
      import('./customers/customers.module').then((cm) => cm.CustomersModule),
  },
  {
    path: 'orders',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./orders/orders.module').then((om) => om.OrdersModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
