import { IsNotEmpty, IsString, Length, IsEmail, IsInt, Min, Max, IsPhoneNumber} from 'class-validator'

export class createUserDto{
    // @IsInt()
    // user_id: number;
    
    @IsNotEmpty({message: 'Username is required'})
    @IsString()
    @Length(3, 20, { message: 'Username must be between 5 and 20'})
    fullname: string;    
    
    @IsNotEmpty({message: 'Username is required'})
    @IsString()
    @Length(5, 20, { message: 'Username must be between 5 and 20'})
    username: string;
    
    @IsEmail({}, {message: "Enter a valid email"})
    @IsNotEmpty({message: "Email is required"})
    email: string;

    @IsNotEmpty({message: "Please enter your contact number"})
    @IsPhoneNumber('IN', {message: "Enter a valid Indian contact number"})
    contact: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString()
    @Length(5, 10, {message: "Password length must be between 5  and 10 characters"})
    password: string;
    
    @IsNotEmpty({message: "You are here to save your card PIN. Please enter it"})
    @IsInt({message: "PIN must be a number"})
    @Min(1000, {message: "PIN should not be more than 4 digit"})
    @Max(9999, {message: "PIN should not be more than 4 digit"})
    pin: number;
}