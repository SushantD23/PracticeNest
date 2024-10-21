import { IsNotEmpty, IsString, Length } from "class-validator";

export class loginUserDTO{
@IsNotEmpty({message: 'Username is required'})
@IsString()
@Length(5, 20, { message: 'Username must be between 5 and 20'})
username: string;


@IsNotEmpty({message: 'Password is required'})
@IsString()
@Length(6, 9, {message: "Password length must be between 8  and 20 characters"})
password: string;
}