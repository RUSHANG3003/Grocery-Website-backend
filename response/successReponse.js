class successResponse{
    constructor(status,data){
        this.status=Boolean(status);
        this.data=Object(data);
    }
}

module.exports=successResponse