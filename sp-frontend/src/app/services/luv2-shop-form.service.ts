import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,map } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor(private httpClient:HttpClient) { }

  getCreditCardMonths(startMonth:number):Observable<number[]>{
    let data:number[]=[];
    for(let theMonth=startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[]=[];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let theYear=startYear; theYear<=endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }

  listCountries():Observable<Country[]>{
    const searchUrl=`http://localhost:8080/api/countries`;
    return this.httpClient
                .get<GetResponseCountries>(searchUrl)
                .pipe(map(response=>response._embedded.countries));
    
  }

  listStatesByCountryCode(theCountryCode:string):Observable<State[]>{
    const searchUrl=`http://localhost:8080/api/states/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient
                .get<GetResponseStates>(searchUrl)
                .pipe(map(response=>response._embedded.states));
    
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[]
  }
}


interface GetResponseStates{
  _embedded:{
    states: State[]
  }
}