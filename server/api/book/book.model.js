'use strict';

import mongoose from 'mongoose';

var BookSchema = new mongoose.Schema({
  title: String,
  owner: String,
  cover: String,
  requested: Boolean
});

export default mongoose.model('Book', BookSchema);
