const fs=require('fs')
const http=require('http')

const PORT = process.env.PORT;

function currentdatetime(){
    
    const date_time = new Date();
    const date = ("0" + date_time.getDate()).slice(-2);
    const month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    const year = date_time.getFullYear();
    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();
    const currentDateTime = date + "-" + month + "-" + year + "T" + hours + ":" + minutes + ":" + seconds;

    return currentDateTime;
}

const server= http.createServer((request,response)=>{
    console.log(request.url)
    switch(request.url){
        case '/create':{

            let fileName= currentdatetime()
            let date=new Date().toString()
            fs.writeFileSync(`./Newfiles/${fileName}.txt`,date,'UTF-8')
            response.writeHead(200,{'content-type':'text/html'})
            response.end(`<h2>File Created : ${fileName}</h2>`)
            break;
        }

        case '/file':{
            fs.readdir("./Newfiles/", (err, file) => {
                if (err) {
                    console.log("files not found" + err);
                    response.writeHead(200,{'content-type':'text/html'})
                    response.end(`<h2>Files not found : ${err}</h2>`);
                }
                else{
                    console.log("Available files:" + file);
                    console.log(file.length)
                    if(file.length>0){
                        response.writeHead(200,{'content-type':'application/json'})
                        response.end(JSON.stringify(file));
                    }
                    else{
                        response.writeHead(200,{'content-type':'text/html'})
                        response.end(`<h2>File folder is empty</h2>`);
                    }
                    
                }
            }
            )
            break;
        }
    }
})

server.listen(PORT, () => console.log(`The server started in: ${PORT}`))