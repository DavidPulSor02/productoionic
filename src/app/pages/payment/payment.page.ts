import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage implements OnInit {
  cart: any[] = [];
  totalAmount: number = 0;
  paymentSuccess: boolean = false;

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit() {
    this.paymentService.getCart().subscribe(cart => {
      this.cart = cart;
      this.totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    // Verificar si el pago fue exitoso al regresar de PayPal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment') && urlParams.get('payment') === 'success') {
      this.paymentSuccess = true;
      this.paymentService.updateCart({ name: '', price: 0, quantity: 0 }); // Opcional: limpiar el carrito tras el pago
    }
  }

  pay() {
    if (this.totalAmount > 0) {
      // URL de sandbox de PayPal
      const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tu-correo@paypal.com&amount=${this.totalAmount}&currency_code=USD&return=http://localhost:8100/home?payment=success&cancel_return=http://localhost:8100/payment`;

      window.location.href = paypalUrl;
    } else {
      console.log("⚠️ No hay productos en el carrito.");
    }
  }
  ngAfterViewInit() {
    this.loadPayPal();
  }

  loadPayPal() {
    if ((window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: this.totalAmount.toString() }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert(`Pago exitoso por ${details.payer.name.given_name}`);
          });
        }
      }).render('#paypal-button-container');
    }
  }
}