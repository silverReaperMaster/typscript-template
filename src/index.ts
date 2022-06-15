
import { logger } from "./helpers/common/logger";

logger.info('Started System');

function delay(milliseconds:number){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

(async () =>{
    let i = 1;
    // eslint-disable-next-line no-constant-condition,no-loops/no-loops
    while(true){
        await delay(1000);
        i++;
        logger.info('.',i);
}
})();