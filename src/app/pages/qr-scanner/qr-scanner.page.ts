import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: false,
})
export class QrScannerPage {
  scannedCode: string | null = null;

  async scanQR() {
    try {
      const result = await BarcodeScanner.scan();
      if (result.barcodes.length > 0) {
        this.scannedCode = result.barcodes[0].rawValue || 'Código no reconocido';
      } else {
        this.scannedCode = 'No se detectó ningún código';
      }
    } catch (error) {
      console.error('Error escaneando:', error);
      this.scannedCode = 'Error al escanear';
    }
  }
}
