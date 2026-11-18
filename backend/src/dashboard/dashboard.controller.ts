import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

// Solo el administrador ve el dashboard.
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  /**
   * GET /dashboard?desde=2026-11-01&hasta=2026-11-30
   * Sin parámetros devuelve los últimos 30 días (hasta hoy, hora de Lima).
   */
  @Get()
  obtener(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.dashboard.obtener({ desde, hasta });
  }
}
