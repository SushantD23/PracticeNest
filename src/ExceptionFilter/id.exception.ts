export class IdException extends Error{
    constructor(message?:string){
     super(message || "Inavlid Id");       
    }
}