export interface IUser{
    id:number,
    fname:string;
    lname:string;
}

export interface IMessage{
    inuserid:number;
    touserid:number;
    message:string;
    date:Date;
    id:number;
}