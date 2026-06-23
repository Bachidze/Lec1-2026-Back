#!/usr/bin/env node
const {Command} = require("commander")
const program = new Command()
const fs = require("fs/promises")


program
    .command("show")
    .description("show desc")
    .action(async () => {
        let readAnimalsJson = await fs.readFile("animals.json","utf-8")
        let parsedAnimalsJson = JSON.parse(readAnimalsJson)
        console.log(parsedAnimalsJson)
    })

    program
        .command("create")
        .description("this is crate")
        .argument("name")
        .argument("type")
        .argument("habitat")
        .action(async (name,type,habitat)  => {
            let readAnimalsJson = await fs.readFile("animals.json","utf-8")
            let parsedAnimalsJson = JSON.parse(readAnimalsJson)
            let lastId = parsedAnimalsJson[parsedAnimalsJson.length-1]?.id || 0
            let newObj = {
                id:lastId + 1,
                name,
                type,
                habitat
            }
            parsedAnimalsJson.push(newObj)
            await fs.writeFile("animals.json",JSON.stringify(parsedAnimalsJson,null,2))
            console.log("written successfully")
        })

        program
            .command("delete")
            .description("this is delete fnc")
            .argument("id")
            .action(async (id) => {
                let readAnimalsJson = await fs.readFile("animals.json","utf-8")
                let parsedAnimalsJson = JSON.parse(readAnimalsJson)
                const index = parsedAnimalsJson.findIndex(el => el.id === Number(id))
                console.log(index)
                if(index === -1){
                    console.log("not found")
                    return
                }
                let deleteAnimal = parsedAnimalsJson.splice(index,1)
                await fs.writeFile("animals.json",JSON.stringify(parsedAnimalsJson))
                console.log("deleted successfully",deleteAnimal)
            })

            program
                .command("find")
                .description("get by id")
                .argument("id")
                .action(async (id) => {
                    let readAnimalsJson = await fs.readFile("animals.json","utf-8")
                    let parsedAnimalsJson = JSON.parse(readAnimalsJson)

                    const byId = parsedAnimalsJson.find(el => el.id === Number(id))

                    console.log(byId)
                })


                // program
                //     .command("update")
                //     .argument("id")
                //     .argument("name")
                //     .argument("type")
                //     .argument("color")
                //     .action(async (id,name,type,habitat_) => {
                //         let readAnimalsJson = await fs.readFile("animals.json","utf-8")
                //         let parsedAnimalsJson = JSON.parse(readAnimalsJson)

                //         const index = parsedAnimalsJson.findIndex(el => el.id === Number(id))
            
                //          if(index === -1){
                //          console.log("not found")
                //         return
                //       }

                //       parsedAnimalsJson[index] = {...parsedAnimalsJson[index],name,type,habitat}
                //       await fs.writeFile("animals.json",JSON.stringify(parsedAnimalsJson))
                //       console.log("updated successfully")
                //     })

                program
  .command("update")
  .argument("<id>")
  .argument("<name>")
  .argument("<type>")
  .argument("[habitat]")
  .action(async (id, name, type, habitat) => {
    const readAnimalsJson = await fs.readFile("animals.json", "utf-8");
    const parsedAnimalsJson = JSON.parse(readAnimalsJson);

    const index = parsedAnimalsJson.findIndex(el => el.id === Number(id));

    if (index === -1) {
      console.log("not found");
      return;
    }

    parsedAnimalsJson[index] = {
      ...parsedAnimalsJson[index],
      name,
      type,
      ...(habitat && { habitat })
    };

    await fs.writeFile("animals.json", JSON.stringify(parsedAnimalsJson, null, 2));
    console.log("updated successfully");
  })


program.parse()



// function sum(a,b){
//     return a+b
// }
// console.log(sum(100,5))

//1 moduel js 
//  "type":"module",

// import { print, reverseSTR, sum } from "./utils/helper.js";
// console.log(sum(100,50))
// print("hello")
// console.log(reverseSTR("giorgi"))



// hhtp server + query + url

// import http  from "http"
// const http = require("http")
// const url = require("url")
// const queryString = require("querystring")
// const fs = require("fs/promises")
// const PORT = 8080


// const server = http.createServer(async (req,res) => {
//     res.writeHead(200,{"content-type":"application.json"})

//     // query parse
//     const parsedURL = url.parse(req.url)
//     const query = queryString.parse(parsedURL.query)
//     console.log(query)

//     // ------------------------------------------------

//     //readUsers + parse
//     const readUserData = await fs.readFile("users.json","utf-8")
//     const parseUserData = JSON.parse(readUserData)
    
//     // ------------------------------------------------

//     //readPosts + parse
//     const readPostsData = await fs.readFile("posts.json","utf-8")
//     const parsePostsData = JSON.parse(readPostsData)

//      // ------------------------------------------------




//     if(parsedURL.pathname === "/"){
//         return res.end("avto")
//     }else if(parsedURL.pathname === "/users"){

//         // get by id
//         if(query.id){
//             const findUserById = parseUserData.find(el => el.id === Number(query.id))
//             if(!findUserById){
//                 return res.end("user not found")
//             }
//             return res.end(JSON.stringify(findUserById))
//         }
        
//         // return all users /users
//         return res.end(JSON.stringify(parseUserData))
//     }else if(parsedURL.pathname === "/posts"){
//         let {page=1,take=30} = query
//         if(take > 30){
//             take = 30
//         }
//         const result = parsePostsData.slice((page-1) * take, page *take)
//         return res.end(JSON.stringify(result))
//     }


// })
// server.listen(PORT,() => {
//     console.log(`server running on http://localhost:${PORT}`)
// })



