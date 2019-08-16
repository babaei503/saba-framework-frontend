import Applicant from "./Applicant";

export default class Hireprocessinfo {
  public processid:Number;
  public applicant: Applicant;
  public telephoneInterviewOutcome: string;
  public techOk: string;
  public financeOk: string;

  constructor();
  constructor(
    processid:Number,
    applicant: Applicant,
    telephoneInterviewOutcome: string,
    techOk: string,
    financeOk: string);
  constructor(
    processid?:Number,
    applicant?: Applicant,
    telephoneInterviewOutcome?: string,
    techOk?: string,
    financeOk?: string)
    {
      this.processid=processid;
      this.applicant=applicant;
      this.telephoneInterviewOutcome=telephoneInterviewOutcome;
      this.techOk=techOk;
      this.financeOk=financeOk;
    }
}