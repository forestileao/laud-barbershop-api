export interface CreateAppointmentInput {
  startDate: Date;
  endDate: Date;
  customerId: string;
  barberId: string;
  barberShopId: string;
}

export interface UpdateAppointmentInput {
  startDate?: Date;
  endDate?: Date;
  barberId?: string;
  appointmentId: string;
}

export interface CancelAppointmentInput {
  appointmentId: string;
}
