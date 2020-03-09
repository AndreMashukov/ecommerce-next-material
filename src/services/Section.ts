import axios from 'axios';

// const API_BASE = process.env.API_BASE;
// const API_BASE = 'https://api.github.com/repos/zeit/next.js';

export default () => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://localhost:3000/api/sections/block?blockId=4')
        .then(resp => {
          // tslint:disable-next-line: no-console
          console.log(resp);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
};
