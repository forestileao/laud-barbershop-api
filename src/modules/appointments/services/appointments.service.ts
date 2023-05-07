import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  CancelAppointmentInput,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from '../dtos';
import { AppointmentsRepository } from '../repositories';
import { BarberShopRepository } from 'src/modules/barberShops/repositories';
import { UserRepository } from 'src/modules/users/repositories';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly barberShopRespository: BarberShopRepository,
    private readonly userRespository: UserRepository
  ) {}

  async createAppointment(createAppointmentInput: CreateAppointmentInput) {
    const barberShop = await this.barberShopRespository.findOne({
      id: createAppointmentInput.barberShopId
    });

    if (!barberShop)
      throw new NotFoundException('Invalid Barber Shop!');

    const barber = await this.userRespository.findOne({
      id: createAppointmentInput.barberId,
    });

    if (!barber || barber.role !== 'BARBER')
      throw new NotFoundException('Invalid Barber!');

    const { startDate, endDate } = createAppointmentInput;

    if (!this.isValidDateRange(startDate, endDate))
      throw new BadRequestException('End date cannot be greater than start date and must be all in the future.')


    const appointment = await this.appointmentsRepository.create({
      barber: {
        connect: {
          id: barber.id
        }
      },
      barberShop: {
        connect: {
          id: barberShop.id
        }
      },
      customer: {
        connect: {
          id: createAppointmentInput.customerId
        }
      },
      startDate: startDate as Date,
      endDate: endDate as Date,
    });

    return appointment;
  }

  async updateAppointment({ appointmentId, barberId, startDate, endDate }: UpdateAppointmentInput) {
    if (!this.isValidDateRange(startDate, endDate))
      throw new BadRequestException('End date cannot be greater than start date and must be all in the future.')

    const appointment = await this.appointmentsRepository.findOne({ id: appointmentId });
    if (!appointment)
      throw new NotFoundException('Appointment not found!');

    const updatedAppointment = await this.appointmentsRepository.update({
      barber: {
        connect: {
          id: barberId
        }
      },
      startDate,
      endDate
    }, appointmentId);

    return updatedAppointment;
  }

  async cancelAppointment(updateAppointmentInput: CancelAppointmentInput) {
    const appointment = await this.appointmentsRepository.findOne({ id: updateAppointmentInput.appointmentId });
    if (!appointment)
      throw new NotFoundException('Appointment not found!');

    await this.appointmentsRepository.delete({ id: appointment.id });
  }

  async listByBarber(barberId: string) {
    return await this.appointmentsRepository.find({
      barberId: barberId
    })
  }

  async listByUser(userId: string) {
    return await this.appointmentsRepository.find({
      customerId: userId
    })
  }

  private isValidDateRange(startDate: Date, endDate: Date) : boolean {
    return !(endDate < startDate || new Date() > startDate);
  }
}
1
