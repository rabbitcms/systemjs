///<reference path="node_modules/@types/youtube/index.d.ts"/>
declare module 'youtube' {
    export var loading: number;
    export var loaded: number;

    export function ready(f: () => void);
}

declare interface JQuery {
    mb_YTPlayer(opt?);
    YTPlayer(opt?);
    // change the video of the specified player
    YTPChangeMovie(opt?);// play the video    YTPPlay();// pause the video    YTPPause();
    // stop the video
    YTPStop();

    // switch video from background to front
    YTPFullscreen();

    // change the video volume
    YTPSetVolume(val: number);

    // mute the audio
    YTPMute();

    // unmute the audio
    YTPUnmute();

    // switch from mute to unmute
    YTPToggleVolume();

    // retrive the original player returned by the YouTube API
    YTPGetPlayer();

    // Returns the info data of the current video as JSON.
    YTPGetVideoData();

    // Available only if you are playing a video list;
    // goes to the next video in the play list.
    YTPPlayNext();

    // Available only if you are playing a video list;
    // goes to the previous video in the play list.
    YTPPlayPrev();
}