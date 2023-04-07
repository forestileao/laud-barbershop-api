import { Injectable } from '@nestjs/common';
import {
  CancelAppointmentInput,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from '../dtos';
import { AppointmentsRepository } from '../repositories';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async createAppointment(createAppointmentInput: CreateAppointmentInput) {}

  async updateAppointment(updateAppointmentInput: UpdateAppointmentInput) {}

  async cancelAppointment(updateAppointmentInput: CancelAppointmentInput) {}
}
