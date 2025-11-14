export const apiConfig={
    apiUrl:`${window.location.origin}/api/`,
    // apiUrl:"http://localhost:7614/api",
    get statusUrl(){
        return `${this.apiUrl}/status`
    },
    get postUrl(){
        return `${this.apiUrl}/post`
    }
    
}
