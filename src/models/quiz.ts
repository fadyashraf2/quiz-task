import { Question } from './question';

export class Quiz {
    
    constructor(
        public quizTitle:String,
        public quizDescr:String,
        public questions:[Question]
    ){

    }
}
