import  mongoose from 'mongoose'
let { DB_URL: dbUrl } = process.env ;
/**
 *  connect is async, we have to use it with async and await or provide callback function in
 */
export default function() {
    if(dbUrl){
        mongoose.connect(dbUrl)
            .then(() => {
                console.log(`connected to ${dbUrl} successfully`);
            }).catch((e)=>{
            console.log("we faced an error in connecting to db ");
        });
    }else{
        // fixme handle the case of failure in env variables

    }
}

