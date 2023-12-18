import * as emails from '@/lib/emails/templates/emailTemplates';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.name.split(',')[0];
		this.url = url;
		this.from = `support@em4491.wealthtech.website`;
	}

	handleCreateTransport() {
		if (process.env.NODE_ENV === 'production') {
			//SEnd Grid
			// return nodemailer.createTransport({
			//   service:'SendGrid',
			//   auth: {
			//     user: process.env.SENDGRID_USERNAME,
			//   pass:process.env.SENDGRID_PASSWORD
			//   }
			// })
			//Couldn't implement Send Grid because my account wasn't created! Try to Implement later when account is approved!
		}

		return nodemailer.createTransport({
			// service: 'Gmail',
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
		});
	}

	//configuring with WEB APIS

	async handleWebAPI(msg) {
		return await sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async send(template, subject) {
		//2)- Define emails options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html: template
		};

		await this.handleWebAPI(mailOptions);
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the Wealth_Wallet');
	}

	async sendPasswordReset() {
		const html = emails.resetPassword
			.replace('{{name}}', this.firstName)
			.replace('{{url}}', this.url);
		await this.send(
			html,
			'Your password reset token (valid for only 10 minutes)'
		);
	}

	// sendMyMail() {
	// 	const msg = {
	// 		to: 'mygee@mailsac.com', // Change to your recipient
	// 		from: 'support@em4491.wealthtech.website', // Change to your verified sender
	// 		subject: 'Sending with SendGrid is Fun',
	// 		// text: 'and easy to do anywhere, even with Node.js',
	// 		html: emails.resetPassword
	// 			.replace('{{name}}', this.firstName)
	// 			.replace('{{url}}', this.url)
	// 	};
	// 	sgMail
	// 		.send(msg)
	// 		.then(() => {
	// 			console.log('Email sent');
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }
}
