import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const frame = document.querySelector('#vimeo-player');
const player = new Player(frame);

player.on('timeupdate', throttle(onPlay, 1000));
function onPlay({ seconds }) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
}
const LS = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(LS).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      // the time was less than 0 or greater than the video’s duration
      break;

    default:
      // some other error occurred
      break;
  }
});
