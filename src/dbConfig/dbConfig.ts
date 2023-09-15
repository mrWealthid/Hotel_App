import mongoose from 'mongoose';

export async function connect() {
	const DB = process.env.DATABASE_URI?.replace(
		'<PASSWORD>',
		process.env.DATABASE_PASSWORD!
	);

	try {
		mongoose.connect(DB!);
		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('MongoDB connected successfully');
		});

		connection.on('error', (err) => {
			console.log(
				'MongoDB connection error. Please make sure MongoDB is running. ' +
					err
			);
			process.exit();
		});
	} catch (error) {
		console.log('Something goes wrong!');
		console.log(error);
	}
}
