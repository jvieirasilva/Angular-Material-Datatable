import { User } from './user';
import { UserService } from './user.service';
import {Component,ViewChild, ElementRef,OnInit} from '@angular/core';
import * as xlsx from 'xlsx';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$: User[];
  userColumns: string[] = ["name","email","phone","company","actionsColumn"];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  refresh() {
     //this.toDate('02/16/2020');
    // this.calcDate('02/16/2020','03/26/2020')

    //alert(this.dateDiff('02/16/2020','03/16/2020'));
   // var res =  this.dateDiff('02/16/2020','03/16/2020');

    
    if(Number(this.dateDiff('02/16/2020','03/17/2020'))>1.0){
      Swal.fire({
        text: 'Só é permitido consultar 1 Mês !',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
    }
      
   
     //this.noofmonths();
  
    this.userService.getUsers().subscribe((data: User[]) => {   this.dataSource.data = data;
    });
  }

   toDate(dateStr) {
    var parts = dateStr.split("/");
    alert(parts[1]+'/'+parts[0] +'/'+ parts[2])
     alert( new Date(parts[2], parts[1] - 1, parts[0]));
   }

    dateDiff(startingDate, endingDate) {
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
        endingDate = new Date().toISOString().substr(0, 10);    // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }
    alert('oi'+ Number(monthDiff +'.'+dayDiff));
    return  Number(monthDiff +'.'+dayDiff);
}

    

 

  
}
