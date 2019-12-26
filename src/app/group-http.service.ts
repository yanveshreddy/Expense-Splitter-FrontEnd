import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class GroupHttpService {

//public baseurl = 'http://api.artestapps.com/api/v1/users';

public baseurl ='http://localhost:3000/api/v1/groups';
public authToken = Cookie.get('authToken');

  constructor(public http: HttpClient) { }

  public getSingleGroupDetails(groupId):Observable<any>{

    return this.http.get(`${this.baseurl}/getSingleGroupDetails?groupId=${groupId}&authToken=${this.authToken}`);
  }

  public getAllUsersForAGroup(groupId): Observable<any> {
    //let groupId=JSON.stringify(groupId1)
    return this.http.get(`${this.baseurl}/getAllUsersForAGroup?groupId=${groupId}&authToken=${this.authToken}`);
  }

  
  public createGroup(data): Observable<any> {

    let usersArray=JSON.stringify(data.users)


    const params = new HttpParams()
    .set('groupName', data.groupName)
    .set('groupDescription', data.groupDescription)
    .set('createdBy', data.createdBy)
    .set('users', usersArray);
  
    return this.http.post(`${this.baseurl}/createGroup?authToken=${this.authToken}`, params);
  }
  
  /********************************/
  
  public getAllGroupsForaUser(userId1): Observable<any> {
    
    let userId=JSON.stringify(userId1)
  return this.http.get(`${this.baseurl}/getAllGroupsForaUser?userId=${userId}&authToken=${this.authToken}`);
  }

}
