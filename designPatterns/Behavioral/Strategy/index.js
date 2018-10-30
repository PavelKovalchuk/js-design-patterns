/**
 * Strategy
 *
 *  Strategy pattern allows you to switch the algorithm or strategy based upon the situation.
 *   (also known as the policy pattern) is a behavioural software design pattern
 *   that enables an algorithm's behavior to be selected at runtime.
 */

// **************************** //

const bubbleSort = dataset => {
    console.log('Sorting with bubble sort');
    // ...
    // ...
    return dataset;
};

const quickSort = dataset => {
    console.log('Sorting with quick sort');
    // ...
    // ...
    return dataset;
};

// **************************** //

// client that is going to use any strategy

const sorter = dataset => {
    if(dataset.length > 5){
        return quickSort;
    } else {
        return bubbleSort;
    }
};

// **************************** //

const longDataSet = [1, 5, 4, 3, 2, 8];
const shortDataSet = [1, 5, 4];

const sorter1 = sorter(longDataSet);
const sorter2 = sorter(shortDataSet);

sorter1(longDataSet); // Output : Sorting with quick sort
sorter2(shortDataSet); // Output : Sorting with bubble sort
