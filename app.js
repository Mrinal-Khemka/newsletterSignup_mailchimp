const express =require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.htm");
});
app.post("/",function(req,res)
{   
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const emailId=req.body.emailId;
    const data={
       members:[
          {
          email_address:emailId,
          status:"subscribed",
          merge_fields:{
             FNAME:firstName,
             LNAME:lastName
          }
       }
      ]
  
    };
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/ebaecd5f86";
    const options={
       method:"post",
       auth:"Mrinal1:d292c9b8fe250bba1b690ca0c794be25-us8"
    }
    const request=https.request(url,options,function(response)
    {
       response.on("data",function(data)
       {
         var responseData=JSON.parse(data);
         console.log(responseData);
         if(response.statusCode===200) 
         {
            res.sendFile(__dirname + "/success.htm");
         }
         else
         {
            res.sendFile(__dirname +"/failure.htm");
         }
      
    });
   });
    request.write(jsonData);
    request.end();
//     res.write("your Name: "+firstName+" "+lastName+"\n");
//     res.write("your emailId: "+emailId);
//     res.send();
 });
app.post("/failure",function(req,res)
{
   res.redirect("/");

});
app.listen(process.env.PORT||3000,function()
{
   console.log("working at port:3000");
});


//apikey
//d292c9b8fe250bba1b690ca0c794be25-us8
//id:ebaecd5f86
//replace X by number at the end of api
//append id to url  