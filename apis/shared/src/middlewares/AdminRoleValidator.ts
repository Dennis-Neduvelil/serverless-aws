import { RoleValidator } from '@dennis-neduvelil/middy-middlewares';
import { JwtPayload } from 'jsonwebtoken';

export class AdminRoleValidator implements RoleValidator {
    private readonly roles = ['SADM', 'ADM'];
    async validate(token: JwtPayload | string): Promise<boolean> {
        return token != null && this.roles.includes(token.data.roleCode);
    }
}
