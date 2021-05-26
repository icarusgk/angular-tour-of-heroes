import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // An array of messages
  messages: string[] = [];

  // Method for adding a message to the messages[] array
  add(message: string) {
    this.messages.push(message);
  }

  // Method for emptying the messages[] array
  clear() {
    this.messages = [];
  }

  constructor() { }
}
