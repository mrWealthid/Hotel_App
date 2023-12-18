'use server';

import { WaitlistEmail } from '@/components/ui/emails/WaitList';
import React from 'react';
import { Resend } from 'resend';

export async function sendEmail() {
	const sender = 'onboarding@resend.dev';
	const resend = new Resend(process.env.RESEND_API_KEY);

	// const templates = React.createElement(WaitlistEmail, {
	// 	userFirstname: 'Wealth',
	// 	resetPasswordLink: 'www.now.com'
	// });
	const templates = React.createElement(WaitlistEmail, {
		name: 'Wealth'
	});

	//2)- Define emails options
	// const mailOptions = {
	// 	from: this.from,
	// 	to: this.to,
	// 	subject,
	// 	// html: template
	// 	react: templates
	// };

	resend.emails.send({
		from: sender,
		to: 'wealthiduwe@gmail.com',
		subject: 'Updated',
		// html: template
		react: templates
	});
}
