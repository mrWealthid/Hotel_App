import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../service/profile.service';

export function useProfile() {
	const { isLoading, data, error } = useQuery({
		queryKey: ['profile'],
		queryFn: () => fetchProfile()
	});

	return {
		isLoading,
		error,
		data: data?.data
	};
}
