import mongoose from 'mongoose';
const { Schema } = mongoose;

const cookieSchema = new Schema({
	cookieId: String,
	userId: String,
	email: String
});

export default mongoose.model('Cookie', cookieSchema);
