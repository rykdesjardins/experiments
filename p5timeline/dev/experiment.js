import log from './log';
import Timeline from './timeline';

global.log = log;
const __timeline = new Timeline().start();
