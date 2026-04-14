const errorResponse = require("./errorResponse");

class failureResponse{


    constructor(status, errorMessage, errorCode){
        this.status=Boolean(status);
        this.error=new errorResponse(errorMessage, errorCode);
    }
}

module.exports=failureResponse;