import Applicant from "./Applicant";

export default class Hireprocessinfo {
  public processid:Number;
  public applicant: Applicant;
  public phoneInterview: string;
  public tech: string;
  public finance: string;

  constructor();
  constructor(
    processid:Number,
    applicant: Applicant,
    phoneInterview: string,
    tech: string,
    finance: string);
  constructor(
    processid?:Number,
    applicant?: Applicant,
    phoneInterview?: string,
    tech?: string,
    finance?: string)
    {
      this.processid=processid;
      this.applicant=applicant;
      this.phoneInterview=phoneInterview;
      this.tech=tech;
      this.finance=finance;
    }
}