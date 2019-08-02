export default class Job {
  public _id:BigInteger;
  public job_code: String;
  public job_title: string;
  public job_company: string;
  public job_location: string;
  public job_employment: string;
  public job_jobfunction: string;
  public job_industry: string;
  public job_description: string;
  public job_open: boolean;
  
  constructor();
  constructor(
    _id:BigInteger,
    job_code: String,
    job_title: string,
  );
  constructor(
    _id:BigInteger,
    job_code: String,
    job_title: string,
    job_company: string,
    job_location: string,
    job_employment: string,
    job_jobfunction: string,
    job_industry: string,
    job_description: string,
    job_open: boolean);
  constructor(
    _id?:BigInteger,
    job_code?: String,
    job_title?: string,
    job_company?: string,
    job_location?: string,
    job_employment?: string,
    job_jobfunction?: string,
    job_industry?: string,
    job_description?: string,
    job_open?: boolean)
    {
      this._id=_id;
      this.job_code=job_code;
      this.job_title=job_title;
      this.job_company=job_company;
      this.job_location=job_location;
      this.job_employment=job_employment;
      this.job_jobfunction=job_jobfunction;
      this.job_industry=job_industry;
      this.job_description=job_description;
      this.job_open=job_open;
    }
}