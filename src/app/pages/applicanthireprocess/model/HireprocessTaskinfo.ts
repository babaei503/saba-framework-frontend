export default class HireprocessTaskinfo {
    public name: string;
    public res: string;
    public assignee: string;
    public createtime: string;
    public claimtime: string;
    public endtime: string;
  
    constructor();
    constructor(
      name: string,
      res: string,
      assignee: string,
      createtime: string,
      claimtime: string,
      endtime: string);
    constructor(
      name?: string,
      res?: string,
      assignee?: string,
      createtime?: string,
      claimtime?: string,
      endtime?: string)
      {
        this.name=name;
        this.res=res;
        this.assignee=assignee;
        this.createtime=createtime;
        this.claimtime=claimtime;
        this.endtime=endtime;
      }
  }