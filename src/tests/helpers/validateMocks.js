export const validate = (response,checkpoint)=>{
    for(const key in response){
        if(key === checkpoint){
            expect(typeof(response[key])).toBe('string');
        }else{
            expect(response[key]).toBe(false);
        }
    }
}