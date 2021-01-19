import  mongoose from 'mongoose'
let dbUrl: string | undefined= process.env.DB_URL ;
/**
 *  connect is async, we have to use it with async and await or provide callback function in
 */
export default function() {
    if(dbUrl){
        mongoose.connect(dbUrl,{ useUnifiedTopology: true , useNewUrlParser: true})
            .then(() => {
                console.log(`connected to ${dbUrl} successfully`);
            }).catch((e)=>{
            console.log("we faced an error in connecting to db ");
        });
    }else{
        // fixme handle the case of failure in env variables

    }
}

