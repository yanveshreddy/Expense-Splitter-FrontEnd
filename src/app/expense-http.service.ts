import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHttpService {

  //public baseurl = 'http://api.artestapps.com/api/v1/users';

  public baseurl ='http://localhost:3000/api/v1/expenses';
  public authToken = Cookie.get('authToken');


  constructor(public http: HttpClient) { }

  /**
   * name
   */
  public getOutstandingBalances(user_Id1) {
    let user_Id=JSON.stringify(user_Id1)
    return this.http.get(`${this.baseurl}/getOutstandingBalances?user_Id=${user_Id}&authToken=${this.authToken}`)
    
  }
  public getAllExpensesInGroup(groupId): Observable<any> {
    return this.http.get(`${this.baseurl}/view/all?groupId=${groupId}&authToken=${this.authToken}`);
  }
  public createExpense(data): Observable<any> {

    let paidByArray=JSON.stringify(data.paidBy);
    let usersInvolvedArray=JSON.stringify(data.usersInvolved);
  
    const params = new HttpParams()
    .set('groupId', data.groupId)
    .set('expenseTitle', data.expenseTitle )
    .set('expenseDescription', data.expenseDescription)
    .set('expenseAmount', data.expenseAmount)
    .set('createdBy', data.createdBy)
    .set('paidBy', paidByArray)
    .set('usersInvolved', usersInvolvedArray);
    
    console.log(params);
    // console.log('data.users ' + data.users);
    return this.http.post(`${this.baseurl}/createExpense?authToken=${this.authToken}`, params);
  }

  public getAllUsersForExpense(expenseId): Observable<any> {

  
    return this.http.get(`${this.baseurl}/getAllUsersForExpense?expenseId=${expenseId}&authToken=${this.authToken}`);
  }

}
