import mongoose from 'mongoose'

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },
  code: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Constituency', constituencySchema)
