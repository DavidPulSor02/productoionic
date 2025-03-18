import { Component, Inject } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  productos = [
    { id: 1, nombre: 'Nike Air Force', precio: 1500.00, imagen: 'https://th.bing.com/th/id/R.493fce528011e4136d073c8b6c747b77?rik=SVwpizYVdg8g8g&pid=ImgRaw&r=0' },
    { id: 2, nombre: 'Nike Dunk Azules', precio: 2500.00, imagen: 'https://th.bing.com/th/id/OIP.B7zt_AXQp3k_LY5DCjZhhgHaHa?w=1280&h=1280&rs=1&pid=ImgDetMain' },
    { id: 3, nombre: 'Nike Jordan Retro', precio: 4200.00, imagen: 'https://th.bing.com/th/id/R.0ce67720648d8b46e2f1fdb2d874cc64?rik=RCAb42pBBhQnYg&riu=http%3a%2f%2fmedia.endclothing.com%2fmedia%2fcatalog%2fproduct%2f0%2f1%2f01-06-2015_nike_airjordan1retrohighogchicago_red_white_sh_1.jpg&ehk=W3XPV3BzGte%2fNQ5shcLi%2fKfMcIfeC46SXPg9iSB2x9o%3d&risl=&pid=ImgRaw&r=0' },
  ];

  constructor(@Inject(PaymentService) private paymentService: PaymentService) { }

  comprar(producto: any) {
    this.paymentService.updateCart({ name: producto.nombre, price: producto.precio, quantity: 1 });
    alert(`🛒 ${producto.nombre} agregado al carrito!`);
  }

  pagar() {
    let total = 0;
    this.paymentService.getCart().subscribe((cart: any[]) => {
      total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    if (total > 0) {
      this.paymentService.processPayment(total);
    } else {
      alert("🛑 El carrito está vacío.");
    }
  }
}
