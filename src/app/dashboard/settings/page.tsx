import React from 'react';
import { useForm } from 'react-hook-form';
import SettingsForm from './SettingsForm';
import { findData, getData, updateData } from '@/utils/apiRequests';

const page = async () => {
	const settings = await getData('/api/settings');

	console.log(settings);

	return (
		<div>
			Settings page
			<div className="w-full">
				<SettingsForm settings={settings.data} />
			</div>
		</div>
	);
};

export default page;
