import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageEncript {

  constructor() { }

  /**
   * Encripta un valor en formato string y lo guarda.
   * CASCARÓN - Próximamente se integrará librerías como crypto-js
   */
  public setItemEncrypted(key: string, value: string): void {
    // TODO: Implementar encriptación AES
    const encryptedValue = btoa(value); // base64 temporal
    localStorage.setItem(key, encryptedValue);
  }

  /**
   * Desencripta un valor y lo retorna en formato string.
   * CASCARÓN
   */
  public getItemDecrypted(key: string): string | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    try {
      // TODO: Implementar desencriptación AES
      return atob(item); // base64 temporal
    } catch (e) {
      console.error('Error al desencriptar el valor del storage', e);
      return null;
    }
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
