const fs = require("fs");
const path = require("path")

const pathname = path.resolve(__dirname, 'src/a');


// fs.access(pathname, (err, context) => {
//     if()
//
//     console.log(err)
//     if(err === null){
//         // 没有错误就是存在
//     }
// })


async function test(){
   try{
       const result = await fs.promises.access(pathname);
       console.log("默认值",result);

   }catch (err){
       console.log("错误值",err);
   }
}

test();