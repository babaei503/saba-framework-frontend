import Job from "./Job";

export default class Applicant {
  public _id:BigInteger;
  public applicant_name: String;
  public applicant_email: string;
  public applicant_phonenumber: string;
  public applicant_job: Job;

  constructor();
  constructor(
    _id:BigInteger,
    applicant_name: String,
    applicant_email: string,
    applicant_phonenumber: string,
    applicant_job: Job);
  constructor(
    _id?:BigInteger,
    applicant_name?: String,
    applicant_email?: string,
    applicant_phonenumber?: string,
    applicant_job?: Job)
    {
      this._id=_id;
      this.applicant_name=applicant_name;
      this.applicant_email=applicant_email;
      this.applicant_phonenumber=applicant_phonenumber;
      this.applicant_job=applicant_job;
    }
}