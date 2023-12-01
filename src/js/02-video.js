import throttle from 'lodash.throttle';
import localStorageManager from './storage.js';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const videoplayerCurrentTime = localStorageManager.get(
  'videoplayer-current-time'
);

/**
  |============================
  | Vimeo-Player Event Listener
  |============================
*/
// Save current time
player.on(
  'timeupdate',
  throttle(data => {
    localStorageManager.set('videoplayer-current-time', data.seconds);
  }, 1000)
);

// Set current time retrieved from Local Storage
if (videoplayerCurrentTime) {
  player.setCurrentTime(videoplayerCurrentTime).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'The time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.log('setCurrentTime error: ', error.name);
        break;
    }
  });
}
