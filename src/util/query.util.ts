
const QUERY = "q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22<>%22%29&env=store://datatables.org/alltableswithkeys&format=json";
const SEARCH_QUERY = "query=<>&region=1&lang=en";
export class QueryBuilder {

    constructor(private symbols: string []){};

    build() : string {
        let result = this.symbols.join('","');
        let q = QUERY.replace("<>", result);
        console.warn(q);
        return q;
    }

    buildSearchQuery() : string {
        let result = this.symbols[0];
        let q = SEARCH_QUERY.replace("<>", result);
        console.warn(q);
        return q;
    }

}
