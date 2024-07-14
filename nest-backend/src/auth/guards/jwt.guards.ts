import { AuthGuard } from "@nestjs/passport";
import {ExecutionContext, Injectable} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuards extends AuthGuard('jwt') {
    private blacklistedTokens: Set<string> = new Set();

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];

        if (token && this.isTokenBlacklisted(token)) {
            return false;
        }

        return super.canActivate(context);
    }

    addTokenToBlacklist(token: string) {
        this.blacklistedTokens.add(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }
}
