// constants used in components/ containers.
// Expand this file into a folder if number of consts grows.

export const layersProperty = {
  osmWeb: {
    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  osmWebBlackWhite: {
    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  },
};

export default { layersProperty };
