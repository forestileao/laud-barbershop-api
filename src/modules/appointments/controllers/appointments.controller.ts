import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { CreateAppointmentInput, UpdateAppointmentInput } from "../dtos";
import { AppointmentsService } from "../services";
import { AuthGuard } from "src/modules/users/guards";

@Controller('/api/v1/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async listByUser(@Request() req) {
    return await this.appointmentService.listByUser(req.user.id);
  }

  @Get('/barber')
  @UseGuards(AuthGuard)
  async listByBarber(@Request() req) {
    return await this.appointmentService.listByBarber(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createAppointment(@Body() createAppointmentInput: CreateAppointmentInput,  @Request() req) {
    createAppointmentInput.customerId = req.user.id;

    return await this.appointmentService.createAppointment(createAppointmentInput);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateAppointment(@Body() updateAppointmentInput: UpdateAppointmentInput) {

    return await this.appointmentService.updateAppointment(updateAppointmentInput);
  }

  @Delete('/:appointmentId')
  @UseGuards(AuthGuard)
  async cancelAppointment(@Param('appointmentId') appointmentId: string) {
    await this.appointmentService.cancelAppointment({appointmentId});
    return { message: 'Appointment deleted with success!'};
  }
}
