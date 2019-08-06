
export default class TaskRef {
	public taskid:String;
	public name:String;	
	public assignee:String;	
	public categury:String;
	public claimtime:Date;	
	public createtime:Date;	
	public description:String;	
	public duodate:Date;	
	public priority:Number;	
	public processdefinitionid:String;
  
    constructor();
    constructor(
        taskid:String,
        name:String,	
        assignee:String,
        categury:String,
        claimtime:Date,
        createtime:Date,	
        description:String,	
        duodate:Date,	
        priority:Number,	
        processdefinitionid:String
      );
    constructor(
        taskid?:String,
        name?:String,	
        assignee?:String,
        categury?:String,
        claimtime?:Date,
        createtime?:Date,	
        description?:String,	
        duodate?:Date,	
        priority?:Number,	
        processdefinitionid?:String
      )
      {
        this.taskid=taskid;
        this.name=name;	
        this.assignee=assignee;	
        this.categury=categury;
        this.claimtime=claimtime;	
        this.createtime=createtime;	
        this.description=description;	
        this.duodate=duodate;	
        this.priority=priority;	
        this.processdefinitionid=processdefinitionid;
      }
  }