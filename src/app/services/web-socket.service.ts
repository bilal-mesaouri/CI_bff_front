import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private fileChangeSubject = new Subject<string>();
  constructor(private ngZone: NgZone) {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:3004'); // URL de votre backend WebSocket
    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        const messageData = JSON.parse(event.data); // Parser le message reçu
        this.fileChangeSubject.next(messageData.data); // Émettre les données mises à jour
      });
    };

    this.socket.onclose = () => {
      console.log('WebSocket déconnecté. Tentative de reconnexion...');
      setTimeout(() => this.connect(), 3000);
    };

    // Gérer les erreurs de connexion
    this.socket.onerror = (error) => {
      console.error('WebSocket erreur:', error);
    };
  }

  getFileChanges(): Observable<string> {
    console.log('getFileChanges');
    return this.fileChangeSubject.asObservable();
  }

}
