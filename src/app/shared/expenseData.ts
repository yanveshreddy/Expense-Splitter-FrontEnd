export interface expenseData{
    groupId: any;
    expenseTitle:string;
    expenseDescription:string;
    expenseAmount:number;
    createdBy: any;
    paidBy:Array<object>;
    usersInvolved:Array<object>;
 }