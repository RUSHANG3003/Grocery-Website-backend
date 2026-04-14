class errorResponse{
    constructor(errorMessage,code){
        this.message=String(errorMessage);
        this.code=String(code);
    }

}

module.exports=errorResponse