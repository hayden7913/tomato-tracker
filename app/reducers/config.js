import * as actions from '../actions/indexActions';

const defaultState = {
  alarmSoundSrc: '/public/sound/clock-ring.mp3'
}

export function config(state=defaultState, action) {
  switch(action.type) {
    case actions.UPDATE_CONFIG:
      return action.newConfigData
    default:
      return state;
  }
}
