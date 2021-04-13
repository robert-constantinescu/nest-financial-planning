import {AuthService} from "./auth.service";
import {NoAuth} from "./no-auth.decorator";
import {Body, Controller, Post, Request, UseInterceptors} from "@nestjs/common";
// import {ResponseInterceptor} from "../common/interceptors/response.interceptor";


@Controller('/api/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @NoAuth()
    @Post('login')
    async login(@Request() req) {
        console.log(req);
        return this.authService.login(req.body);
    }

    @NoAuth()
    @Post('signup')
    async signup (@Body() credentials: Credentials) {
        await this.authService.createUser(credentials)
        return this.authService.login(credentials);
    }

    @Post('validate-token')
    async validateJwt (@Body() payload: { jwtToken: string }) {
        return { isValid: true};
    }


}