const fs = require('fs')
// fs.writeFile('hey.text',"Hello kaise ho bhai",(err)=>{
//     if(err) console.log(err);
//     else console.log('done');
// })

// fs.appendFile('hey.text',"main to thik hu",(err)=>{
//     if(err) console.log(err);
//     else console.log('done');
// })

// fs.rename('hey.text','hello.text',(err)=>{
//     if(err) console.log(err);
//     else console.log('done');
// })

// fs.copyFile('hello.text','./copy.txt',(err)=>{
//     if(err) console.log(err.message); ---> error.message will throw
//     else console.log('done');
    
// })

//delete the file
fs.unlink('copy.text',(err)=>{
    if(err)console.log(err);
    else console.log('removed');  
})

//isse blank folder delete hoga
fs.rmdir('./hey',{recursive:true},(err)=>{
    if(err) console.log(err);
    else console.log('removed');
})

// and fs.rm('./copy,{recursive:true},(err)) ---> iske folder ke andar ka bhi delete ho jaata ahi 
// fs.rm('./copy2/',{recursive:true},(err)=>{
//     if(err) console.log(err);
//     else console.log('removed');
// })


// writeFile
// copyFile
// appendfile
// rename
// unlink-->delete File