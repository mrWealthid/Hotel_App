import React from 'react';
import TextInput from './form-inputs/Text-Input';
import EmailInput from './form-inputs/Email-Input';
import ButtonComponent from './form-inputs/Button-component';
import Reveal from './shared/Animations/Reveal';

const FooterComponent = () => {
	return (
		<footer className=" flex text-secondary flex-col ">
			<section className=" background py-10 md:py-12 flex flex-col text-center items-center gap-3 justify-center container-text ">
				<Reveal
					width="100%"
					variant={{
						hidden: { opacity: 0, y: 75 },
						visible: { opacity: 1, y: 0 }
					}}>
					<h3 className="text-4xl font-bold  ">Be Born Again</h3>
				</Reveal>
				<p className="text-xl font-semibold">SAY THESE WORDS:</p>
				<Reveal
					variant={{
						hidden: { opacity: 0, x: 75 },
						visible: { opacity: 1, x: 0 }
					}}>
					<p className="md:max-w-2xl text- font-light 2xl:max-w-2xl">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Ut tenetur itaque, eum iure a, veritatis ipsa
						placeat enim vel voluptatem tempore id dolore officia.
						Eum, magnam cum! Perferendis, distinctio laborum?
						tenetur itaque, eum iure a, veritatis ipsa placeat enim
						vel voluptatem tempore id dolore officia. Eum, magnam
						cum! Perferendis, distinctio laborum?
					</p>
				</Reveal>

				<form
					className=" w-full md:w-1/2 flex flex-col gap-3 "
					action="
        ">
					<TextInput
						name={'FullName'}
						placeholder={'Enter Full Name'}
					/>

					<section className="flex w-full gap-3">
						<EmailInput name={'email'} />

						<TextInput
							name={'Phone'}
							placeholder={'Enter Phone Number'}
						/>
					</section>

					<section className=" flex justify-end ">
						<ButtonComponent
							style="rounded-3xl !w-1/3 2xl:w-1/5"
							btnText="Submit"
							type="submit"
							afterIcon="/assets/send.svg"
						/>
					</section>
				</form>
			</section>

			<section className="pb-0 bg-primary-300  container-text text-secondary md:pb-10">
				<div className="pt-8 md:pt-16 flex-wrap flex flex-col md:flex-row justify-between">
					<div className="md:mt-2 mt-0">
						<p className="mb-0 text-sm md:text-lg md:mb-20 font-medium">
							New Covenant Christian Center Inc.
						</p>

						<p className="text-xs  md:text-sm">
							1305 Ball St. Greensboro, NC, 27405
							<br />
							1305 Ball St. Greensboro, NC, 27405
							<br />
						</p>
						<small className="block">
							<i className="fa-solid fa-phone"></i> 336-230-0221
							{/* <app-clipboard [textToCopy]="'+13362103455'"></app-clipboard> */}
						</small>

						<small>
							<i className="fa-solid fa-at"></i>
							general.info@ncccinc.org
							{/* <app-clipboard [textToCopy]="'wealthiduwe@gmail.com'"></app-clipboard> */}
						</small>
					</div>
					<div className="mt-5">
						<p className="text-xs md:text-sm font-medium">
							Quick Links
						</p>
						<a
							href="/"
							className="block text-xs md:text-sm cursor-pointer">
							Dashboard
						</a>
						<a
							href="/"
							className="block text-xs md:text-sm cursor-pointer">
							Login
						</a>
					</div>

					<div className="mt-5">
						<p className="font-medium text-sm md:text-sm">
							Get In Touch
						</p>

						<p className="text-xs md:text-sm">
							We &apos;ll love to hear from you
						</p>

						<p className="flex mt-4 mb-8 md:mt-16 md:mb-0 gap-3">
							{/* <a
								title="portfolioLink"
								className="bg-primary-light dark:glass block w-10 h-10 text-center hover:bg-secondary duration-500 transition hover:scale-110 transform cursor-pointer rounded-full text-white p-2"
								href="https://wealthtech.website">
								<i className="fa-solid fa-globe"></i>
							</a> */}
							<a
								title="facebookLink"
								className="bg-primary-light dark:glass block w-10 h-10 text-center hover:bg-secondary duration-500 transition hover:scale-110 transform cursor-pointer rounded-full text-white p-2"
								href="">
								<i className="fa-brands fa-facebook"></i>
							</a>
							<a
								title="linkedInLink"
								className="bg-primary-light dark:glass hover:scale-110 w-10 h-10 hover:bg-secondary duration-500 transition transform cursor-pointer text-center block rounded-full text-white p-2"
								href="">
								<i className="fa-brands fa-instagram"></i>
							</a>
							<a
								title="youtubeLink"
								className="bg-primary-light dark:glass hover:scale-110 w-10 h-10 hover:bg-secondary duration-500 transition transform cursor-pointer text-center block rounded-full text-white p-2"
								href="">
								<i className="fa-brands fa-youtube"></i>
							</a>
						</p>
					</div>
				</div>
			</section>
		</footer>
	);
};

export default FooterComponent;
