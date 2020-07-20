//  הוספת עובד
function addWorker(){
var id=document.getElementById("tz").value;
var firstName=document.getElementById("firstName").value;
var lastName=document.getElementById("lastName").value;
var phone=document.getElementById("phone").value;
var mail=document.getElementById("mail").value;
var address=document.getElementById("address").value;
var status=new Boolean(true);
$.post("http://localhost:3000/WorkerFunction/addWorker",
  {
    WorkerID:id,
    WorkerFName:firstName,
    WorkerLName:lastName,
    WorkerAddres:address,
    WorkerFhone:phone,
    WorkerMail:mail,
    isActive:status
  },
  function(data){
    alert(data);
    document.getElementById("tz").value="";
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("phone").value="";
    document.getElementById("mail").value="";
    document.getElementById("address").value="";
  });

}
//קבלת רשימת העובדים
function getWorkerByID(){
    var id=document.getElementById("Id").value;
  $.post("http://localhost:3000/WorkerFunction/getworkerByID",
  {
    WorkerID:id
  },
    function(data){
      if(data.isActive==true)
      {document.getElementById("results").innerHTML=" תעודת זהות: "+data.WorkerID+" שם פרטי: "+data.WorkerFName+" שם משפחה: "+data.WorkerLName+" כתובת: "+data.WorkerAddres+" פלאפון: "+data.WorkerFhone+" דואר אלקטרוני: "+data.WorkerMail;}
      else
      {document.getElementById("results").innerHTML="עובד לא קיים";}
    });
  
  }
  //מחיקת עובד לפי תז
  function deletWorkerByID()
  {
    var id=document.getElementById("Id").value;
    $.post("http://localhost:3000/WorkerFunction/deletWorkerByID",
    {
      WorkerID:id
    },
      function(data){
        document.getElementById("results").innerHTML=data;
      }); 
  }
  //קבלת רשימת שמות וטלפונים
  function getNamesAndFhone()
  {
    document.getElementById("results").innerHTML="";
    document.getElementById("close").style.visibility="visible";
    $.post("http://localhost:3000/WorkerFunction/getNamesAndFhone",
      function(data){
        data.forEach(element => {
        if(element.isActive==true)
        {document.getElementById("results").innerHTML+="<li>"+" שם פרטי: "+element.WorkerFName+" פלאפון: "+element.WorkerFhone+"</li>"; } 
        });
      });
  }
  //סגירת החלון
  function closeR()
  {
    document.getElementById("results").innerHTML=""; 
  }
  //הצגת נתונים לעדכון
  function ShowToUpdate()
  {
    var id=document.getElementById("Id").value;
    $.post("http://localhost:3000/WorkerFunction/getworkerByID",
    {
      WorkerID:id
    },
    function(data){
      document.getElementById("tz").value=data.WorkerID;
      document.getElementById("tz").disabled = true;
      document.getElementById("firstName").value=data.WorkerFName;
      document.getElementById("lastName").value=data.WorkerLName;
      document.getElementById("phone").value=data.WorkerFhone;
      document.getElementById("mail").value=data.WorkerMail;
      document.getElementById("address").value=data.WorkerAddres;
    });
  }
  //עדכון עובד
  function UpdateW()
  {
    var id=document.getElementById("tz").value;
    var firstName=document.getElementById("firstName").value;
    var lastName=document.getElementById("lastName").value;
    var phone=document.getElementById("phone").value;
    var mail=document.getElementById("mail").value;
    var address=document.getElementById("address").value;
    var status=new Boolean(true);
    $.post("http://localhost:3000/WorkerFunction/UpdateW",
    {
      WorkerID:id,
      WorkerFName:firstName,
      WorkerLName:lastName,
      WorkerAddres:address,
      WorkerFhone:phone,
      WorkerMail:mail,
      isActive:status
    },
    function(data){
      alert(data);
      document.getElementById("tz").value="";
      document.getElementById("tz").disabled="";
      document.getElementById("firstName").value="";
      document.getElementById("lastName").value="";
      document.getElementById("phone").value="";
      document.getElementById("mail").value="";
      document.getElementById("address").value="";
    });
  }
  //הוספת שעת נוכחות
    function addP()
    {
      var id=document.getElementById("IdP").value;
      var date=document.getElementById("date").value;
      var start=document.getElementById("start").value;
      var end=document.getElementById("end").value;
      $.post("http://localhost:3000/WorkerFunction/addp",
      {
        WorkerIdP:id,
        date:date,
        start:start,
        end:end
      },
      function(data){
        alert(data);
      });
    }
    //קבלת שעות נוכחות ע"פ תז
  function  getPBiId()
  {
    document.getElementById("result").innerHTML="";
    var id=document.getElementById("tz4").value;
    document.getElementById("result").style.height=300;
    $.post("http://localhost:3000/WorkerFunction/getPBiId",
    {
      WorkerIdP:id
    },
    function(data){
      document.getElementById("result").innerHTML=data;
    });
  }