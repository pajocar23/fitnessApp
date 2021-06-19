export class ConsumedAmount {
    constructor(public id: string, public consumedAmountOfWater: number,public waterPercentage:number,public waterUdeo:number,
        public consumedAmountOfCalories: number, 
        public consumedAmountOfCarbs: number,public carbsPercentage:number,public carbsUdeo:number,
        public consumedAmountOfProtein: number,public proteinPercentage:number,public proteinUdeo:number,
        public consumedAmountOfFats: number,public fatsPercentage:number,public fatsUdeo:number,
        public consumedAmountOfSleep: number,public sleepPercentage:number,public sleepUdeo:number,
        public consumedAmountOfMindState: number,public mindStatePercentage:number,public mindStateUdeo:number,
        public userId: string, public date: string) {

    }

}