const express=require('express')
const app=express()
const path=require('path')
const bcrypt=require('bcrypt')
var mysql=require('mysql')

const nodemailer= require('nodemailer')
const transporter=nodemailer.createTransport({
  service:"hotmail",
  auth:{
    user:"outpass_request@outlook.com",
    pass:"outpassrequest@321"
  }
})



app.set('view engine','ejs')

app.use(express.static('./methods-public'))

app.use(express.urlencoded({extended:false}))//to be able to read data from the url or form which we send

app.use( '/styles',express.static(path.join(__dirname,'styles')));//__dirname is the absolute path upto your formdata.js then styles in path.join is adding the folder from that directory..the /styles is the link u will use to reference the files from the folder


app.get('/start',(req,res)=>{
  
  return res.render('login_final',{invalid:""});//setting initial invalid as none when page loads
  
  
})

app.get('/changepassword',(req,res)=>{
  return res.render('change_password_final')
})




app.post('/login',(req,res)=>{
 var {username,password}=req.body
 global.username=username//making username global throughout program
 

 var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"avisql@123",
  database:"nodejs",
  multipleStatements:"true"
})
 
 if (username && password){
  console.log(password)
  con.connect(function(err){
  if(password!='password')
  {
    
    console.log("entered")

   if (err) throw err;
   con.query(`SELECT *FROM students`,(error,result,fields)=>{
    if (error) return reject(error);

    
    const val=result;
    global.flag1=0
    
    val.forEach(myFunction)
    function myFunction(value){
      
      bcrypt.compare(password,value.password,(err,result)=>{
        if (result && value.rollno === global.username)
        {
          return res.render('home_final',{name:value.fullname,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number});
        }
        else
        {
          flag1=flag1+1
        }

        if (flag1==2)
        {
          var con1=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"avisql@123",
            database:"nodejs",
            multipleStatements:"true"

          })
          con1.connect(function(err){
          if (err) throw err
          con1.query(`SELECT*FROM faculty;SELECT*from stuoutpass where faculty1='PENDING';SELECT*from stuoutpass where faculty2='PENDING';SELECT*from complaints where faculty_advisor='${global.username}' and roomnumber<>'None';SELECT*from complaints where roomnumber<>'None'`,(error,result,fields)=>{
          global.flag=0
          const val3=result[1];
          global.count=0
          val3.forEach(myFunction3)
          function myFunction3(value3)
          {
              global.count=global.count+1
          }
    
          const val4=result[2];
          global.count2=0
          val4.forEach(myFunction4)
          function myFunction4(value4)
          {
              global.count2=global.count2+1
          }
    
          const val5=result[3];
          global.count3=0
          val5.forEach(myFunction5)
          function myFunction5(value5)
          {
              global.count3=global.count3+1
          }
    
          const val6=result[4];
          global.count4=0
          val6.forEach(myFunction6)
          function myFunction6(value6)
          {
              global.count4=global.count4+1
          }
          
          const val1=result[0];
          val1.forEach(myFunction1)
          function myFunction1(value){
           bcrypt.compare(password,value.password,(err,result)=>{
             if (result && value.name === global.username)
             {
               if (value.name ==='faculty2')
               {
               return res.render('home_faculty2_final',{complaintnum:global.count4,outpassnum:global.count2,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
     
               }
               else if(value.name==='security')
               {
                return res.render('home_security_final',{fname:value.name,ftitle:value.title,fnum:value.phonenumber})
               }
               else
               {
               return res.render('home_faculty_final',{complaintnum:global.count3,outpassnum:global.count,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
     
               }
             }
             else{
               flag=flag+1
             }
             console.log(flag)
             if (flag===3)
             {
             return res.render('login_final',{invalid:"INVALID USERNAME OR PASSWORD"})
             }
          
             
             
           })
          
          
          }
        })
        con1.end()

        })
        }


        
      })
      
     
     }
    
     
     
    
    })
      
      
    
      
    }
     
  
    });
  }

  if (password==='password'){
    console.log("entered2")
    
    con.query(`SELECT *FROM students`,(error,result,fields)=>{
    if (error) return reject(error);

    
    const val=result;
    let flag=0
    val.forEach(myFunction)
    function myFunction(value){
      
      if (value.rollno === global.username && value.password === password){
        
        
        return res.render('home_final',{name:value.fullname,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number});
        
        
        }
      else{
      
        flag=flag+1
        
      }
     
     }
    
    if (flag === 2){
    var con1=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"avisql@123",
        database:"nodejs",
        multipleStatements:"true"
      })
      con1.connect(function(err){
        if (err) throw err;
        con1.query(`SELECT *FROM faculty;SELECT*from stuoutpass where faculty1='PENDING';SELECT*from stuoutpass where faculty2='PENDING';SELECT*from complaints where faculty_advisor='${global.username}' and roomnumber<>'None';SELECT*from complaints where roomnumber<>'None'`,(error,result,fields)=>{
          
          const val3=result[1];
          global.count=0
          val3.forEach(myFunction3)
          function myFunction3(value3)
          {
              global.count=global.count+1
          }
    
          const val4=result[2];
          global.count2=0
          val4.forEach(myFunction4)
          function myFunction4(value4)
          {
              global.count2=global.count2+1
          }
    
          const val5=result[3];
          global.count3=0
          val5.forEach(myFunction5)
          function myFunction5(value5)
          {
              global.count3=global.count3+1
          }
    
          const val6=result[4];
          global.count4=0
          val6.forEach(myFunction6)
          function myFunction6(value6)
          {
              global.count4=global.count4+1
          }
          const val1=result[0];
          let flag1=0
          val1.forEach(myFunction1)
          function myFunction1(value){
            if (result && value.name === global.username)
             {
               if (value.name ==='faculty2')
               {
               return res.render('home_faculty2_final',{complaintnum:global.count4,outpassnum:global.count2,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
     
               }
               else if(value.name==='security')
               {
                return res.render('home_security_final',{fname:value.name,ftitle:value.title,fnum:value.phonenumber})
               }
               else
               {
               return res.render('home_faculty_final',{complaintnum:global.count3,outpassnum:global.count,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
     
               }
              
              
             
            }
            else{
              
              flag1=flag1+1
            }

          }
          
          if (flag1===4){
          
            return res.render('login_final',{invalid:"INVALID USERNAME OR PASSWORD"})
            
            
          }
        })
        con1.end()
        
        
      })
      
      
      
      
    }
     
    })
    con.end()
  }
  


 app.post('/changepassword_submit',(req,res)=>{
  const {nameofuser,newpassword,confirmpassword}=req.body
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })

  if (newpassword===confirmpassword)
  {
     con2.connect(async function(err){
            if (err) throw err;
            const salt=await bcrypt.genSalt(10);
            
            const hashpassword= await bcrypt.hash(newpassword,salt)
            console.log(hashpassword)
            con2.query(`UPDATE students SET password='${hashpassword}' WHERE rollno='${global.username}'`,(error,result,fields)=>{
              
              return res.render('login_final',{invalid:""})
              
              
              
            })
          })
  }

 })

 app.get('/complaintscategory',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT*FROM students where rollno='${global.username}'`,(error,result,fields)=>{
      const val=result
      val.forEach(myFunction)
      function myFunction(value)
      {
        con2.end()
        return res.render('complaints_categoryselect_final',{pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number})
      }
      
    })
  })
 })

 app.post('/complaints',(req,res)=>{
  const {category}=req.body

  var con6=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })

  con6.connect(function(err){
    if (err) throw err;
    con6.query(`SELECT*FROM complaints where rollnumber='${global.username}';SELECT*FROM students where rollno='${global.username}'`,(error,result,fields)=>{
      console.log(global.username)
      const val2=result[1]
      const val=result[0]
      val.forEach(myFunction)
      function myFunction(value)
      {
      if(value.category_hostel===category)
      {
       
        val2.forEach(myFunction2)
        function myFunction2(value2)
        {
          return res.render('complaints_submit_final',{category:category,pname:value2.fullname,prollno:value2.rollno,ppenum:value2.personal_number,ppanum:value2.parent_number,rollnumber:value.rollnumber,roomnumber:value.roomnumber,complaint:value.complaint_hostel})
        }
         
        
          
          
      }
      else if(value.category_mess===category)
      {
        
        val2.forEach(myFunction2)
        function myFunction2(value2)
        {
          return res.render('complaints_submit_final',{category:category,pname:value2.fullname,prollno:value2.rollno,ppenum:value2.personal_number,ppanum:value2.parent_number,rollnumber:value.rollnumber,roomnumber:value.roomnumber,complaint:value.complaint_mess})
        }
        
          
          
      }
      else if(value.category_academic===category)
      {
        
        val2.forEach(myFunction2)
        function myFunction2(value2)
        {
          return res.render('complaints_submit_final',{category:category,pname:value2.fullname,prollno:value2.rollno,ppenum:value2.personal_number,ppanum:value2.parent_number,rollnumber:value.rollnumber,roomnumber:value.roomnumber,complaint:value.complaint_academic})
        }
        
          
          
      }
      else
      {
        
        val2.forEach(myFunction2)
        function myFunction2(value2)
        {
          return res.render('complaints_final',{category:category,pname:value2.fullname,prollno:value2.rollno,ppenum:value2.personal_number,ppanum:value2.parent_number})
        }
        
        
      }
    }
  
  

      
      
    })
    con6.end()
    
  })
 
 
  
})

 app.post('/complaint_submit',(req,res)=>{
  const {category,rollnumber,roomnumber,complaint}=req.body
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })

  con2.connect(function(err){
    if (err) throw err;
    console.log(category,roomnumber,complaint)
    if (category==='Mess')
    {
      console.log('1')
    con2.query(`UPDATE complaints SET category_mess='${category}',roomnumber='${roomnumber}',complaint_mess='${complaint}' where rollnumber='${global.username}';SELECT*FROM students where rollno='${global.username}';INSERT INTO complaints_history values('${global.username}','${roomnumber}','${complaint}','${category}') `,(error,result,fields)=>{
      const val=result
      val.forEach(myFunction)
      function myFunction(value)
      {
        
        return res.render('complaints_submit_final',{category:category,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number,rollnumber:rollnumber,roomnumber:roomnumber,complaint:complaint})
      }
      
    })
    
  }
    else if (category==='Hostel')
    {
      console.log(2)
      con2.query(`UPDATE complaints SET category_hostel='${category}',roomnumber='${roomnumber}',complaint_hostel='${complaint}' where rollnumber='${global.username}';SELECT*FROM students where rollno='${global.username}';INSERT INTO complaints_history values('${global.username}','${roomnumber}','${complaint}','${category}')`,(error,result,fields)=>{
        const val=result
        val.forEach(myFunction)
        function myFunction(value)
        {
          
          return res.render('complaints_submit_final',{category:category,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number,rollnumber:rollnumber,roomnumber:roomnumber,complaint:complaint})
        }
        
      })
      
    }
    else if (category==='Academic')
    {
      console.log('3')
      con2.query(`UPDATE complaints SET category_academic='${category}',roomnumber='${roomnumber}',complaint_academic='${complaint}' where rollnumber='${global.username}';SELECT*FROM students where rollno='${global.username}';INSERT INTO complaints_history values('${global.username}','${roomnumber}','${complaint}','${category}')`,(error,result,fields)=>{
        const val=result
        val.forEach(myFunction)
        function myFunction(value)
        {
          
          return res.render('complaints_submit_final',{category:category,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number,rollnumber:rollnumber,roomnumber:roomnumber,complaint:complaint})
        }
        
      })
    
    }
    
    else{
      console.log('4')
    }
    con2.end()
  })

 })

 
  
  


  app.post('/outpasssubmit',(req,res)=>{
    console.log("entered")
    const {year,branch,departure,departuretime,arrival,arrivaltime,reason,rollnumber}=req.body
    console.log(departuretime)
    global.fadvisor=0;
    var con2=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"avisql@123",
        database:"nodejs",
        multipleStatements:"true"
      })

    con2.connect(function(err){
        if (err) throw err;
        con2.query(`SELECT *FROM students where rollno='${global.username}'`,(error,result,fields)=>{
          const val2=result
          val2.forEach(myFunction2)
          function myFunction2(value)
          {
            console.log("facultyadvisor")
            global.fadvisor=value.faculty_advisor
          }

          var con3=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"avisql@123",
            database:"nodejs",
            multipleStatements:"true"
          })

          con3.connect(function(err){
            if (err) throw err;
      
            
        
            con3.query(`INSERT INTO stuoutpass VALUES('${year}','${branch}','${departure}','${arrival}','${reason}','${global.username}','PENDING','PENDING','REQUESTED','${departuretime}','${arrivaltime}','${global.fadvisor}');INSERT INTO stuoutpasshistory VALUES('${year}','${branch}','${departure}','${arrival}','${reason}','${global.username}','PENDING','PENDING','REQUESTED','${departuretime}','${arrivaltime}','${global.fadvisor}');SELECT*FROM students where rollno='${global.username}'`,(error,result,fields)=>{
              const val3=result[2]
              val3.forEach(myFunction3)
              function myFunction3(value3)
              {
                con3.end()
                console.log("mail")
                const options={
                  from:"outpass_request@outlook.com",
                  to:`${value3.faculty_advisor}outpass@gmail.com`,
                  subject:"outpass request pending",
                  text:"Outpass requests pending , please login and check"
                }
                transporter.sendMail(options,function(err,info){
                  if (err){
                    console.log(err)
                    return
                    }
                    console.log("sent:",info.response)
                  })
      
                return res.render('outpass_submit_final',{name:value3.fullname,pname:value3.fullname,prollno:value3.rollno,ppenum:value3.personal_number,ppanum:value3.parent_number, studeparturetime:departuretime,stuarrivaltime:arrivaltime,stuyear:year,stubranch:branch,studeparture:departure,stuarrival:arrival,stureason:reason,faculty1res:'PENDING',faculty2res:'PENDING',facultyadvisorname:fadvisor});
      
              }
              
              
              
            })
          })
          con2.end()
        })
      })

    

  })


  app.get('/outpass_submit',(req,res)=>{
    var con1=mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"avisql@123",
      database:"nodejs",
      multipleStatements:"true"
    })
    global.pruser=0
    global.ppenum=0
    global.ppanum=0
    global.rollnum=0
    con1.connect(function(err){
      if (err) throw err;
      con1.query(`SELECT year,branch,departure,departuretime,arrival,arrivaltime,reason,faculty1_name FROM stuoutpass where user ='${global.username}';SELECT*FROM students where rollno='${global.username}'`,(error,result,fields)=>{
        const val3=result[1];
        val3.forEach(myFunction3)
        function myFunction3(value3)
        {
          global.pruser=value3.fullname;//present user
          global.ppenum=value3.personal_number;
          global.ppanum=value3.parent_number;
          global.rollnum=value3.rollno;
        
        }
        
        const val2=result[0];
        
        val2.forEach(myFunction)
        function myFunction(value){
          
          return res.render('outpass_submit_final',{pname:global.pruser,prollno:global.rollnum,ppenum:global.ppenum,ppanum:global.ppanum,studeparturetime:value.departuretime,stuarrivaltime:value.arrivaltime,stuyear:value.year,stubranch:value.branch,studeparture:value.departure,stuarrival:value.arrival,stureason:value.reason,faculty1res:"PENDING",faculty2res:"PENDING",facultyadvisorname:value.faculty1_name});
        }
        con1.end()
       
        
      })
    })

    
  })
  
  
  app.get('/home',(req,res)=>{
    var con1=mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"avisql@123",
      database:"nodejs"
    })
    
    con1.connect(function(err){
      if (err) throw err;
      con1.query(`SELECT * FROM students where rollno ='${global.username}'`,(error,result,fields)=>{
      
        result.forEach(getval)
        function getval(value)
        {
          con1.end()
        return res.render("home_final",{name:value.fullname,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number});
        
        }
        
     })
})
})


app.get('/outpass',(req,res)=>{
  var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con.connect(function(err){
    if (err) throw err;
    con.query(`SELECT*FROM stuoutpass;SELECT*FROM students`,(error,result,fields)=>{
      if (error) throw err;
      global.checkflag=0;
     
      global.checkflag2=0
      global.temp=0
      result[0].forEach(checkval)
      function checkval(value)
      {
        
        if (value.user===global.username)
        {
         global.checkflag=1
          global.temp=value


  
        }
        
      }
      global.pruser=0
      global.ppenum=0
      global.ppanum=0
      global.rollnum=0
      global.fadvisor=0
      global.checkflag3=0;
      result[1].forEach(checkval2)
      function checkval2(value2)
      {
        if(value2.rollno===global.username)
        {
          global.pruser=value2.fullname;//present user
          global.ppenum=value2.personal_number;
          global.ppanum=value2.parent_number;
          global.rollnum=value2.rollno;
          global.fadvisor=value2.faculty_advisor;
        }
      }

      if (global.checkflag===1)
      {
        if (global.temp.outpassstatus==='REQUESTED')
        {
          return res.render('outpass_submit_final',{pname:global.pruser,prollno:global.rollnum,ppenum:global.ppenum,ppanum:global.ppanum,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,stuyear:global.temp.year,stubranch:global.temp.branch,studeparture:global.temp.departure,stuarrival:global.temp.arrival,stureason:global.temp.reason,faculty1res:global.temp.faculty1,faculty2res:global.temp.faculty2,facultyadvisorname:global.temp.faculty1_name})

        }
        
      }
      else{
        global.checkflag3=1
        return res.render('outpass_final',{pname:global.pruser,prollno:global.rollnum,ppenum:global.ppenum,ppanum:global.ppanum,faculty1res:'PENDING',faculty2res:'PENDING',facultyadvisorname:global.temp.faculty1_name})
        
      }

      

    })
  })
  
})

app.get('/home_submit',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * FROM students where rollno ='${global.username}'`,(error,result,fields)=>{
    
      result.forEach(getval)
      function getval(value)
      {
        con2.end()
        return res.render("home_submit_final",{name:value.fullname,pname:value.fullname,prollno:value.rollno,ppenum:value.personal_number,ppanum:value.parent_number});
      
      }
   })
})
})

app.get('/home_faculty',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
    
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from faculty where name='${global.username}';SELECT*from stuoutpass where faculty1='PENDING';SELECT*from stuoutpass where faculty2='PENDING';SELECT*from complaints where faculty_advisor='${global.username}' and roomnumber<>'None';SELECT*from complaints where roomnumber<>'None'`,(error,result,fields)=>{
      if (error) return reject(error);
      const val2=result[0];
      const val3=result[1];
      global.count=0
      val3.forEach(myFunction3)
      function myFunction3(value3)
      {
          global.count=global.count+1
      }

      const val4=result[2];
      global.count2=0
      val4.forEach(myFunction4)
      function myFunction4(value4)
      {
          global.count2=global.count2+1
      }

      const val5=result[3];
      global.count3=0
      val5.forEach(myFunction5)
      function myFunction5(value5)
      {
          global.count3=global.count3+1
      }

      const val6=result[4];
      global.count4=0
      val6.forEach(myFunction6)
      function myFunction6(value6)
      {
          global.count4=global.count4+1
      }
      
      
      val2.forEach(myFunction2)
      function myFunction2(value){
        if (value.name ==='faculty2')
        {
          con2.end()
          return res.render('home_faculty2_final',{complaintnum:global.count4,outpassnum:global.count2,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
        }
        else
        {
          con2.end()
          return res.render('home_faculty_final',{complaintnum:global.count3,outpassnum:global.count,fname:value.name,ftitle:value.title,fnum:value.phonenumber})
        }
       
        
        
        }
      
      
      
})
  })
})

/*app.get('/home_faculty_submit',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from faculty where name='${global.username}'`,(error,result,fields)=>{
      if (error) return reject(error);
      const val2=result;
      
      val2.forEach(myFunction2)
      function myFunction2(value){
        con2.end()
        return res.render('home_faculty_latest2_submit',{fname:value.name,ftitle:value.title,fnum:value.phonenumber})
        
        
        }
      
      
      
})
  })
})*/

app.get('/history',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if(err) throw err
    con2.query(`SELECT*FROM stuoutpasshistory where user='${global.username}';SELECT*FROM students where rollno='${global.username}';SELECT*FROM complaints_history where rollnumber='${global.username}'`,(error,result,fields)=>{
      const val=result[0]
      const val1=result[1]
      const val2=result[2]
      var name=0
      var rolnum=0
      var paphonenum=0
      var pephonenum=0 
      val1.forEach(myFunction2)
      function myFunction2(value2)
      {
        name=value2.name
        rolnum=value2.rollno
        paphonenum=value2.parent_number
        pephonenum=value2.personal_number

      }
      var index=0
      var details=[]
      val.forEach(myFunction1)
      function myFunction1(value1)
      {
        details[index]=value1
        index=index+1

      }
      const num=index

      var index2=0
      var details2=[]
      val2.forEach(myFunction3)
      function myFunction3(value2)
      {
        details2[index2]=value2
        index2=index2+1

      }
      const num2=index2
      
      return res.render('history_final',{elenum2:num2,complaint:details2,elenum:num,outpassdetails:details,pname:name,prollno:rolnum,ppenum:pephonenum,ppanum:paphonenum})
    })
    con2.end()
  })
  
})

app.post('/complaint_seen_mess',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    if (global.username==='faculty1')
    {
      console.log("yass")
    con2.query(`UPDATE complaints SET roomnumber='None',complaint_mess='None',category_mess='None' where faculty_advisor="${global.username}";SELECT*FROM complaints where category_mess='Mess';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      
      const val1=result[2]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[1];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      
      console.log(allele)
      return res.render('complaints_messfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
      
})
    }
  }
  )
})

app.post('/complaint_seen_hostel',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    if (global.username==='faculty1')
    {
      console.log("yass")
    con2.query(`SELECT*FROM complaints where category_hostel='Hostel';SELECT*FROM faculty where name="${global.username}";UPDATE complaints SET roomnumber='None',comaplint_hostel='None',category_hostel='None' where rollnumber='${global.username}'`,(error,result,fields)=>{
      
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      
      console.log(allele)
      return res.render('complaints_hostelfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
      
})
    }
  }
  )
})

app.post('/complaint_seen_academic',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    if (global.username==='faculty1')
    {
      console.log("yass")
    con2.query(`SELECT*FROM complaints where category_academic='Academic';SELECT*FROM faculty where name="${global.username}";UPDATE complaints SET roomnumber='None',comaplint_academic='None',category_academic='None' where rollnumber='${global.username}'`,(error,result,fields)=>{
      
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      
      console.log(allele)
      return res.render('complaints_academicfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
      
})
    }
  }
  )
})

app.post('/security_complete',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err
    con2.query(`SELECT * from stuoutpass where faculty2='APPROVED';SELECT*FROM faculty where name="${global.username}";TRUNCATE TABLE stuoutpass`,(error,result,fields)=>{
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      
      return res.render('outpass_security_completed_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:"",studeparturetime:"",stuarrivaltime:"", elenum:flag3,sturoll:allele,stuname:"",stuyear:"",stubranch:"",studeparture:"",stuarrival:"",parentnum:""})
    })
    con2.end()
  })
})

app.get('/complaint_faculty',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    if (global.username==='faculty1')
    {
      console.log("yass")
    con2.query(`SELECT*FROM complaints where category_mess='Mess';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      
      console.log(allele)
      return res.render('complaints_messfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
      
})
    }
    else if(global.username ==='faculty12')
    {
      con2.query(`SELECT*FROM complaints where category_hostel='Hostel';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      
        const val1=result[1]
        global.ffname=0
        global.ffnum=0
        global.fftitle=0
        val1.forEach(myFunction1)
        function myFunction1(value)
        {
          global.ffname=value.name
          global.ffnum=value.phonenumber
          global.fftitle=value.title
  
        }
        const val2=result[0];
        let flag3=0;
        const allele=[]
        val2.forEach(myFunction2)
        function myFunction2(value){
          
          allele[flag3]=value
          flag3=flag3+1;
          
          }
        
        
        return res.render('complaints_hostelfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
        
  })
    }
    else if(global.username ==='faculty2') 
    {
      con2.query(`SELECT*FROM complaints where category_academic='Academic';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      
        const val1=result[1]
        global.ffname=0
        global.ffnum=0
        global.fftitle=0
        val1.forEach(myFunction1)
        function myFunction1(value)
        {
          global.ffname=value.name
          global.ffnum=value.phonenumber
          global.fftitle=value.title
  
        }
        const val2=result[0];
        let flag3=0;
        const allele=[]
        val2.forEach(myFunction2)
        function myFunction2(value){
          
          allele[flag3]=value
          flag3=flag3+1;
          
          }
        
        
        return res.render('complaints_academicfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:"",roomnumber:"",complaint:"", elenum:flag3,sturoll:allele})
        
  })
    }
    con2.end()
  })
})

app.post('/complaint_messfaculty_afterclick',(req,res)=>{
  var {user}=req.body
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from complaints where category_mess='Mess';SELECT*FROM faculty where name='${global.username}'`,(error,result,fields)=>{
    
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      global.userpresent=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        if(value.rollnumber ===user)
        {
          global.userpresent=value
        }
        }
      con2.end()
      
      return res.render('complaints_messfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:userpresent.rollnumber,roomnumber:userpresent.roomnumber,complaint:userpresent.complaint_mess, elenum:flag3,sturoll:allele})

})
  })
})

app.post('/complaint_hostelfaculty_afterclick',(req,res)=>{
  var {user}=req.body
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from complaints where category_hostel='Hostel';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
    
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      global.userpresent=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        if(value.rollnumber ===user)
        {
          global.userpresent=value
        }
        }
      con2.end()
      
      return res.render('complaints_hostelfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:userpresent.rollnumber,roomnumber:userpresent.roomnumber,complaint:userpresent.complaint_hostel, elenum:flag3,sturoll:allele})

})
  })
})

app.post('/complaint_academicfaculty_afterclick',(req,res)=>{
  var {user}=req.body
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from complaints where category_academic='Academic';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
    
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      global.userpresent=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        if(value.rollnumber ===user)
        {
          global.userpresent=value
        }
        }
      con2.end()
      
      return res.render('complaints_academicfaculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,rollnumber:userpresent.rollnumber,roomnumber:userpresent.roomnumber,complaint:userpresent.complaint_academic, elenum:flag3,sturoll:allele})

})
  })
})


app.get('/outpass_faculty',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from stuoutpass where faculty1_name='${global.username}';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      if (error) return reject(error);
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      con2.end()
      
      return res.render('outpass_faculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:"",studeparturetime:"",stuarrivaltime:"", elenum:flag3,sturoll:allele,stuname:"",stuyear:"",stubranch:"",studeparture:"",stuarrival:"",parentnum:""})

})
  })
})

app.get('/outpass_faculty2',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from stuoutpass where faculty1='APPROVED';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      if (error) return reject(error);
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      con2.end()
      
      return res.render('outpass_faculty2_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:"",studeparturetime:"",stuarrivaltime:"", elenum:flag3,sturoll:allele,stuname:"",stuyear:"",stubranch:"",studeparture:"",stuarrival:"",parentnum:""})

})
  })
})

app.get('/outpass_security',(req,res)=>{
  var con2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con2.connect(function(err){
    if (err) throw err;
    con2.query(`SELECT * from stuoutpass where faculty2='APPROVED';SELECT*FROM faculty where name="${global.username}"`,(error,result,fields)=>{
      if (error) return reject(error);
      const val1=result[1]
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      const val2=result[0];
      let flag3=0;
      const allele=[]
      val2.forEach(myFunction2)
      function myFunction2(value){
        
        allele[flag3]=value
        flag3=flag3+1;
        
        }
      con2.end()
      
      return res.render('outpass_security_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:"",studeparturetime:"",stuarrivaltime:"", elenum:flag3,sturoll:allele,stuname:"",stuyear:"",stubranch:"",studeparture:"",stuarrival:"",parentnum:""})

})
  })
})

app.post('/outpass_security_afterresponse',(req,res)=>{
  global.button_name=req.body

  var con4=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con4.connect(function(err){
    if (err) throw err;
    con4.query(`SELECT *FROM stuoutpass where faculty2='APPROVED';SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${global.button_name['user']}'`,(error,result,fields)=>{
      if (error) throw error
      const val1=result[1]
      const val7=result[2]
      global.parentnum=0
      val7.forEach(myFunction7)
      function myFunction7(value)
      {
        global.parentnum=value.parent_number
      }
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      let flag=0
      global.flag2=0
      const allele=[]
      global.temp=0
      const temp_rollno=0
      const val=result[0]
      val.forEach(myFunction)
      function myFunction(value)
      {
        allele[flag]=value
        flag=flag+1
        console.log(value.user,global.button_name.user)
        if (value.user===global.button_name.user)
        {
          if (value.faculty2==='APPROVED')
          {
            global.flag2=1
            global.temp=value
            
          }
          
          else{
            console.log("nope")
          }

        }
        else{
          console.log("nope2")
        }


      }
      console.log(global.flag2,global.temp)
      if (global.flag2===1)
      {
        return res.render('outpass_security_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival,parentnum:global.parentnum})
      }
      else if(global.flag2===0)
      {
        return res.render('outpass_faculty2_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival,parentnum:global.parentnum})
      }

      
    
      con4.end()
  })
 

})
})


app.post('/outpass_faculty1_afterresponse',(req,res)=>{
  global.button_name=req.body
  
  var con4=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con4.connect(function(err){
    if (err) throw err;
    con4.query(`SELECT *FROM stuoutpass where faculty1_name='${global.username}';SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${global.button_name['user']}'`,(error,result,fields)=>{
      if (error) throw error
      const val1=result[1]
      const val7=result[2]
      global.parentnumm=0
      val7.forEach(myFunction7)
      function myFunction7(value)
      {
        global.parentnumm=value.parent_number
      }
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      let flag=0
      global.flag2=0
      const allele=[]
      global.temp=0
      const temp_rollno=0
      const val=result[0]
      val.forEach(myFunction)
      function myFunction(value)
      {
        allele[flag]=value
        flag=flag+1
        console.log(value.user,global.button_name.user)
        if (value.user===global.button_name.user)
        {
          if (value.faculty1==='APPROVED')
          {
            global.flag2=1
            global.temp=value
            
          }
          else if(value.faculty1==='PENDING')
          {
            global.temp=value
            
          }
          else if(value.faculty1==='DISAPPROVED')
          {
            global.flag2=1
            global.temp=value
          }
          else{
            console.log("nope")
          }

        }
        else{
          console.log("nope2")
        }


      }
      console.log(global.flag2,global.temp)
      if (global.flag2===1)
      {
        return res.render('outpass_faculty_final_response',{fstatus:global.temp.faculty1,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival,parentnum:global.parentnumm})
      }
      else if(global.flag2===0)
      {
        return res.render('outpass_faculty_final',{fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival,parentnum:global.parentnumm})
      }

      
    
      con4.end()
  })
 

})
})

app.post('/outpass_faculty1_response',(req,res)=>{
  var {comment,rollnum,fname}=req.body

  var con5=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs"
    
  })
  
  if (comment==='None')
  {
    console.log("approve")
    con5.connect(function(err){
      if (err) throw err
      con5.query(`UPDATE stuoutpass SET faculty1 ='APPROVED' where user='${rollnum}'`,(error,result,fields)=>{
        if (error) throw error
        
        var con6=mysql.createConnection({
          host:"localhost",
          user:"root",
          password:"avisql@123",
          database:"nodejs",
          multipleStatements:"true"
          
        })
        con6.connect(function(err){
          if (err) throw err
          con6.query(`SELECT * FROM stuoutpass where faculty1_name='${global.username}';SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${rollnum}'`,(error,result,fields)=>{
            if (error) throw error
            const val1=result[1]
            const val7=result[2]
            global.parentnum=0
            val7.forEach(myFunction7)
            function myFunction7(value)
            {
              global.parentnum=value.parent_number
            }
            global.ffname=0
            global.ffnum=0
            global.fftitle=0
            val1.forEach(myFunction1)
            function myFunction1(value)
            {
              global.ffname=value.name
              global.ffnum=value.phonenumber
              global.fftitle=value.title
  
            }
            let temp=0
            const val5=result[0]
            let flag4=0
            const allele=[]
            val5.forEach(myFunction5)
            function myFunction5(value)
            {
              allele[flag4]=value
              flag4=flag4+1
              if (value.user===rollnum){
                temp=value
              }
  
            }
            con6.end()
            return res.render('outpass_faculty_final_response',{parentnum:global.parentnum,fstatus:temp.faculty1,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:temp.reason,studeparturetime:temp.departuretime,stuarrivaltime:temp.arrivaltime,elenum:flag4,sturoll:allele,stuname:temp.user,stubranch:temp.branch,stuyear:temp.year,studeparture:temp.departure,stuarrival:temp.arrival})
  
          })
        })
        con5.end()
        
    })
    })
  }
  else{
    console.log("disapprove")
    con5.connect(function(err){
    if (err) throw err
    con5.query(`UPDATE stuoutpass SET faculty1 ='DISAPPROVED' where user='${rollnum}';UPDATE stuoutpasshistory SET outpassstatus='DISAPPROVED' where user='${rollnum}';UPDATE stuoutpasshistory SET outpassstatus='DISAPPROVED' where user='${rollnum}'`,(error,result,fields)=>{
      if (error) throw error
      
      var con6=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"avisql@123",
        database:"nodejs",
        multipleStatements:"true"
        
      })
      con6.connect(function(err){
        if (err) throw err
        con6.query(`SELECT * FROM stuoutpass where faculty1_name='${global.username}';SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${rollnum}'`,(error,result,fields)=>{
          if (error) throw error
          const val1=result[1]
          const val7=result[2]
            global.parentnum=0
            val7.forEach(myFunction7)
            function myFunction7(value)
            {
              global.parentnum=value.parent_number
            }
          global.ffname=0
          global.ffnum=0
          global.fftitle=0
          val1.forEach(myFunction1)
          function myFunction1(value)
          {
            global.ffname=value.name
            global.ffnum=value.phonenumber
            global.fftitle=value.title

          }
          let temp=0
          const val5=result[0]
          let flag4=0
          const allele=[]
          val5.forEach(myFunction5)
          function myFunction5(value)
          {
            allele[flag4]=value
            flag4=flag4+1
            if (value.user===rollnum){
              temp=value
            }

          }
          con6.end()
          return res.render('outpass_faculty_final_response',{parentnum:global.parentnum,fstatus:temp.faculty1,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:temp.reason,studeparturetime:temp.departuretime,stuarrivaltime:temp.arrivaltime,elenum:flag4,sturoll:allele,stuname:temp.user,stubranch:temp.branch,stuyear:temp.year,studeparture:temp.departure,stuarrival:temp.arrival})

        })
      })
      con5.end()
      
  })
  })
}
})



app.post('/outpass_faculty2_afterresponse',(req,res)=>{
  global.button_name=req.body
  
  var con4=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs",
    multipleStatements:"true"
  })
  con4.connect(function(err){
    if (err) throw err;
    con4.query(`SELECT *FROM stuoutpass;SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${global.button_name['user']}'`,(error,result,fields)=>{
      if (error) throw error
      const val1=result[1]
      const val7=result[2]
      global.parentnum=0
      val7.forEach(myFunction7)
      function myFunction7(value)
      {
        global.parentnum=value.parent_number
      }
      global.ffname=0
      global.ffnum=0
      global.fftitle=0
      val1.forEach(myFunction1)
      function myFunction1(value)
      {
        global.ffname=value.name
        global.ffnum=value.phonenumber
        global.fftitle=value.title

      }
      let flag=0
      global.flag2=0
      const allele=[]
      global.temp=0
      const temp_rollno=0
      const val=result[0]
      val.forEach(myFunction)
      function myFunction(value)
      {
        allele[flag]=value
        flag=flag+1
        console.log(value.user,global.button_name.user)
        if (value.user===global.button_name.user)
        {
          if (value.faculty2==='APPROVED')
          {
            global.flag2=1
            global.temp=value
            
          }
          else if(value.faculty2==='PENDING')
          {
            global.temp=value
            
          }
          else{
            console.log("nope")
          }

        }
        else{
          console.log("nope2")
        }


      }
      console.log(global.flag2,global.temp)
      if (global.flag2===1)
      {
        return res.render('outpass_faculty2_final_response',{parentnum:global.parentnum,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival,fstatus:global.temp.faculty2})
      }
      else if(global.flag2===0)
      {
        return res.render('outpass_faculty2_final',{parentnum:global.parentnum,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:global.temp.reason,studeparturetime:global.temp.departuretime,stuarrivaltime:global.temp.arrivaltime,elenum:flag,sturoll:allele,stuname:global.temp.user,stubranch:global.temp.branch,stuyear:global.temp.year,studeparture:global.temp.departure,stuarrival:global.temp.arrival})
      }

      
    
      con4.end()
  })
 

})
})

app.post('/outpass_faculty2_response',(req,res)=>{
  var {comment,rollnum,fname}=req.body

  var con5=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"avisql@123",
    database:"nodejs"
    
  })
  con5.connect(function(err){
    if (err) throw err
    console.log(comment,"<<<<-----")
    if (comment==='None')
    {
    con5.query(`UPDATE stuoutpass SET faculty2 ='APPROVED' where user='${rollnum}';UPDATE stuoutpasshistory SET outpassstatus='APPROVED' where user='${rollnum}';UPDATE stuoutpass SET outpassstatus='APPROVED' where user='${rollnum}'`,(error,result,fields)=>{
      if (error) throw error
      
      var con6=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"avisql@123",
        database:"nodejs",
        multipleStatements:"true"
        
      })
      con6.connect(function(err){
        if (err) throw err
        con6.query(`SELECT * FROM stuoutpass;SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${rollnum}'`,(error,result,fields)=>{
          if (error) throw error
          const val1=result[1]
          const val7=result[2]
          global.parentnum=0
          val7.forEach(myFunction7)
          function myFunction7(value)
          {
            global.parentnum=value.parent_number
          }
          global.ffname=0
          global.ffnum=0
          global.fftitle=0
          val1.forEach(myFunction1)
          function myFunction1(value)
          {
            global.ffname=value.name
            global.ffnum=value.phonenumber
            global.fftitle=value.title

          }
          let temp=0
          const val5=result[0]
          let flag4=0
          const allele=[]
          val5.forEach(myFunction5)
          function myFunction5(value)
          {
            allele[flag4]=value
            flag4=flag4+1
            if (value.user===rollnum){
              temp=value
            }

          }
          con6.end()
          return res.render('outpass_faculty2_final_response',{parentnum:global.parentnum,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:temp.reason,studeparturetime:temp.departuretime,stuarrivaltime:temp.arrivaltime,elenum:flag4,sturoll:allele,stuname:temp.user,stubranch:temp.branch,stuyear:temp.year,studeparture:temp.departure,stuarrival:temp.arrival,fstatus:temp.faculty2})

        })
      })
      con5.end()
      
  })
    }

  else{
    con5.query(`UPDATE stuoutpass SET faculty2 ='DISAPPROVED' where user='${rollnum}';UPDATE stuoutpass SET outpassstatus ='DISAPPROVED' where user='${rollnum}';UPDATE stuoutpasshistory SET outpassstatus ='DISAPPROVED' where user='${rollnum}'`,(error,result,fields)=>{
      if (error) throw error
      
      var con6=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"avisql@123",
        database:"nodejs",
        multipleStatements:"true"
        
      })
      con6.connect(function(err){
        if (err) throw err
        con6.query(`SELECT * FROM stuoutpass;SELECT*FROM faculty where name='${global.username}';SELECT*FROM students where rollno='${rollnum}'`,(error,result,fields)=>{
          if (error) throw error
          const val1=result[1]
          const val7=result[2]
          global.parentnum=0
          val7.forEach(myFunction7)
          function myFunction7(value)
          {
            global.parentnum=value.parent_number
          }
          global.ffname=0
          global.ffnum=0
          global.fftitle=0
          val1.forEach(myFunction1)
          function myFunction1(value)
          {
            global.ffname=value.name
            global.ffnum=value.phonenumber
            global.fftitle=value.title

          }
          let temp=0
          const val5=result[0]
          let flag4=0
          const allele=[]
          val5.forEach(myFunction5)
          function myFunction5(value)
          {
            allele[flag4]=value
            flag4=flag4+1
            if (value.user===rollnum){
              temp=value
            }

          }
          con6.end()
          return res.render('outpass_faculty2_final_response',{parentnum:global.parentnum,fname:global.ffname,ftitle:global.fftitle,fnum:global.ffnum,stureason:temp.reason,studeparturetime:temp.departuretime,stuarrivaltime:temp.arrivaltime,elenum:flag4,sturoll:allele,stuname:temp.user,stubranch:temp.branch,stuyear:temp.year,studeparture:temp.departure,stuarrival:temp.arrival,fstatus:temp.faculty2})

        })
      })
      con5.end()
      
  })

  }
  }
  )
  
})
})

 
app.listen(8080,()=>{
    console.log("server is running at 8080")
  })