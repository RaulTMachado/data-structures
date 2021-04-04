import { Batcher } from '../batcher';
import { arrForEach, arrSetLength } from './array-operations';

/* This is a protected function, therefore should not be exposed in the public api */
export const arrFilterForUnlocked = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean): Batcher<Array<T>> => {
    let deletions = 0;
    arrForEach(batcher, (item, index, arr) => {
        arr[index - deletions] = item;        
        if (!fn(item)) {
            deletions++;
        }
    });
    if (deletions > 0) {
        batcher.willChangeWithoutCloning();
    }
    arrSetLength(batcher, -deletions);
    return batcher;
};
