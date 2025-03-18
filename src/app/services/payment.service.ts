import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  private paymentStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  updateCart(item: CartItem) {
    const currentCart = [...this.cart.getValue()]; // Copia del array para evitar mutaciones directas
    const index = currentCart.findIndex(prod => prod.name === item.name);

    if (index > -1) {
      currentCart[index] = { ...currentCart[index], quantity: currentCart[index].quantity + item.quantity };
    } else {
      currentCart.push(item);
    }

    this.cart.next(currentCart);
  }

  getCart() {
    return this.cart.asObservable();
  }

  processPayment(amount: number) {
    if (amount <= 0) {
      console.log("❌ Monto inválido para el pago.");
      return;
    }

    console.log(`💰 Procesando pago de $${amount} en sandbox...`);
    setTimeout(() => {
      console.log("✅ Pago exitoso.");
      this.paymentStatus.next(true);
      this.cart.next([]); // Vaciar carrito después del pago
    }, 2000);
  }

  getPaymentStatus() {
    return this.paymentStatus.asObservable();
  }
}
