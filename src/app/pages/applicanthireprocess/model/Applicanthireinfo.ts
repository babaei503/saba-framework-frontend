import Applicant from "./Applicant";

export default class Applicanthireinfo {
  public _id:Number;
  public applicant:Applicant;
	public telintviwres:boolean;
	public telintviwdesc:String;
	public techintviwres:boolean;
	public techintviwdesc:String;
	public finnegotres:boolean;
	public finnegotdesc:String;


  constructor();
  constructor(
    _id:Number,
    applicant:Applicant,
    telintviwres:boolean,
    telintviwdesc:String,
    techintviwres:boolean,
    techintviwdesc:String,
    finnegotres:boolean,
    finnegotdesc:String,
  );
  constructor(
    _id?:Number,
    applicant?:Applicant,
    telintviwres?:boolean,
    telintviwdesc?:String,
    techintviwres?:boolean,
    techintviwdesc?:String,
    finnegotres?:boolean,
    finnegotdesc?:String,
  ){
    this._id= _id;
    this.applicant=applicant;
    this.telintviwres=telintviwres;
    this.telintviwdesc=telintviwdesc;
    this.techintviwres=techintviwres;
    this.techintviwdesc=techintviwdesc;
    this.finnegotres=finnegotres;
    this.finnegotdesc=finnegotdesc;
  }

}    