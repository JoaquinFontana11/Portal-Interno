import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Un video tiene que tener un titulo']
	},
	urlLocal: String,
	urlRemote: String
});

const Video = mongoose.model('videos', videoSchema);

export default Video;
