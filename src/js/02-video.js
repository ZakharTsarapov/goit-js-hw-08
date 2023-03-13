import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    const time = data.seconds;
    localStorage.setItem(STORAGE_KEY, time);
  }, 1000)
);

const playedTime = localStorage.getItem(STORAGE_KEY);
if (playedTime) {
  player.setCurrentTime(playedTime);
};
