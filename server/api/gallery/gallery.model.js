'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './gallery.events';

var SlideSchema = new mongoose.Schema({
  id: Number,
  text: String,
  image: String
});

registerEvents(SlideSchema);
export default mongoose.model('Slide', SlideSchema);
