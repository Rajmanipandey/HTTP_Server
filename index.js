const jwt=require("jsonwebtoken");
const express=require("express");
const app=express();

const users=[];
const JWT_SECRET="jdfndsjbdvvdmldcnjdsv";
app.use(express.json());

function auth(req,res,next){
    const token = req.headers.authorization;
    const userDetails = jwt.verify(token, JWT_SECRET);
   
    req.username=userDetails.username;


    next();
}
app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.send({
        message:"you are signed up!"
    })

    console.log(users);
})

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let founduser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            founduser=users[i];
            break;
        }
    }

    if(founduser){
        const token=jwt.sign({
            username:founduser.username
        },JWT_SECRET);

        founduser.token=token;

        res.send({
            token:token
        })
    }

    else{
        res.send({
            message:"invalid username or password"
        })
    }
    console.log(users);

})



app.get("/me",auth,function(req, res){
   // const token = req.headers.authorization;
    //const userDetails = jwt.verify(token, JWT_SECRET);

    //const founduser =  userDetails.username;
    let user=null;
    for(let i=0;i<users.length;i++){
        if(users[0].username===req.username){
            user=users[0];
            break;
        }
    }

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})



app.listen(8000);


