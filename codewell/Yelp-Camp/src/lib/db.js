import mongoose from 'mongoose';
const { connect } = mongoose;

export default async function connectDB() {
	return connect(process.env.MONGO_URI);
}
