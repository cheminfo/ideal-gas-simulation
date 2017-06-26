'use strict';

import {stop, step, resume} from './animation';

const stopButton = document.getElementById('stop');
const stepButton = document.getElementById('step');
const resumeButton = document.getElementById('resume');

stopButton.addEventListener('click', stop);
stepButton.addEventListener('click', step);
resumeButton.addEventListener('click', resume);
