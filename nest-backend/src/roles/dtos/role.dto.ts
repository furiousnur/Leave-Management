import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    status?: string;

    @IsArray()
    @IsNotEmpty()
    permissions: number[];
}
