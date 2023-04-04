import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from '../dtos';
import { AppointmentsRepository } from '../repositories';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async createAppointment(createAppointmentInput: CreateAppointmentInput) {}
}
