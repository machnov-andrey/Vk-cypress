

export default class RandomUtil{

    static getRandomString(length = 10) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
          counter += 1;
        }
        return result;
    }
}