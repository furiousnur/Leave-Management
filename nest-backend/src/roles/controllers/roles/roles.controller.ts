import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Res, UseGuards
} from '@nestjs/common'; 
import {RolesService} from "../../services/roles/roles.service";
import {Response} from "express";
import {RoleDto} from "../../dtos/role.dto";
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";
import {PermissionsService} from "../../../permissions/services/permissions/permissions.service"; 

@Controller('roles')
@UseGuards(JwtAuthGuards)
export class RolesController {
    constructor(
        private readonly roleService: RolesService,
        private readonly permissionService: PermissionsService
    ) {}

    @Get('/list')
    async getRole(@Res() res: Response){
        try {
            const data = await this.roleService.getRole();
            const permissions = await this.permissionService.getPermission();
            return res.status(HttpStatus.OK).json({
                message: 'Role fetched successfully',
                data,
                permissions
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/create')
    async createRole(@Body() roleDto:RoleDto,@Res() res: Response){
        try {
            const data = await this.roleService.createRole(roleDto);
            return res.status(HttpStatus.OK).json({
                message: 'Role created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:id')
    async findRole(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.roleService.findRole(id);
            return res.status(HttpStatus.OK).json({
                message: 'Role retrieved successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Put('/:id/update')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() roleDto: RoleDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.roleService.updateRole(id, roleDto);
            return res.status(HttpStatus.OK).json({
                message: 'Role updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Delete('/:id/delete')
    async deleteRole(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.roleService.deleteRole(id);
            return res.status(HttpStatus.OK).json({
                message: 'Role deleted successfully',
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
