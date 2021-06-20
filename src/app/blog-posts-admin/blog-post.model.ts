/*export interface BlogPost{
    id:string;
    heading:string;
    description:string;
    imageUrl:string;
    adminId:string
}*/
export class BlogPost {
    constructor(public id:string, public heading:string,public description:string,public imageUrl:string,public adminId:string) {

    }

}
