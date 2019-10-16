export class Assert {
    public static isNotNull(value: any, message: string = "A not null value is required") {
        if(value == null){
            throw new Error(message);
        }
    }

    public static isNotNullOrEmpty(value: string, message: string = "A non empty string is required") {
        if(value == null || value === ""){
            throw new Error(message);
        }
    }

    public static isNotNullOrWhiteSpace(value: string, message: string = "A non whitespace string is required") {
        if(value == null || value.trim() === ""){
            throw new Error(message);
        }
    }
}