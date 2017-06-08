import {Component, ElementRef} from "@angular/core";
import {StockFetcherService} from "./stock.fetcher.service";

@Component({
    moduleId: module.id,
    selector: 'search-comp',
    templateUrl: `search.stock.component.html`
})
export class SearchStockComponent {

    public query = '';
    public filteredList : any = [];
    public elementRef : any;

    constructor(myElement: ElementRef, private stockFetcherService: StockFetcherService) {
        this.elementRef = myElement;
    }

     getName(element : any, index : any, array : any) {
         console.log("=======>", element.name);
       return (element.name);
}

    filter() {
        if (this.query !== ""){
            this.stockFetcherService.fetch(this.query).toPromise().then((data : any) =>{
                data = JSON.parse(data).filter(this.getName);
                this.filteredList = data.filter(function(el : any){
                    console.log("****",el);
                    return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }.bind(this));
            });
        }else{
            this.filteredList = [];
        }
    }

    select(item : any){
        this.query = item.name;
        console.log("&&&&", item.symbol);
        this.stockFetcherService.push(item.symbol).toPromise();
        this.filteredList = [];
    }


}

