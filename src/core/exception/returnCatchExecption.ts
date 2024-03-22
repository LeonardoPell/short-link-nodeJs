
import Exception from "./Exception";

export default function returnCatchException(error: any){
    if(
        error?.status &&
        error?.message
    ){
        throw new Exception(Number(error.status), String(error.message));
    }

    throw new Error(error);
    
}