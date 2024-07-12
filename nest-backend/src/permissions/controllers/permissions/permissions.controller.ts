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
import {Response} from "express";
import {PermissionsService} from "../../services/permissions/permissions.service";
import {PermissionDto} from "../../dtos/role.dto";
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";

@Controller('permissions')
@UseGuards(JwtAuthGuards)
export class PermissionsController {
    constructor(private readonly permissionService: PermissionsService) {}

    @Get('/list')
    async getPermission(@Res() res: Response){
        try {
            const data = await this.permissionService.getPermission();
            return res.status(HttpStatus.OK).json({
                message: 'Permission fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/create')
    async createPermission(@Body() permissionDto:PermissionDto,@Res() res: Response){
        try {
            const data = await this.permissionService.createPermission(permissionDto);
            return res.status(HttpStatus.OK).json({
                message: 'Permission created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:id')
    async findPermission(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.permissionService.findPermission(id);
            return res.status(HttpStatus.OK).json({
                message: 'Permission retrieved successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Put('/:id/update')
    async updatePermission(
        @Param('id', ParseIntPipe) id: number,
        @Body() permissionDto: PermissionDto,
        @Res() res: Response
    ) {
        try {
            const data = await this.permissionService.updatePermission(id, permissionDto);
            return res.status(HttpStatus.OK).json({
                message: 'Permission updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Delete('/:id/delete')
    async deletePermission(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.permissionService.deletePermission(id);
            return res.status(HttpStatus.OK).json({
                message: 'Permission deleted successfully',
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
