export interface IUpdatePassword {
	newPassword: string;
	currentPassword: string;
	confirmNewPassword: string;
	resetToken: string;
}

export interface IResetPassword {
	email: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
	role?: 'user' | 'admin';
}
