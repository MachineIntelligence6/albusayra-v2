import { v4 as uuidv4 } from "uuid";


export const uuid = () => uuidv4()

export const demoAsyncOperation = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(`Operation successful with data: ${data}`);
            } else {
                reject("Operation failed: No data provided");
            }
        }, 2000); // Simulate a 2-second delay
    });
};