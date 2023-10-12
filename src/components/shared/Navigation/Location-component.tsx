import Image from 'next/image';

const LocationPinComponent = ({ text }: any) => (
	<div className="flex flex-col items-center gap-3">
		<Image
			className=" object-contain"
			height={60}
			src="/assets/location-pin.svg"
			alt="ministers"
			width={40}
		/>

		<p className="bg-white font-bold rounded-lg  font-raleway py-2 px-4 ">
			{text}
		</p>
	</div>
);

export default LocationPinComponent;
