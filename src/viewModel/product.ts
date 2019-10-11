export class Product {
    
    constructor(
        public ID?: number,
        public Name?: string,
        public Price?: number,
        public Quantity?: number,
        public CategoryName?:string,
        public CategoryID?:number,
        public img?: string
        ) {}

}
