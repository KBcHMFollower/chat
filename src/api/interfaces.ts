export interface IUser{
    id:number,
    login:string,
    pass:string,
    about:{
        fname:string;
        lname:string;}
}

export interface IMessage{
    inuserid:number;
    touserid:number;
    message:string;
    date:Date;
    id:number;
}