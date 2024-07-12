import {IsNotEmpty, IsString, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export class UserDto { 
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    @Match('password')
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    position: string;
    
    @IsNotEmpty()
    @IsString()
    department: string; 

    @IsString()
    profile_pic?: string;
}

function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${propertyName} must match ${relatedPropertyName}`;
                },
            },
        });
    };
}
