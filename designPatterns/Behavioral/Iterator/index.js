/**
 * Iterator
 *
 * It presents a way to access the elements of an object without exposing the underlying presentation.
 *
 * an iterator is used to traverse a container and access the container's elements.
 *
 */

// **************************** //

class RadioStation {
    constructor(frequency) {
        this.frequency = frequency;
    }

    getFrequency() {
        return this.frequency;
    }
}

// **************************** //
//Then we have our iterator

class StationList {
    constructor(){
        this.stations = [];
    }

    addStation(station) {
        this.stations.push(station);
    }

    removeStation(toRemove) {
        const toRemoveFrequency = toRemove.getFrequency();
        this.stations = this.stations.filter(station => {
            return station.getFrequency() !== toRemoveFrequency
        });
    }
}

// **************************** //

// And then it can be used as

const stationList = new StationList();

stationList.addStation(new RadioStation(89));
stationList.addStation(new RadioStation(101));
stationList.addStation(new RadioStation(102));
stationList.addStation(new RadioStation(103.2));

stationList.stations.forEach(station => console.log(station.getFrequency()));

stationList.removeStation(new RadioStation(89)); // Will remove station 89
console.info('stationList ', stationList);

