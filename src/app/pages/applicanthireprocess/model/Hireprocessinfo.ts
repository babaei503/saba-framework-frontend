import Applicant from "./Applicant";
import HireprocessTaskinfo from "./HireprocessTaskinfo";

export default class Hireprocessinfo {
  public processid:Number;
  public applicant: Applicant;
  public telephoneinterview:HireprocessTaskinfo;
  public techinterview:HireprocessTaskinfo;
  public financialnegotiation:HireprocessTaskinfo;

  constructor();
  constructor(
    processid:Number,
    applicant: Applicant,
    telephoneinterview: HireprocessTaskinfo,
    techinterview: HireprocessTaskinfo,
    financialnegotiation: HireprocessTaskinfo);
  constructor(
    processid?:Number,
    applicant?: Applicant,
    telephoneinterview?: HireprocessTaskinfo,
    techinterview?: HireprocessTaskinfo,
    financialnegotiation?: HireprocessTaskinfo)
    {
      this.processid=processid;
      this.applicant=applicant;
      this.telephoneinterview=telephoneinterview;
      this.techinterview=techinterview;
      this.financialnegotiation=financialnegotiation;
    }
}