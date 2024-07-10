import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../services/auth/auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy (Strategy){
    constructor(private authService: AuthService) {
        super();
    }
    
    async validate(username:string, password:string){
        const user = this.authService.login({username,password});
        console.log('local strategy');
        if (!user) throw new UnauthorizedException();
        return user;
    }
}