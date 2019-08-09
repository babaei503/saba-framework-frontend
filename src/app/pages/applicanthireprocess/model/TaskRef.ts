
export default class TaskRef {
	public taskid:String;
	public name:String;	
	public assignee:String;	
	public category:String;
	public claimtime:Date;	
	public createtime:Date;	
	public description:String;	
	public duedate:Date;	
	public priority:Number;	
  public processdefinitionid:String;
  
    constructor();
    constructor(
        taskid:String,
        name:String,	
        assignee:String,
        category:String,
        claimtime:Date,
        createtime:Date,	
        description:String,	
        duedate:Date,	
        priority:Number,	
        processdefinitionid:String
      );
    constructor(
        taskid?:String,
        name?:String,	
        assignee?:String,
        category?:String,
        claimtime?:Date,
        createtime?:Date,	
        description?:String,	
        duedate?:Date,	
        priority?:Number,	
        processdefinitionid?:String
      )
      {
        this.taskid=taskid;
        this.name=name;	
        this.assignee=assignee;	
        this.category=category;
        this.claimtime=claimtime;	
        this.createtime=createtime;	
        this.description=description;	
        this.duedate=duedate;	
        this.priority=priority;	
        this.processdefinitionid=processdefinitionid;
      }
  }