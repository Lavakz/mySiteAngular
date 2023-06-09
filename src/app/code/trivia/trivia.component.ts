import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@ts-ignore
import * as trivia from './trivia.js';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.sass'],
})
export class TriviaComponent {
  // constructor() {
  //   const mysql = require('mysql');
  //   const connection = mysql.createConnection({
  //     host: 'zachlavake.com',
  //     user: 'admin',
  //     password: ';~!0b#QTeblO',
  //     database: 'trivia',
  //   });

  //   connection.connect();
  //   connection.query(
  //     'SELECT *',
  //     (err: any, rows: { solution: any }[], fields: any) => {
  //       if (err) throw err;
  //       console.log('Result: ', rows[0]);// .correct
  //     }
  //   );

  //   connection.end()
  // }
  ngOnInit() {
    trivia.getCategories();
  }
  startTrivia() {
    trivia.start();
  }
  nextTrivia() {
    trivia.next();
  }
}
