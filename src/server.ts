


export class LivetoolsServer {

    setup():Promise<void> {
        return new Promise<void>((resolve,reject)=> {
            try {
                console.log("Livetools Server Setup");


                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

var server = new LivetoolsServer();
server.setup().then(()=> {

});