class Worker {
    constructor(WorkerID, WorkerFName, WorkerLName, WorkerAddres,WorkerFhone,WorkerMail,isActive) {
        this.WorkerID=WorkerID;
        this.WorkerFName=WorkerFName;
        this.WorkerLName=WorkerLName;
        this.WorkerAddres=WorkerAddres;
        this.WorkerFhone=WorkerFhone;
        this.WorkerMail=WorkerMail;
        this.isActive=isActive;
    }
  }
  module.exports = Worker;